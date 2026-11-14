import type { ReactNode } from "react";

import { FillButton } from "@/components/ui/primitives";
import { ProjectShot } from "@/components/ui/project-shot";
import { Reveal } from "@/components/ui/reveal";
import { PROJECTS, type Project } from "@/lib/data";

/** Full project index: large alternating rows separated by rules. */
export function ProjectList(): ReactNode {
  return (
    <section className="bg-cream pb-28 text-forest md:pb-44">
      <ol className="border-t border-forest/30">
        {PROJECTS.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
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
    <li
      id={project.id}
      className="scroll-mt-24 border-b border-forest/30 py-10 md:py-16"
    >
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
            <span className="mr-3 bg-amber px-2 py-1 text-cream-light">
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
              <FillButton href={project.live} tone="amber" size="sm">
                Live demo
              </FillButton>
            )}
            {project.github && (
              <FillButton href={project.github} tone="forest" size="sm">
                GitHub
              </FillButton>
            )}
          </div>
        </div>
      </Reveal>
    </li>
  );
}
