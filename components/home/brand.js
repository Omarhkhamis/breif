import { Sparkles } from "lucide-react";

export default function Brand({ content }) {
  const logoSrc = content.logo?.src;
  const logoAlt = content.logo?.alt || content.arabicName;

  return (
    <a className="group flex items-center gap-3" href={content.href}>
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-[0_20px_45px_-20px_rgba(11,99,246,0.8)] ${
          logoSrc
            ? "border border-slate-200 bg-white p-2"
            : "bg-gradient-to-br from-blue-600 to-cyan-400 text-white"
        }`}
      >
        {logoSrc ? (
          <img alt={logoAlt} className="max-h-full max-w-full object-contain" src={logoSrc} />
        ) : (
          <Sparkles className="h-5 w-5" />
        )}
      </div>
      <div className="leading-tight">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-sky-700/80">
          {content.englishName}
        </p>
        <p className="text-lg font-extrabold text-slate-950 sm:text-xl">
          {content.arabicName}
        </p>
      </div>
    </a>
  );
}
