"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { EDUCATION, EXPERIENCE, type TimelineEntry } from "@/lib/data";
import { EASE, useReducedMotion } from "@/lib/motion";

/** Roles first, then schools with the most recent first. */
const ENTRIES: TimelineEntry[] = [...EXPERIENCE, ...[...EDUCATION].reverse()];

const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;

/**
 * Experience and education as one path: a line fills in as the page scrolls,
 * each logo pops onto it, and each entry slides in beside it.
 */
export function JourneyPath(): ReactNode {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.55"],
  });
  const fill = useTransform(() => (reducedMotion ? 1 : scrollYProgress.get()));

  return (
    <div ref={ref} className="relative">
      {/* The line runs through the middle of the logos. */}
      <div
        aria-hidden="true"
        className="bg-ink/20 absolute top-0 bottom-0 left-7 w-px sm:left-8"
      >
        <motion.div
          style={{ scaleY: fill }}
          className="bg-accent h-full w-full origin-top"
        />
      </div>

      <ol className="flex flex-col">
        {ENTRIES.map((entry) => (
          <li
            key={`${entry.place}-${entry.role}`}
            className="relative flex items-start gap-5 py-6 sm:gap-8 sm:py-8"
          >
            <motion.span
              aria-hidden="true"
              initial={reducedMotion ? false : { scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={VIEW}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="ring-ink/15 relative z-10 flex h-14 w-14 shrink-0 items-center justify-center bg-white p-2 ring-1 sm:h-16 sm:w-16"
            >
              <img
                src={entry.logo}
                alt=""
                className="max-h-full max-w-full object-contain"
                draggable={false}
              />
            </motion.span>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEW}
              transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
              className="border-ink/25 group hover:border-accent flex min-w-0 flex-1 flex-col gap-4 border-b pb-6 transition-colors duration-500 sm:flex-row sm:items-end sm:justify-between sm:pb-8"
            >
              <div className="min-w-0">
                <span
                  className={`t-label px-2 py-1 ${
                    entry.kind === "Experience"
                      ? "bg-accent text-cream-light"
                      : "bg-ink text-cream"
                  }`}
                >
                  {entry.kind}
                </span>
                <h3 className="t-h3 mt-4">{entry.place}</h3>
                <p className="t-body mt-1 opacity-80">{entry.role}</p>
              </div>
              <p className="t-h2 text-ink/35 group-hover:text-accent shrink-0 whitespace-nowrap transition-colors duration-500 !text-[clamp(1.5rem,2.6vw,2.75rem)]">
                {entry.period}
              </p>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}
