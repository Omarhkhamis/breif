import { readFile } from "node:fs/promises";
import path from "node:path";
import { query } from "./db.js";

export const contentFiles = {
  layout: "app/layout.json",
  brand: "components/home/brand.json",
  siteHeader: "components/layout/site-header.json",
  siteFooter: "components/layout/site-footer.json",
  hero: "components/home/hero-section.json",
  problems: "components/home/problems-section.json",
  process: "components/home/process-section.json",
  philosophy: "components/home/philosophy-section.json",
  services: "components/home/services-section.json",
  projects: "components/home/projects-section.json",
  cta: "components/home/cta-section.json",
};

const adminsSeedFile = "data/admins.json";

function resolveProjectPath(relativePath) {
  return path.join(process.cwd(), relativePath);
}

async function readJsonFile(relativePath) {
  const content = await readFile(resolveProjectPath(relativePath), "utf8");
  return JSON.parse(content);
}

async function seedSiteContent() {
  const [{ count }] = (
    await query("SELECT COUNT(*)::int AS count FROM site_content")
  ).rows;

  if (count > 0) {
    return;
  }

  const entries = await Promise.all(
    Object.entries(contentFiles).map(async ([key, relativePath]) => [
      key,
      await readJsonFile(relativePath),
    ]),
  );

  for (const [key, value] of entries) {
    await query(
      `
        INSERT INTO site_content (key, value, updated_at)
        VALUES ($1, $2::jsonb, NOW())
      `,
      [key, JSON.stringify(value)],
    );
  }
}

async function seedAdmins() {
  const [{ count }] = (await query("SELECT COUNT(*)::int AS count FROM admins")).rows;

  if (count > 0) {
    return;
  }

  const admins = await readJsonFile(adminsSeedFile);

  for (const admin of admins) {
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
        admin.role ?? "admin",
        admin.passwordHash,
        admin.createdAt,
        admin.updatedAt,
      ],
    );
  }
}

async function bootstrapDatabase() {
  await query(`
    CREATE TABLE IF NOT EXISTS site_content (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS admins (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL DEFAULT 'admin',
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await seedSiteContent();
  await seedAdmins();
}

const globalForBootstrap = globalThis;

export async function ensureDatabaseReady() {
  if (!globalForBootstrap.__briefDatabaseBootstrapPromise) {
    globalForBootstrap.__briefDatabaseBootstrapPromise = bootstrapDatabase().catch(
      (error) => {
        globalForBootstrap.__briefDatabaseBootstrapPromise = null;
        throw error;
      },
    );
  }

  return globalForBootstrap.__briefDatabaseBootstrapPromise;
}
