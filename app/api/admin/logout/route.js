import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "../../../../lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ message: "تم تسجيل الخروج." });
  clearAdminSessionCookie(response);
  return response;
}
