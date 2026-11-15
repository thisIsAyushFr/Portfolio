"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode } from "react";

import { SplitReveal } from "@/components/motion/split-reveal";
import { Label } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
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
    note: "Robust ML-based CPU–GPU device selection under hardware and load shift.",
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
 * Vertical timeline: a spine runs down the section and fills in as the page
 * scrolls. Entries alternate left and right of it on desktop, and sit to its
 * right on phones.
 */
export function Moments(): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.65", "end 0.65"],
  });
  const fill = useTransform(() => scrollYProgress.get());

  return (
    <section
      aria-label="Signature moments"
      className="bg-ink py-28 text-cream md:py-44"
    >
      <div className="grid-w">
        <Reveal className="col-span-full flex flex-col items-center text-center">
          <Label>Signature moments</Label>
          <h2 className="t-l mt-8 md:mt-10">
            <SplitReveal lines={["The story", "in numbers"]} />
          </h2>
        </Reveal>
      </div>

      <div
        ref={ref}
        className="relative mx-auto mt-16 max-w-[80rem] px-[var(--margin)] md:mt-24"
      >
        {/* Spine */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[var(--margin)] w-px bg-cream/20 md:left-1/2"
        >
          <motion.div
            style={{ scaleY: fill }}
            className="h-full w-full origin-top bg-sage"
          />
        </div>

        <ol>
          {MOMENTS.map((moment, index) => (
            <MomentRow
              key={moment.title}
              moment={moment}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function MomentRow({
  moment,
  index,
  progress,
}: {
  moment: Moment;
  index: number;
  progress: MotionValue<number>;
}): ReactNode {
  const left = index % 2 === 0;
  // Rows are roughly equal in height, so the spine reaches this row's dot at
  // about this fraction of the list.
  const at = (index + 0.3) / MOMENTS.length;
  const dot = useTransform(() =>
    progress.get() >= at ? "var(--sage)" : "var(--ink)"
  );
  const dotScale = useTransform(() => (progress.get() >= at ? 1.25 : 1));

  return (
    <li className="relative grid grid-cols-1 py-8 pl-9 md:grid-cols-2 md:py-14 md:pl-0">
      <motion.span
        aria-hidden="true"
        style={{ backgroundColor: dot, scale: dotScale }}
        className="absolute top-[3.2rem] left-0 -ml-[6.5px] h-[13px] w-[13px] rounded-full border border-cream/60 transition-colors duration-500 md:top-[5.5rem] md:left-1/2"
      />

      <Reveal
        className={`flex flex-col ${
          left
            ? "md:col-start-1 md:items-end md:pr-16 md:text-right"
            : "md:col-start-2 md:pl-16"
        }`}
      >
        <span className="t-label opacity-60">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(MOMENTS.length).padStart(2, "0")}
        </span>
        <p className={`t-l mt-3 ${left ? "text-sage" : "text-cream"}`}>
          {moment.figure}
        </p>
        <h3 className="t-h3 mt-3">{moment.title}</h3>
        <p className="t-body mt-3 max-w-[32ch] opacity-75">{moment.note}</p>
      </Reveal>
    </li>
  );
}
