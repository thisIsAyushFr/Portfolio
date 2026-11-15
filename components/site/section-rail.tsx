"use client";

import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { getLenis } from "@/components/layout/smooth-scroll";
import { EASE, useReducedMotion } from "@/lib/motion";

export type RailSection = { id: string; label: string };

const pad = (n: number): string => String(n).padStart(2, "0");

/**
 * A floating pill at the bottom of the home page: the current section's
 * number and name, and how far through it you are. Click it for a menu of
 * every section. Hidden on the first section and after the last one.
 */
export function SectionRail({
  sections,
}: {
  sections: RailSection[];
}): ReactNode {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const progress = useMotionValue(0);
  const root = useRef<HTMLElement | null>(null);
  const activeRef = useRef<string | null>(null);

  // Which section crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          else setActive((current) => (current === id ? null : current));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  // How far through the active section the middle of the viewport is.
  useEffect(() => {
    activeRef.current = active;
    let frame = 0;
    function measure(): void {
      frame = 0;
      const id = activeRef.current;
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      const box = el.getBoundingClientRect();
      const value = (window.innerHeight / 2 - box.top) / box.height;
      progress.set(Math.min(1, Math.max(0, value)));
    }
    function onScroll(): void {
      if (!frame) frame = requestAnimationFrame(measure);
      setOpen(false);
    }
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [active, progress]);

  // Close the menu on Escape or a click outside.
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent): void {
      if (event.key === "Escape") setOpen(false);
    }
    function onDown(event: PointerEvent): void {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  function go(id: string): void {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView();
  }

  const index = sections.findIndex((section) => section.id === active);
  const current = index >= 0 ? sections[index] : undefined;
  const visible = index > 0;
  const duration = reducedMotion ? 0 : 0.5;

  return (
    <nav
      ref={root}
      aria-label="Sections"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center md:bottom-5"
    >
      <AnimatePresence>
        {visible && current && (
          <motion.div
            initial={{ y: "140%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "140%", opacity: 0 }}
            transition={{ duration, ease: EASE }}
            className="pointer-events-auto relative"
          >
            {/* Menu */}
            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.96 }}
                  transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }}
                  className="absolute bottom-full left-1/2 mb-3 w-56 origin-bottom -translate-x-1/2 rounded-2xl border border-cream/15 bg-ink/90 p-2 text-cream shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md"
                >
                  {sections.map((section, i) => {
                    const here = section.id === active;
                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          autoFocus={here}
                          onClick={() => go(section.id)}
                          aria-current={here ? "true" : undefined}
                          className={`focus-ring t-h8 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 ${
                            here ? "bg-cream/10" : "hover:bg-cream/5"
                          }`}
                        >
                          <span
                            className={`t-label tabular-nums ${
                              here ? "text-sage" : "opacity-50"
                            }`}
                          >
                            {pad(i + 1)}
                          </span>
                          {section.label}
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>

            {/* Pill */}
            <motion.button
              layout={!reducedMotion}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={`Section ${index + 1} of ${sections.length}: ${current.label}. Show all sections`}
              transition={{ duration, ease: EASE }}
              className="focus-ring flex items-center gap-3 rounded-full border border-cream/15 bg-ink/85 py-2.5 pr-3 pl-4 text-cream shadow-[0_15px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md"
            >
              <motion.span layout="position" className="t-label text-sage tabular-nums">
                {pad(index + 1)}
              </motion.span>

              <span className="relative grid overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={current.id}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
                    className="t-h8 whitespace-nowrap"
                  >
                    {current.label}
                  </motion.span>
                </AnimatePresence>
              </span>

              <motion.span
                layout="position"
                aria-hidden="true"
                className="h-0.5 w-12 overflow-hidden rounded-full bg-cream/20 md:w-16"
              >
                <motion.span
                  style={{ scaleX: progress }}
                  className="block h-full origin-left bg-sage"
                />
              </motion.span>

              <motion.span layout="position" aria-hidden="true">
                <ChevronUp
                  className={`h-4 w-4 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
