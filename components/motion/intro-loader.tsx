"use client";

import { animate } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { EASE } from "@/lib/motion";

/** One bar per palette colour, left to right. */
const BARS = ["bg-ink", "bg-deep", "bg-accent", "bg-sage"];

const HOLD = 0.15;
const STAGGER = 0.08;
const SLIDE = 0.7;

/**
 * Once-per-session intro: four colour bars cover the screen, then sweep up
 * and away one after another. Keep INTRO_SECONDS in lib/motion.tsx roughly
 * equal to HOLD + SLIDE, so the hero starts as the bars leave.
 */
export function IntroLoader(): ReactNode {
  const panel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = panel.current;
    const root = document.documentElement;
    if (!el || root.dataset.intro === "skip") return;

    const bars = Array.from(el.children) as HTMLElement[];
    const runs = bars.map((bar, index) =>
      animate(
        bar,
        { y: ["0%", "-100%"] },
        { duration: SLIDE, delay: HOLD + index * STAGGER, ease: EASE }
      )
    );

    let cancelled = false;
    void Promise.all(runs).then(() => {
      if (cancelled) return;
      root.dataset.intro = "skip";
      try {
        sessionStorage.setItem("intro", "1");
      } catch {
        // Storage can be blocked; the intro just shows again next load.
      }
    });

    return () => {
      cancelled = true;
      runs.forEach((run) => run.stop());
    };
  }, []);

  return (
    <div
      ref={panel}
      aria-hidden="true"
      className="intro-loader pointer-events-none fixed inset-0 z-[200] flex"
    >
      {BARS.map((colour) => (
        // Taller than the screen, with a rounded bottom that only shows once
        // the bar starts to lift.
        <span
          key={colour}
          className={`-mx-px h-[118%] flex-1 [border-bottom-left-radius:50%_12vh] [border-bottom-right-radius:50%_12vh] will-change-transform ${colour}`}
        />
      ))}
    </div>
  );
}
