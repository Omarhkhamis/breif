import content from "./philosophy-section.json";

export default function PhilosophySection() {
  return (
    <section className="section-space relative overflow-hidden bg-[var(--night)] text-white">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(11,99,246,0.35), transparent 28%), radial-gradient(circle at 85% 80%, rgba(17,199,216,0.28), transparent 28%), linear-gradient(180deg, rgba(8,17,28,0.96), rgba(5,12,20,1))",
        }}
      />
      <div className="shell relative z-10 text-center">
        <span className="eyebrow border-white/10 bg-white/8 text-cyan-100">
          {content.eyebrow}
        </span>
        <blockquote className="mx-auto mt-8 max-w-5xl text-3xl font-extrabold leading-[1.5] tracking-tight text-white sm:text-4xl lg:text-6xl">
          {content.quote.beforeHighlight}{" "}
          <span className="text-cyan-300">{content.quote.highlight}</span>{" "}
          {content.quote.afterHighlight}
        </blockquote>
      </div>
    </section>
  );
}
