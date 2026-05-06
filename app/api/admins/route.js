import { NextResponse } from "next/server";
import {
  AdminInputError,
  createAdmin,
  getAdminSession,
  listAdmins,
} from "../../../lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function unauthorizedResponse() {
  return NextResponse.json(
    { message: "يرجى تسجيل الدخول للوصول إلى لوحة التحكم." },
    { status: 401 },
  );
}

function errorResponse(error, fallbackMessage = "تعذر تنفيذ الطلب.") {
  if (error instanceof AdminInputError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  return NextResponse.json(
    { message: fallbackMessage, detail: error.message },
    { status: 500 },
  );
}

export async function GET() {
  try {
    const currentAdmin = await getAdminSession();

    if (!currentAdmin) {
      return unauthorizedResponse();
    }

    const admins = await listAdmins();
    return NextResponse.json({ admins, currentAdmin });
  } catch (error) {
    return errorResponse(error, "تعذر تحميل بيانات الأدمن.");
  }
}

export async function POST(request) {
  try {
    const currentAdmin = await getAdminSession();

    if (!currentAdmin) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const admin = await createAdmin(body ?? {});

    return NextResponse.json(
      { admin, message: "تم إضافة الأدمن بنجاح." },
      { status: 201 },
    );
  } catch (error) {
    return errorResponse(error, "تعذر إضافة الأدمن.");
  }
}
