import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { ensureDatabaseReady } from "./database-bootstrap.js";
import { query } from "./db.js";

const scrypt = promisify(scryptCallback);

export const adminSessionCookieName = "brief_admin_session";

const sessionMaxAgeSeconds = 60 * 60 * 24 * 7;

export class AdminInputError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "AdminInputError";
    this.status = status;
  }
}

function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

function normalizeName(name, email) {
  const nextName = String(name ?? "").trim();
  return nextName || email;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function serializeAdmin(admin) {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role ?? "admin",
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString("base64url");
  const derivedKey = await scrypt(password, salt, 64);
  return `scrypt:${salt}:${derivedKey.toString("base64url")}`;
}

async function verifyPassword(password, storedHash) {
  const [scheme, salt, hash] = String(storedHash ?? "").split(":");

  if (scheme !== "scrypt" || !salt || !hash) {
    return false;
  }

  const expected = Buffer.from(hash, "base64url");
  const derivedKey = await scrypt(password, salt, expected.length);

  if (expected.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(expected, derivedKey);
}

function normalizeAdminRow(row) {
  return {
    ...row,
    createdAt: new Date(row.createdAt).toISOString(),
    updatedAt: new Date(row.updatedAt).toISOString(),
  };
}

async function readAdminsRaw() {
  await ensureDatabaseReady();

  const rows = (
    await query(
      `
        SELECT
          id,
          name,
          email,
          role,
          password_hash AS "passwordHash",
          created_at AS "createdAt",
          updated_at AS "updatedAt"
        FROM admins
        ORDER BY created_at ASC
      `,
    )
  ).rows;

  return rows.map(normalizeAdminRow);
}

async function readAdminById(id) {
  await ensureDatabaseReady();

  const result = await query(
    `
      SELECT
        id,
        name,
        email,
        role,
        password_hash AS "passwordHash",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM admins
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] ? normalizeAdminRow(result.rows[0]) : null;
}

export async function listAdmins() {
  const admins = await readAdminsRaw();
  return admins.map(serializeAdmin);
}

export async function createAdmin({ name, email, password }) {
  const admins = await readAdminsRaw();
  const normalizedEmail = normalizeEmail(email);
  const normalizedName = normalizeName(name, normalizedEmail);
  const nextPassword = String(password ?? "");

  if (!isValidEmail(normalizedEmail)) {
    throw new AdminInputError("الإيميل غير صحيح.");
  }

  if (nextPassword.length < 6) {
    throw new AdminInputError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
  }

  if (admins.some((admin) => normalizeEmail(admin.email) === normalizedEmail)) {
    throw new AdminInputError("يوجد أدمن بنفس الإيميل.");
  }

  const now = new Date().toISOString();
  const admin = {
    id: randomBytes(12).toString("base64url"),
    name: normalizedName,
    email: normalizedEmail,
    role: "admin",
    passwordHash: await hashPassword(nextPassword),
    createdAt: now,
    updatedAt: now,
  };

  await query(
    `
      INSERT INTO admins (
        id,
        name,
        email,
        role,
        password_hash,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6::timestamptz, $7::timestamptz)
    `,
    [
      admin.id,
      admin.name,
      admin.email,
      admin.role,
      admin.passwordHash,
      admin.createdAt,
      admin.updatedAt,
    ],
  );

  return serializeAdmin(admin);
}

export async function updateAdmin(id, { name, email, password }) {
  const admins = await readAdminsRaw();
  const adminIndex = admins.findIndex((admin) => admin.id === id);

  if (adminIndex === -1) {
    throw new AdminInputError("الأدمن غير موجود.", 404);
  }

  const currentAdmin = admins[adminIndex];
  const normalizedEmail = normalizeEmail(email ?? currentAdmin.email);
  const normalizedName = normalizeName(name ?? currentAdmin.name, normalizedEmail);
  const nextPassword = String(password ?? "");

  if (!isValidEmail(normalizedEmail)) {
    throw new AdminInputError("الإيميل غير صحيح.");
  }

  if (
    admins.some(
      (admin) => admin.id !== id && normalizeEmail(admin.email) === normalizedEmail,
    )
  ) {
    throw new AdminInputError("يوجد أدمن بنفس الإيميل.");
  }

  if (nextPassword && nextPassword.length < 6) {
    throw new AdminInputError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
  }

  const updatedAdmin = {
    ...currentAdmin,
    name: normalizedName,
    email: normalizedEmail,
    updatedAt: new Date().toISOString(),
  };

  if (nextPassword) {
    updatedAdmin.passwordHash = await hashPassword(nextPassword);
  }

  await query(
    `
      UPDATE admins
      SET
        name = $2,
        email = $3,
        password_hash = $4,
        updated_at = $5::timestamptz
      WHERE id = $1
    `,
    [
      id,
      updatedAdmin.name,
      updatedAdmin.email,
      updatedAdmin.passwordHash,
      updatedAdmin.updatedAt,
    ],
  );

  return serializeAdmin(updatedAdmin);
}

export async function authenticateAdmin(email, password) {
  const admins = await readAdminsRaw();
  const normalizedEmail = normalizeEmail(email);
  const admin = admins.find((item) => normalizeEmail(item.email) === normalizedEmail);

  if (!admin) {
    return null;
  }

  const isPasswordValid = await verifyPassword(String(password ?? ""), admin.passwordHash);

  if (!isPasswordValid) {
    return null;
  }

  return serializeAdmin(admin);
}

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    "brief-admin-session-development-secret-change-me"
  );
}

function signPayload(payload) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function createSessionToken(adminId) {
  const payload = Buffer.from(
    JSON.stringify({
      adminId,
      expiresAt: Date.now() + sessionMaxAgeSeconds * 1000,
    }),
    "utf8",
  ).toString("base64url");

  return `${payload}.${signPayload(payload)}`;
}

function parseSessionToken(token) {
  const [payload, signature] = String(token ?? "").split(".");

  if (!payload || !signature || signature !== signPayload(payload)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));

    if (!session.adminId || Date.now() > session.expiresAt) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminSessionCookieName)?.value;
  const session = parseSessionToken(token);

  if (!session) {
    return null;
  }

  const admin = await readAdminById(session.adminId);
  return admin ? serializeAdmin(admin) : null;
}

export function setAdminSessionCookie(response, adminId) {
  response.cookies.set({
    name: adminSessionCookieName,
    value: createSessionToken(adminId),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAgeSeconds,
  });
}

export function clearAdminSessionCookie(response) {
  response.cookies.set({
    name: adminSessionCookieName,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
