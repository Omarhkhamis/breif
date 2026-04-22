import Brand from "../home/brand";
import content from "./site-header.json";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 backdrop-blur-2xl">
      <div className="shell flex min-h-20 items-center justify-between gap-6">
        <Brand />
        <nav className="hidden items-center gap-7 lg:flex">
          {content.navLinks.map((item) => (
            <a
              key={item.label}
              className="text-sm font-bold text-slate-600 hover:text-slate-950"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-[0_20px_45px_-25px_rgba(15,23,42,0.9)] hover:-translate-y-0.5 hover:bg-blue-700"
          href={content.cta.href}
        >
          {content.cta.label}
        </a>
      </div>
    </header>
  );
}
