"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import type { Project } from "@/lib/data";
import { useReducedMotion } from "@/lib/motion";

/**
 * A project screenshot inside a small browser window. Every screenshot has
 * its own colours and aspect ratio, so the shared chrome and the fixed 16:10
 * viewport are what make them sit together.
 */
export function ProjectShot({
  project,
  eager = false,
  className = "",
}: {
  project: Project;
  eager?: boolean;
  className?: string;
}): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The picture drifts a little slower than its frame as it crosses the
  // screen. Function form: see the scroll-timeline note in hero.tsx.
  const drift = useTransform(() =>
    reducedMotion ? "0%" : `${(scrollYProgress.get() - 0.5) * 8}%`
  );

  return (
    <div
      ref={ref}
      className={`bg-cream-light overflow-hidden rounded-lg shadow-[0_30px_60px_-30px_rgba(20,26,10,0.65)] ring-1 ring-black/10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:-rotate-1 ${className}`}
    >
      <div
        aria-hidden="true"
        className="relative flex h-7 items-center gap-1.5 px-3 sm:h-8"
      >
        <span className="bg-accent h-2 w-2 rounded-full" />
        <span className="bg-ink/25 h-2 w-2 rounded-full" />
        <span className="bg-ink/25 h-2 w-2 rounded-full" />
        <span className="text-ink/55 absolute inset-x-16 truncate text-center font-mono text-[10px] tracking-wide lowercase">
          {project.id}
        </span>
      </div>

      <div
        className={`relative aspect-[16/10] overflow-hidden ${
          project.contain ? "bg-white" : "bg-ink"
        }`}
      >
        <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
          <motion.div
            style={{ y: drift }}
            className="h-full w-full scale-[1.1]"
          >
            <img
              src={project.image}
              alt={project.imageAlt}
              loading={eager ? "eager" : "lazy"}
              draggable={false}
              className={`h-full w-full ${
                project.contain ? "object-contain p-3" : "object-cover"
              }`}
              style={{
                objectPosition: project.focus ?? "50% 0%",
                ...(project.zoom
                  ? {
                      transform: `scale(${project.zoom.scale})`,
                      transformOrigin: project.zoom.origin,
                    }
                  : {}),
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
