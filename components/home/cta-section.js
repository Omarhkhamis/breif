import content from "./cta-section.json";

export default function CtaSection() {
  return (
    <section className="section-space pt-10" id="cta">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[2.4rem] bg-slate-950 px-6 py-14 text-center text-white shadow-[0_35px_100px_-40px_rgba(15,23,42,1)] sm:px-10 lg:px-16 lg:py-20">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(17,199,216,0.28), transparent 24%), radial-gradient(circle at 78% 18%, rgba(11,99,246,0.36), transparent 22%), linear-gradient(140deg, rgba(255,255,255,0.06), transparent 35%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-4xl">
            <span className="eyebrow border-white/10 bg-white/8 text-cyan-100">
              {content.eyebrow}
            </span>
            <h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {content.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              {content.copy}
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-extrabold text-slate-950 hover:-translate-y-0.5 hover:bg-cyan-100"
                href={content.primaryCta.href}
              >
                {content.primaryCta.label}
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-8 py-4 text-base font-bold text-white hover:bg-white/12"
                href={content.secondaryCta.href}
              >
                {content.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
