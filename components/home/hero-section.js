import { ArrowLeft, ArrowUpLeft, Blocks, Sparkles, TrendingUp } from "lucide-react";

const highlightIcons = {
  Blocks,
  Sparkles,
  TrendingUp,
};

export default function HeroSection({ content }) {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-12" id="home">
      <div
        className="absolute inset-x-0 top-0 h-[44rem] opacity-90"
        style={{
          background:
            "radial-gradient(circle at 82% 10%, rgba(11,99,246,0.15), transparent 24%), radial-gradient(circle at 15% 14%, rgba(17,199,216,0.12), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0))",
        }}
      />

      <div className="shell relative pb-20 pt-8 lg:pb-28">
        <div className="relative overflow-hidden rounded-[2.8rem] border border-white/12 bg-[linear-gradient(160deg,#08111c_0%,#0a1d33_36%,#0b3157_68%,#07101a_100%)] shadow-[0_40px_120px_-48px_rgba(8,17,28,0.95)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(17,199,216,0.18),transparent_22%),radial-gradient(circle_at_84%_12%,rgba(11,99,246,0.24),transparent_24%),radial-gradient(circle_at_50%_88%,rgba(17,199,216,0.1),transparent_28%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:34px_34px] opacity-35" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_22%,transparent_78%,rgba(255,255,255,0.04)_100%)]" />
          <div className="absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent" />
          <div className="absolute inset-y-0 right-[11%] w-px bg-gradient-to-b from-transparent via-blue-300/25 to-transparent" />
          <div className="absolute left-0 right-0 top-[18%] h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />
          <div className="absolute left-0 right-0 bottom-[16%] h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
          <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-cyan-400/14 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-blue-500/18 blur-3xl" />

          <div className="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 xl:px-16 xl:py-16">
            <div>
              <h1 className="max-w-6xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                {content.title.beforeHighlight}{" "}
                <span className="text-gradient">{content.title.highlight}</span>{" "}
                {content.title.afterHighlight}
              </h1>

              <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-300 sm:text-xl">
                {content.copy}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-50 px-7 py-4 text-base font-extrabold text-slate-950 shadow-[0_24px_60px_-24px_rgba(255,255,255,0.55)] hover:-translate-y-0.5 hover:bg-cyan-200"
                  href={content.primaryCta.href}
                >
                  {content.primaryCta.label}
                  <ArrowLeft className="h-4 w-4" />
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/10 px-7 py-4 text-base font-bold text-white shadow-[0_20px_48px_-32px_rgba(8,17,28,0.75)] backdrop-blur-xl hover:border-cyan-300/35 hover:bg-white/14 hover:text-cyan-100"
                  href={content.secondaryCta.href}
                >
                  {content.secondaryCta.label}
                  <ArrowUpLeft className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {content.highlights.map(({ icon, title, copy }) => {
                const Icon = highlightIcons[icon] ?? Blocks;

                return (
                  <div
                    key={title}
                    className="rounded-[1.8rem] border border-white/12 bg-white/8 p-5 shadow-[0_24px_60px_-36px_rgba(8,17,28,0.95)] backdrop-blur-md"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-lg font-extrabold text-white">{title}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{copy}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative border-t border-white/10 bg-slate-950/24 px-6 py-6 backdrop-blur-xl sm:px-8 lg:px-12 xl:px-16">
            <div className="grid gap-4 md:grid-cols-3">
              {content.stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.6rem] border border-white/12 bg-white/8 p-5 shadow-[0_18px_45px_-34px_rgba(8,17,28,0.9)] backdrop-blur-md"
                >
                  <div className="text-3xl font-extrabold text-white">{item.value}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
