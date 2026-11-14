"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

import { Label } from "@/components/ui/primitives";
import { PROJECTS } from "@/lib/data";

type Moment = { figure: string; title: string; note: string };

const MOMENTS: Moment[] = [
  {
    figure: "2025",
    title: "Started at Chitkara University",
    note: "B.E. Computer Science & Engineering, specializing in AI/ML.",
  },
  {
    figure: "9.39",
    title: "CGPA out of 10",
    note: "Holding the grades steady while building on the side.",
  },
  {
    figure: String(PROJECTS.length).padStart(2, "0"),
    title: "Projects built",
    note: "Across software, AI, research, and product.",
  },
  {
    figure: "100+",
    title: "Teams at Vibe to Viable",
    note: "CareSync made it through as a finalist.",
  },
  {
    figure: "01",
    title: "Paper under review",
    note: "GPU-accelerated optimization: predicting CPU vs GPU workloads.",
  },
  {
    figure: "2026",
    title: "Head of Content, Code2Chill",
    note: "Also serving as Class Representative at Chitkara.",
  },
  {
    figure: "2027",
    title: "Semester exchange in Germany",
    note: "DHBW Ravensburg, January to March.",
  },
  {
    figure: "2029",
    title: "Graduating",
    note: "And looking for research and internship opportunities until then.",
  },
];

/**
 * Sideways timeline: the section pins while vertical scrolling slides the
 * track horizontally. The track is translated by its own overflow
 * (100vw - 100%), so no measuring is needed.
 */
export function Moments(): ReactNode {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useMotionTemplate`calc(${scrollYProgress} * (100vw - 100%))`;
  const percent = useTransform(
    () => `${String(Math.round(scrollYProgress.get() * 100)).padStart(2, "0")}%`
  );
  const barScale = useTransform(() => scrollYProgress.get());

  return (
    <section
      ref={ref}
      aria-label="Signature moments"
      className="relative bg-forest text-cream"
      style={{ height: `${MOMENTS.length * 55 + 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="flex items-center justify-between px-[var(--margin)] pt-24 md:pt-28">
          <Label>Signature moments</Label>
          <motion.span className="t-h7 tabular-nums">{percent}</motion.span>
        </div>

        <motion.ol
          style={{ x }}
          className="flex w-max flex-1 items-stretch will-change-transform"
        >
          <li className="flex w-[86vw] shrink-0 flex-col justify-center px-[var(--margin)] md:w-[46vw]">
            <h2 className="t-l">
              The story
              <br />
              in numbers
            </h2>
            <p className="t-body mt-6 max-w-[34ch] opacity-80">
              Keep scrolling &mdash; this one moves sideways.
            </p>
          </li>

          {MOMENTS.map((moment, index) => (
            <li
              key={moment.title}
              className="relative flex w-[78vw] shrink-0 flex-col justify-center px-8 md:w-[30vw] md:px-12"
            >
              <span
                aria-hidden="true"
                className="trail-dashed absolute top-[12%] bottom-0 left-0 w-px text-cream/30"
              />
              <span className="t-label opacity-60">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(MOMENTS.length).padStart(2, "0")}
              </span>
              <p
                className={`t-l mt-4 ${index % 2 === 0 ? "text-amber" : "text-cream"}`}
              >
                {moment.figure}
              </p>
              <h3 className="t-h3 mt-4">{moment.title}</h3>
              <p className="t-body mt-3 max-w-[30ch] opacity-75">
                {moment.note}
              </p>
            </li>
          ))}
          <li aria-hidden="true" className="w-[8vw] shrink-0" />
        </motion.ol>

        {/* Ruler */}
        <div aria-hidden="true" className="px-[var(--margin)] pb-6 md:pb-8">
          <div
            className="h-3 w-full text-cream/40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, currentColor 0 1px, transparent 1px 14px)",
            }}
          />
          <div className="mt-2 h-0.5 w-full bg-cream/20">
            <motion.div
              style={{ scaleX: barScale }}
              className="h-full origin-left bg-amber"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
