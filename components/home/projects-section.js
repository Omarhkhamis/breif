"use client";

import { useState } from "react";
import content from "./projects-section.json";
import SectionHeader from "./section-header";

const projectFilters = [
  content.allFilterLabel,
  ...new Set(content.items.map((project) => project.domain)),
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState(content.allFilterLabel);

  const visibleProjects =
    activeFilter === content.allFilterLabel
      ? content.items
      : content.items.filter((project) => project.domain === activeFilter);

  return (
    <section className="section-space" id="projects">
      <div className="shell">
        <SectionHeader
          eyebrow={content.header.eyebrow}
          title={content.header.title}
          copy={content.header.copy}
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {projectFilters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                className={`rounded-full border px-5 py-3 text-sm font-extrabold shadow-[0_18px_45px_-30px_rgba(15,23,42,0.28)] transition ${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-white/80 bg-white/78 text-slate-700 hover:border-blue-200 hover:text-blue-700"
                }`}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white/82 p-3 shadow-[0_28px_90px_-42px_rgba(15,23,42,0.35)]"
            >
              <div className="relative aspect-[1.08] overflow-hidden rounded-[1.6rem]">
                <img
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                  src={project.image}
                />
                <div className="absolute inset-0 opacity-90 mix-blend-multiply" style={{ background: project.background }} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_26%,rgba(8,17,28,0.36)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/45 to-transparent" />
              </div>

              <div className="px-2 pb-2 pt-5">
                <h3 className="text-2xl font-extrabold leading-tight text-slate-950">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-bold tracking-[0.18em] text-slate-500">
                  {project.domain}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
