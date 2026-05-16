import { Tajawal } from "next/font/google";
import CustomCodeInjector from "../components/layout/custom-code-injector";
import { getSiteContent } from "../lib/content-store.js";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getSiteContent();
  return content.layout?.metadata ?? {};
}

function getCustomCode(content, key) {
  const value = content?.customCodes?.[key];
  return typeof value === "string" ? value : "";
}

export default async function RootLayout({ children }) {
  const content = await getSiteContent();
  const headCode = getCustomCode(content, "headCode");
  const bodyCode = getCustomCode(content, "bodyCode");

  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} bg-[var(--bg)] text-[var(--ink)] antialiased`}>
        <CustomCodeInjector headCode={headCode} bodyCode={bodyCode} />
        {children}
      </body>
    </html>
  );
}
