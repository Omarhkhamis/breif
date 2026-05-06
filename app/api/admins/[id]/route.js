import { NextResponse } from "next/server";
import {
  AdminInputError,
  getAdminSession,
  updateAdmin,
} from "../../../../lib/admin-auth";

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

export async function PUT(request, { params }) {
  try {
    const currentAdmin = await getAdminSession();

    if (!currentAdmin) {
      return unauthorizedResponse();
    }

    const { id } = await params;
    const body = await request.json();
    const admin = await updateAdmin(id, body ?? {});

    return NextResponse.json({ admin, message: "تم تحديث بيانات الأدمن." });
  } catch (error) {
    return errorResponse(error, "تعذر تحديث بيانات الأدمن.");
  }
}
