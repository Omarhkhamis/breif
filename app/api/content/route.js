import { NextResponse } from "next/server";
import { getAdminSession } from "../../../lib/admin-auth.js";
import { getSiteContent, saveSiteContent } from "../../../lib/content-store.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
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

    const content = await getSiteContent();
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      { message: "تعذر تحميل محتوى الموقع.", detail: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const nextContent = body?.content;

    if (!isPlainObject(nextContent)) {
      return NextResponse.json(
        { message: "صيغة المحتوى غير صحيحة." },
        { status: 400 },
      );
    }

    const content = await saveSiteContent(nextContent);

    return NextResponse.json({
      content,
      savedAt: new Date().toISOString(),
      message: "تم حفظ المحتوى بنجاح.",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "تعذر حفظ المحتوى.", detail: error.message },
      { status: 500 },
    );
  }
}
