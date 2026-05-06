import { mkdir, readdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getAdminSession } from "../../../lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const allowedExtensions = new Set([".gif", ".ico", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const maxFileSize = 5 * 1024 * 1024;
const uploadsPublicPath = "/upload/";

function getUploadsDir() {
  return path.join(process.cwd(), "public", "upload");
}

function getSafeExtension(fileName) {
  const extension = path.extname(fileName || "").toLowerCase();
  return allowedExtensions.has(extension) ? extension : "";
}

function resolveUploadedFile(url) {
  let pathname = "";

  try {
    pathname = new URL(url, "http://local").pathname;
  } catch {
    return null;
  }

  if (!pathname.startsWith(uploadsPublicPath)) {
    return null;
  }

  const fileName = decodeURIComponent(pathname.slice(uploadsPublicPath.length));

  if (!fileName || fileName.includes("/") || fileName.includes("\\") || !getSafeExtension(fileName)) {
    return null;
  }

  return path.join(getUploadsDir(), fileName);
}

function unauthorizedResponse() {
  return NextResponse.json(
    { message: "يرجى تسجيل الدخول للوصول إلى لوحة التحكم." },
    { status: 401 },
  );
}

export async function GET() {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return unauthorizedResponse();
    }

    const uploadsDir = getUploadsDir();
    await mkdir(uploadsDir, { recursive: true });

    const entries = await readdir(uploadsDir, { withFileTypes: true });
    const media = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && getSafeExtension(entry.name))
        .map(async (entry) => {
          const fileStats = await stat(path.join(uploadsDir, entry.name));

          return {
            name: entry.name,
            url: `${uploadsPublicPath}${entry.name}`,
            size: fileStats.size,
            uploadedAt: fileStats.mtime.toISOString(),
          };
        }),
    );

    media.sort((first, second) => new Date(second.uploadedAt) - new Date(first.uploadedAt));

    return NextResponse.json({ media });
  } catch (error) {
    return NextResponse.json(
      { message: "تعذر تحميل المعرض.", detail: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return unauthorizedResponse();
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "لم يتم اختيار ملف." }, { status: 400 });
    }

    const extension = getSafeExtension(file.name);
    const isImageMime = file.type.startsWith("image/") || file.type === "";

    if (!extension || !isImageMime) {
      return NextResponse.json(
        { message: "صيغة الملف غير مدعومة. استخدم PNG أو JPG أو SVG أو WEBP أو ICO." },
        { status: 400 },
      );
    }

    if (file.size > maxFileSize) {
      return NextResponse.json(
        { message: "حجم الملف يجب ألا يتجاوز 5MB." },
        { status: 400 },
      );
    }

    const uploadsDir = getUploadsDir();
    await mkdir(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}-${randomUUID()}${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadsDir, fileName), buffer);

    return NextResponse.json({ url: `${uploadsPublicPath}${fileName}` });
  } catch (error) {
    return NextResponse.json(
      { message: "تعذر رفع الملف.", detail: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return unauthorizedResponse();
    }

    const url = request.nextUrl.searchParams.get("url");
    const filePath = resolveUploadedFile(url);

    if (!filePath) {
      return NextResponse.json({ message: "رابط الملف غير صالح للحذف." }, { status: 400 });
    }

    await unlink(filePath);

    return NextResponse.json({ message: "تم حذف الملف.", url });
  } catch (error) {
    const status = error.code === "ENOENT" ? 404 : 500;

    return NextResponse.json(
      { message: status === 404 ? "الملف غير موجود." : "تعذر حذف الملف.", detail: error.message },
      { status },
    );
  }
}
