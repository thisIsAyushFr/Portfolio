"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

import { getLenis } from "@/components/layout/smooth-scroll";
import type { Project } from "@/lib/data";
import { EASE, useReducedMotion } from "@/lib/motion";

/**
 * A sticky list of project names beside the rows on wide screens. The project
 * on screen is highlighted, and clicking a name scrolls to it.
 */
export function SideIndex({
  projects,
  active,
}: {
  projects: Project[];
  /** Zero-based index of the project on screen. */
  active: number;
}): ReactNode {
  const reducedMotion = useReducedMotion();

  function go(id: string): void {
    const row = document.getElementById(id);
    if (!row) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(row);
    else row.scrollIntoView();
  }

  return (
    <nav aria-label="Projects on this page" className="hidden xl:block">
      <div className="sticky top-0 flex h-screen items-center pl-[var(--margin)]">
        <ul className="flex flex-col gap-1">
          <AnimatePresence mode="popLayout" initial={false}>
            {projects.map((project, index) => {
              const current = index === active;
              return (
                <motion.li
                  key={project.id}
                  layout={reducedMotion ? false : "position"}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={() => go(project.id)}
                    aria-current={current ? "true" : undefined}
                    className={`focus-ring t-label relative flex items-center py-1.5 text-left transition-[opacity,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      current
                        ? "pl-8 opacity-100"
                        : "pl-0 opacity-45 hover:opacity-100"
                    }`}
                  >
                    {current && (
                      <motion.span
                        layoutId="side-index-line"
                        aria-hidden="true"
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                        className="bg-accent absolute left-0 h-0.5 w-6"
                      />
                    )}
                    {project.title}
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </nav>
  );
}
