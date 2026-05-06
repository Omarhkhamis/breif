import { redirect } from "next/navigation";
import AdminLogin from "../../components/dashboard/admin-login";
import { getAdminSession } from "../../lib/admin-auth";

export const metadata = {
  title: "تسجيل دخول الأدمن | بريف ايجنسي",
  description: "تسجيل دخول لوحة تحكم بريف ايجنسي.",
};

export default async function BrAdminPage() {
  const admin = await getAdminSession();

  if (admin) {
    redirect("/dashboard");
  }

  return <AdminLogin />;
}
