import { NextResponse } from "next/server";
import { authenticateAdmin, setAdminSessionCookie } from "../../../../lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const admin = await authenticateAdmin(body?.email, body?.password);

    if (!admin) {
      return NextResponse.json(
        { message: "بيانات الدخول غير صحيحة." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      admin,
      message: "تم تسجيل الدخول بنجاح.",
    });

    setAdminSessionCookie(response, admin.id);
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "تعذر تسجيل الدخول.", detail: error.message },
      { status: 500 },
    );
  }
}
