"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import SectionHeader from "./section-header";

function getWrappedOffset(index, activeIndex, projectCount) {
  let offset = index - activeIndex;

  if (offset > projectCount / 2) {
    offset -= projectCount;
  }

  if (offset < -projectCount / 2) {
    offset += projectCount;
  }

  return offset;
}

const carouselNavigationButtonClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-slate-950 text-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.55)] hover:-translate-y-0.5 hover:bg-blue-700";

export default function ProjectsSection({ content }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const projectCount = content.items.length;
  const activeProject = content.items[activeIndex];

  const showNextProject = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % projectCount);
  };

  const showPreviousProject = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + projectCount) % projectCount);
  };

  const showProject = (index) => {
    setActiveIndex(index);
  };

  const handlePointerDown = (event) => {
    setDragStart(event.clientX);
    setDragOffset(0);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (dragStart === null) {
      return;
    }

    const nextOffset = event.clientX - dragStart;
    setDragOffset(Math.max(-160, Math.min(160, nextOffset)));
  };

  const handlePointerUp = (event) => {
    if (dragStart === null) {
      return;
    }

    const finalOffset = event.clientX - dragStart;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (finalOffset < -64) {
      showNextProject();
    } else if (finalOffset > 64) {
      showPreviousProject();
    }

    setDragStart(null);
    setDragOffset(0);
  };

  const handlePointerCancel = () => {
    setDragStart(null);
    setDragOffset(0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      showNextProject();
    }

    if (event.key === "ArrowRight") {
      showPreviousProject();
    }
  };

  if (!projectCount) {
    return null;
  }

  return (
    <section className="section-space" id="projects">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_auto] lg:items-end">
          <SectionHeader
            eyebrow={content.header.eyebrow}
            title={content.header.title}
            copy={content.header.copy}
          />

          <div className="flex items-center gap-3 lg:justify-end">
            <button
              aria-label="المشروع السابق"
              className={carouselNavigationButtonClass}
              onClick={showPreviousProject}
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              aria-label="المشروع التالي"
              className={carouselNavigationButtonClass}
              onClick={showNextProject}
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative mt-2 overflow-hidden rounded-[2.4rem] py-7 sm:py-10">
          <div
            aria-label="سلايدر الأعمال المختارة"
            className={`relative mx-auto h-[28rem] max-w-6xl select-none focus:outline-none sm:h-[34rem] lg:h-[38rem] ${
              dragStart === null ? "cursor-grab" : "cursor-grabbing"
            }`}
            onKeyDown={handleKeyDown}
            onPointerCancel={handlePointerCancel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            role="region"
            style={{ touchAction: "pan-y" }}
            tabIndex={0}
          >
            {content.items.map((project, index) => {
              const offset = getWrappedOffset(index, activeIndex, projectCount);
              const isActive = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;
              const direction = offset > 0 ? 1 : -1;
              const translate = isActive ? 0 : isAdjacent ? direction * 58 : direction * 92;
              const scale = isActive ? 1 : isAdjacent ? 0.82 : 0.72;
              const opacity = isActive ? 1 : isAdjacent ? 0.38 : 0;
              const dragInfluence = isActive ? 1 : isAdjacent ? 0.38 : 0;

              return (
                <article
                  aria-hidden={!isActive}
                  className="absolute left-1/2 top-1/2 h-[24rem] w-[84%] overflow-hidden rounded-[2rem] border border-white/80 bg-white/82 p-3 shadow-[0_28px_90px_-42px_rgba(15,23,42,0.45)] sm:h-[29rem] sm:w-[76%] lg:h-[32rem] lg:w-[64%]"
                  key={project.title}
                  style={{
                    opacity,
                    pointerEvents: isActive ? "auto" : "none",
                    transform: `translate(-50%, -50%) translateX(calc(${translate}% + ${
                      dragOffset * dragInfluence
                    }px)) scale(${scale})`,
                    transition:
                      dragStart === null
                        ? "transform 520ms cubic-bezier(0.2, 0.82, 0.2, 1), opacity 520ms ease"
                        : "none",
                    zIndex: isActive ? 30 : isAdjacent ? 10 : 0,
                  }}
                >
                  <div className="group relative h-full overflow-hidden rounded-[1.55rem]">
                    <img
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                      draggable={false}
                      loading={isActive ? "eager" : "lazy"}
                      src={project.image}
                    />
                    <div
                      className="absolute inset-0 opacity-88 mix-blend-multiply"
                      style={{ background: project.background }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(8,17,28,0.08)_34%,rgba(8,17,28,0.82)_100%)]" />

                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7 lg:p-8">
                      <p className="inline-flex rounded-full border border-white/16 bg-white/12 px-4 py-2 text-xs font-extrabold backdrop-blur-xl sm:text-sm">
                        {project.domain}
                      </p>
                      <h3 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-cyan-100 sm:text-base">
                        {project.result}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="relative mt-3 flex items-center justify-center gap-2">
            {content.items.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  aria-label={`عرض ${project.title}`}
                  className={`h-2 rounded-full transition ${
                    isActive ? "w-9 bg-slate-950" : "w-2.5 bg-slate-300 hover:bg-blue-400"
                  }`}
                  key={project.title}
                  onClick={() => showProject(index)}
                  type="button"
                />
              );
            })}
          </div>

          <div className="sr-only" aria-live="polite">
            المشروع الحالي: {activeProject.title}
          </div>
        </div>
      </div>
    </section>
  );
}
