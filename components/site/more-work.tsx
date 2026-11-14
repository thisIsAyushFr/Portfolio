import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Label } from "@/components/ui/primitives";
import { ProjectShot } from "@/components/ui/project-shot";
import { Reveal } from "@/components/ui/reveal";
import { FEATURED_COUNT, PROJECTS } from "@/lib/data";

/** Tile grid for everything that is not featured in the trail. */
export function MoreWork(): ReactNode {
  const rest = PROJECTS.slice(FEATURED_COUNT);

  return (
    <section className="bg-forest py-28 text-cream md:py-44">
      <div className="grid-w">
        <Reveal className="col-span-full flex flex-col items-center text-center">
          <Label>Keep exploring</Label>
          <h2 className="t-l mt-8 md:mt-10">
            More from
            <br />
            the workshop
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-4 gap-y-10 px-[var(--margin)] sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
        {rest.map((project, index) => (
          <Reveal key={project.id} delay={(index % 3) * 0.08}>
            <Link
              href={`/projects#${project.id}`}
              className="focus-ring group block"
            >
              <ProjectShot project={project} />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="t-h3">{project.title}</h3>
                  <p className="t-label mt-2 opacity-60">{project.meta}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/40 transition-colors duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-cream-light"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}

        <Reveal delay={0.16} className="sm:pb-[4.75rem]">
          <Link
            href="/projects"
            className="focus-ring group flex h-full min-h-56 flex-col justify-between rounded-lg bg-amber p-6 text-cream-light transition-colors duration-500 hover:bg-cream hover:text-forest"
          >
            <span className="t-label">
              {String(PROJECTS.length).padStart(2, "0")} projects
            </span>
            <span className="t-h2 flex items-end justify-between gap-4">
              <span>
                See
                <br />
                them all
              </span>
              <ArrowUpRight
                className="h-[0.8em] w-[0.8em] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
