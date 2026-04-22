import { Sparkles } from "lucide-react";
import content from "./brand.json";

export default function Brand() {
  return (
    <a className="group flex items-center gap-3" href={content.href}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-[0_20px_45px_-20px_rgba(11,99,246,0.8)]">
        <Sparkles className="h-5 w-5" />
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
