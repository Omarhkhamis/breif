import { redirect } from "next/navigation";
import ContentDashboard from "../../components/dashboard/content-dashboard";
import { getAdminSession } from "../../lib/admin-auth";

export const metadata = {
  title: "لوحة التحكم | بريف ايجنسي",
  description: "لوحة إدارة محتوى موقع بريف ايجنسي.",
};

export default async function DashboardPage() {
  const admin = await getAdminSession();

  if (!admin) {
    redirect("/br-admin");
  }

  return <ContentDashboard currentAdmin={admin} />;
}
