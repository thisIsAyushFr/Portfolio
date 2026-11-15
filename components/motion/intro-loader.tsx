"use client";

import { animate } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { EASE, INTRO_SECONDS } from "@/lib/motion";

/** Once-per-session intro: a counter runs to 100, then the panel lifts. */
export function IntroLoader(): ReactNode {
  const panel = useRef<HTMLDivElement | null>(null);
  const count = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = panel.current;
    const root = document.documentElement;
    if (!el || root.dataset.intro === "skip") return;

    const finish = (): void => {
      root.dataset.intro = "skip";
      try {
        sessionStorage.setItem("intro", "1");
      } catch {
        // Storage can be blocked; the loader just shows again next load.
      }
    };

    const counter = animate(0, 100, {
      duration: INTRO_SECONDS - 0.2,
      ease: "easeInOut",
      onUpdate: (value) => {
        if (count.current) {
          count.current.textContent = String(Math.round(value)).padStart(2, "0");
        }
      },
      onComplete: () => {
        animate(
          el,
          { clipPath: ["inset(0 0 0% 0)", "inset(0 0 100% 0)"] },
          { duration: 0.9, ease: EASE }
        ).then(finish);
      },
    });

    return () => counter.stop();
  }, []);

  return (
    <div
      ref={panel}
      aria-hidden="true"
      className="intro-loader fixed inset-0 z-[200] flex flex-col justify-between bg-ink p-[var(--margin)] text-cream"
    >
      <span className="t-label opacity-70">Portfolio &mdash; 2026</span>
      <span className="t-xl text-center">Ayush</span>
      <span className="flex items-end justify-between">
        <span className="t-label opacity-70">Loading</span>
        <span ref={count} className="t-h1 tabular-nums text-sage">
          00
        </span>
      </span>
    </div>
  );
}
