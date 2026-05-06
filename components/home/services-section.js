import { Blocks, PaintBucket, ShieldCheck, TrendingUp } from "lucide-react";
import SectionHeader from "./section-header";

const serviceIcons = {
  Blocks,
  PaintBucket,
  ShieldCheck,
  TrendingUp,
};

export default function ServicesSection({ content }) {
  return (
    <section className="section-space" id="services">
      <div className="shell">
        <SectionHeader
          eyebrow={content.header.eyebrow}
          title={content.header.title}
          copy={content.header.copy}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.items.map((item) => {
            const Icon = serviceIcons[item.icon] ?? PaintBucket;

            return (
              <article
                key={item.title}
                className="glass-panel h-full p-8 hover:-translate-y-1 hover:border-cyan-200"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 text-blue-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-slate-950">{item.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-600">{item.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
