"use client";

import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import Link from "next/link";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";

import { SplitReveal } from "@/components/motion/split-reveal";
import { Label } from "@/components/ui/primitives";
import { ProjectShot } from "@/components/ui/project-shot";
import { Reveal } from "@/components/ui/reveal";
import { FEATURED_COUNT, PROJECTS, type Project } from "@/lib/data";
import { EASE } from "@/lib/motion";

/**
 * Everything that is not featured in the trail. Desktop: a list of names,
 * where hovering one shows its screenshot following the cursor. Phones: tiles.
 */
export function MoreWork(): ReactNode {
  const rest = PROJECTS.slice(FEATURED_COUNT);

  return (
    <section className="overflow-x-clip bg-ink py-28 text-cream md:py-44">
      <div className="grid-w">
        <Reveal className="col-span-full flex flex-col items-center text-center">
          <Label>Keep exploring</Label>
          <h2 className="t-l mt-8 md:mt-10">
            <SplitReveal lines={["More from", "the workshop"]} />
          </h2>
        </Reveal>
      </div>

      <HoverList projects={rest} />
      <Tiles projects={rest} />
    </section>
  );
}

/* ---------- Desktop: names with a cursor-following preview ---------- */

function HoverList({ projects }: { projects: Project[] }): ReactNode {
  const root = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<Project | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.5 });
  // Leans into the direction of travel.
  const velocity = useVelocity(smoothX);
  const rotate = useTransform(() =>
    Math.min(8, Math.max(-8, velocity.get() / 120))
  );

  function onMove(event: PointerEvent<HTMLDivElement>): void {
    const box = root.current?.getBoundingClientRect();
    if (!box || event.pointerType !== "mouse") return;
    x.set(event.clientX - box.left);
    y.set(event.clientY - box.top);
  }

  return (
    <div
      ref={root}
      onPointerMove={onMove}
      onPointerLeave={() => setHovered(null)}
      className="relative mt-24 hidden px-[var(--margin)] md:block"
    >
      <ol className="border-t border-cream/20">
        {projects.map((project, index) => (
          <li key={project.id} className="border-b border-cream/20">
            <Link
              href={`/projects#${project.id}`}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setHovered(project);
              }}
              onFocus={() => setHovered(null)}
              className={`focus-ring group grid grid-cols-12 items-center gap-4 py-8 transition-opacity duration-300 ${
                hovered && hovered.id !== project.id ? "opacity-40" : ""
              }`}
            >
              <span className="t-label col-span-1 opacity-60">
                {String(FEATURED_COUNT + index + 1).padStart(2, "0")}
              </span>
              <h3 className="t-h2 col-span-6 transition-transform duration-500 group-hover:translate-x-4 group-hover:text-sage">
                {project.title}
              </h3>
              <p className="t-label col-span-4 opacity-60">{project.meta}</p>
              <span
                aria-hidden="true"
                className="col-span-1 flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-cream/40 transition-colors duration-300 group-hover:border-sage group-hover:bg-sage group-hover:text-ink"
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}

        <li className="border-b border-cream/20">
          <Link
            href="/projects"
            onPointerEnter={() => setHovered(null)}
            className="focus-ring group grid grid-cols-12 items-center gap-4 py-8"
          >
            <span className="t-label col-span-1 opacity-60">All</span>
            <span className="t-h2 col-span-6 text-sage transition-transform duration-500 group-hover:translate-x-4">
              See them all
            </span>
            <span className="t-label col-span-4 opacity-60">
              {String(PROJECTS.length).padStart(2, "0")} projects
            </span>
            <span
              aria-hidden="true"
              className="col-span-1 flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-cream/40 transition-colors duration-300 group-hover:border-sage group-hover:bg-sage group-hover:text-ink"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </li>
      </ol>

      {/* Floating preview */}
      <motion.div
        aria-hidden="true"
        style={{ x: smoothX, y: smoothY, rotate }}
        className="pointer-events-none absolute top-0 left-0 z-10 w-[26vw]"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute top-0 left-6 w-full -translate-y-1/2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
            >
              <ProjectShot project={hovered} eager />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ---------- Phones: tiles ---------- */

function Tiles({ projects }: { projects: Project[] }): ReactNode {
  return (
    <div className="mt-16 grid grid-cols-1 gap-x-4 gap-y-10 px-[var(--margin)] sm:grid-cols-2 md:hidden">
      {projects.map((project, index) => (
        <Reveal key={project.id} variant="clip" delay={(index % 2) * 0.08}>
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
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/40"
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}

      <Reveal delay={0.16}>
        <Link
          href="/projects"
          className="focus-ring group flex h-full min-h-56 flex-col justify-between rounded-lg bg-accent p-6 text-cream-light"
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
            <ArrowUpRight className="h-[0.8em] w-[0.8em]" aria-hidden="true" />
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
