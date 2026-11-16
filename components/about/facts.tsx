"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { PROJECTS } from "@/lib/data";
import { EASE, useReducedMotion } from "@/lib/motion";

type Fact = {
  label: string;
  /** Plain text, or a number that counts up. */
  value: string | { count: number; decimals: number };
};

const FACTS: Fact[] = [
  { label: "Based in", value: "India" },
  { label: "Studying", value: "B.E. CSE (AI/ML)" },
  { label: "CGPA", value: { count: 9.39, decimals: 2 } },
  { label: "Projects", value: { count: PROJECTS.length, decimals: 0 } },
  { label: "Next", value: "Exchange in Germany, 2027" },
];

/** A row of quick facts under the About title. */
export function Facts(): ReactNode {
  return (
    <section
      aria-label="Quick facts"
      className="bg-cream text-ink px-[var(--margin)] pb-24 md:pb-32"
    >
      <ul className="border-ink/30 grid grid-cols-2 border-t border-l md:grid-cols-5">
        {FACTS.map((fact, index) => (
          <li
            key={fact.label}
            className="border-ink/30 group hover:bg-accent hover:text-cream-light border-r border-b transition-colors duration-500 last:col-span-2 md:last:col-span-1"
          >
            <Reveal delay={index * 0.08} className="flex h-full flex-col p-5 md:p-6">
              <span className="t-label opacity-60">{fact.label}</span>
              <span className="t-h3 mt-6 md:mt-10">
                {typeof fact.value === "string" ? (
                  fact.value
                ) : (
                  <CountUp to={fact.value.count} decimals={fact.value.decimals} />
                )}
              </span>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CountUp({
  to,
  decimals,
}: {
  to: number;
  decimals: number;
}): ReactNode {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const run = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = value.toFixed(decimals);
      },
    });
    return () => run.stop();
  }, [inView, reducedMotion, to, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {to.toFixed(decimals)}
    </span>
  );
}
