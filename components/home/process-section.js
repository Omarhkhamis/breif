import { ArrowLeft, Check } from "lucide-react";
import content from "./process-section.json";

export default function ProcessSection() {
  return (
    <section className="section-space" id="process">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="relative group">
          <div className="absolute -inset-4 rounded-[2.4rem] bg-blue-100/70 shadow-[0_30px_90px_-45px_rgba(11,99,246,0.35)] transition-transform duration-500 group-hover:rotate-0 lg:-rotate-2" />
          <div className="relative rounded-[2rem] border border-white/70 bg-white px-6 py-8 shadow-[0_28px_75px_-38px_rgba(15,23,42,0.35)] sm:px-8 sm:py-10 lg:px-10">
            <h3 className="mb-8 flex items-center gap-3 text-2xl font-extrabold text-slate-950">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_16px_35px_-20px_rgba(11,99,246,0.8)]">
                <Check className="h-5 w-5" />
              </span>
              {content.panelTitle}
            </h3>

            <ul className="space-y-7">
              {content.items.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-xl font-extrabold text-slate-950">{item.title}</h4>
                    <p className="mt-2 text-base leading-7 text-slate-500">{item.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <span className="block text-sm font-extrabold tracking-[0.22em] text-cyan-700">
            {content.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            {content.title}
          </h2>
          <p className="max-w-2xl text-xl leading-9 text-slate-500">
            {content.copy}
          </p>
          <div className="pt-4">
            <a
              className="group inline-flex items-center gap-3 text-xl font-extrabold text-blue-600"
              href={content.cta.href}
            >
              {content.cta.label}
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
