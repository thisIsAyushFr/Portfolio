"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

import { FillButton } from "@/components/ui/primitives";
import { ProjectShot } from "@/components/ui/project-shot";
import { Reveal } from "@/components/ui/reveal";
import {
  PROJECTS,
  PROJECT_TAGS,
  TAGS_BY_PROJECT,
  type Project,
  type ProjectTag,
} from "@/lib/data";
import { EASE } from "@/lib/motion";

type Filter = "All" | ProjectTag;

const FILTERS: Filter[] = ["All", ...PROJECT_TAGS];

function matches(project: Project, filter: Filter): boolean {
  return (
    filter === "All" || (TAGS_BY_PROJECT[project.id] ?? []).includes(filter)
  );
}

/** Full project index: filter chips, then large alternating rows. */
export function ProjectList(): ReactNode {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = PROJECTS.filter((project) => matches(project, filter));

  return (
    <section className="bg-cream pb-28 text-ink md:pb-44">
      <div
        role="group"
        aria-label="Filter projects"
        className="flex flex-wrap justify-center gap-2 px-[var(--margin)] pb-10 md:gap-3 md:pb-14"
      >
        {FILTERS.map((item) => {
          const count = PROJECTS.filter((project) =>
            matches(project, item)
          ).length;
          const active = item === filter;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item)}
              className={`focus-ring t-h8 flex items-center gap-2 border px-4 py-3 transition-colors duration-300 ${
                active
                  ? "border-accent bg-accent text-cream-light"
                  : "border-ink/40 hover:border-ink hover:bg-ink hover:text-cream-light"
              }`}
            >
              {item}
              <span className="t-label opacity-70">
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <ol className="border-t border-ink/30">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project, index) => (
            <motion.li
              key={project.id}
              id={project.id}
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="scroll-mt-24 border-b border-ink/30 py-10 md:py-16"
            >
              <ProjectRow project={project} index={index} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </section>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const flipped = index % 2 === 1;

  return (
    <Reveal className="grid-w items-center gap-y-8">
      <div
        className={`col-span-full md:col-span-7 ${
          flipped ? "md:order-2 md:col-start-6" : ""
        }`}
      >
        <div className="group">
          <ProjectShot project={project} eager={index < 2} />
        </div>
      </div>

      <div
        className={`col-span-full md:col-span-4 ${
          flipped ? "md:order-1 md:col-start-1" : "md:col-start-9"
        }`}
      >
        <p className="t-label">
          <span className="mr-3 bg-accent px-2 py-1 text-cream-light">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="opacity-70">{project.meta}</span>
        </p>
        <h2 className="t-h1 mt-4 !text-[clamp(2.25rem,4.2vw,4.75rem)]">
          {project.title}
        </h2>
        <p className="t-body mt-5">{project.description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {project.live && (
            <FillButton href={project.live} tone="accent" size="sm">
              Live demo
            </FillButton>
          )}
          {project.github && (
            <FillButton href={project.github} tone="ink" size="sm">
              GitHub
            </FillButton>
          )}
        </div>
      </div>
    </Reveal>
  );
}
