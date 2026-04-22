import { BarChart3, BrainCircuit, MousePointerClick } from "lucide-react";
import content from "./problems-section.json";
import SectionHeader from "./section-header";

const problemIcons = {
  BarChart3,
  BrainCircuit,
  MousePointerClick,
};

export default function ProblemsSection() {
  return (
    <section className="section-space" id="problems">
      <div className="shell">
        <SectionHeader
          eyebrow={content.header.eyebrow}
          title={content.header.title}
          copy={content.header.copy}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {content.items.map((item) => {
            const Icon = problemIcons[item.icon] ?? MousePointerClick;

            return (
              <article
                key={item.title}
                className="glass-panel group h-full p-8 hover:-translate-y-1 hover:border-blue-200"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white">
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
