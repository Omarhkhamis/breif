import { Tajawal } from "next/font/google";
import content from "./layout.json";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

export const metadata = content.metadata;

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} bg-[var(--bg)] text-[var(--ink)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
