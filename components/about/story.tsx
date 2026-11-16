"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";

import { Label } from "@/components/ui/primitives";
import { useReducedMotion } from "@/lib/motion";

type Segment = { text: string; strong?: boolean };

/** The bio. `strong` phrases are shown in gold. */
const PARAGRAPHS: { step: string; segments: Segment[] }[] = [
  {
    step: "Who",
    segments: [
      { text: "A" },
      {
        text: "Computer Science & Engineering student specializing in AI/ML",
        strong: true,
      },
      {
        text: "passionate about building software, exploring intelligent systems, and turning ideas into practical products. I enjoy working across",
      },
      {
        text: "software development, artificial intelligence, and research",
        strong: true,
      },
      {
        text: "to create projects that are both technically meaningful and useful.",
      },
    ],
  },
  {
    step: "What",
    segments: [
      { text: "My work ranges from building" },
      { text: "AI-powered tools and full-stack applications", strong: true },
      {
        text: "to researching machine learning approaches for real-world computing problems. I’m especially interested in understanding how software, data, and intelligent systems can work together to solve problems more effectively.",
      },
    ],
  },
  {
    step: "Now",
    segments: [
      { text: "Currently, I’m focused on strengthening my" },
      { text: "software engineering and problem-solving skills,", strong: true },
      {
        text: "building high-value projects, and exploring opportunities to grow through",
      },
      {
        text: "research, international experience, and industry internships.",
        strong: true,
      },
    ],
  },
];

type Word = { text: string; strong: boolean; index: number };

// Flatten to words, numbering them across all paragraphs so one scroll
// progress value can light them in order.
let counter = 0;
const WORDS: Word[][] = PARAGRAPHS.map((paragraph) =>
  paragraph.segments.flatMap((segment) =>
    segment.text.split(" ").map((text) => ({
      text,
      strong: Boolean(segment.strong),
      index: counter++,
    }))
  )
);
const TOTAL = counter;
/** Index of the first word of each paragraph, as a fraction of all words. */
const STARTS = WORDS.map((words) => (words[0]?.index ?? 0) / TOTAL);

/** Lighting finishes a little before the section ends. */
const FINISH = 0.9;

/**
 * The bio, lit word by word as the page scrolls. Pinned on desktop; on
 * phones it scrolls normally and still lights up.
 */
export function Story(): ReactNode {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end end"],
  });
  const [step, setStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const at = value / FINISH;
    let next = 0;
    STARTS.forEach((start, index) => {
      if (at >= start) next = index;
    });
    if (next !== step) setStep(next);
  });

  return (
    <section
      ref={ref}
      className={`bg-deep text-cream relative ${reducedMotion ? "" : "md:h-[280vh]"}`}
    >
      <div
        className={`grid-w items-center gap-y-10 py-28 ${
          reducedMotion ? "md:py-44" : "md:sticky md:top-0 md:h-screen md:py-0"
        }`}
      >
        <div className="col-span-full md:col-span-4">
          <Label>The story</Label>
          <p className="t-h2 mt-8 max-w-[12ch]">
            Software, intelligence &amp; research
          </p>

          <ol aria-hidden="true" className="mt-10 hidden flex-col gap-3 md:flex">
            {PARAGRAPHS.map((paragraph, index) => {
              const active = !reducedMotion && index === step;
              return (
                <li
                  key={paragraph.step}
                  className={`t-h7 flex items-center gap-3 transition-all duration-500 ${
                    active ? "text-sage" : "opacity-40"
                  }`}
                >
                  <span
                    className={`h-0.5 bg-current transition-all duration-500 ${
                      active ? "w-10" : "w-4"
                    }`}
                  />
                  {paragraph.step}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="col-span-full flex flex-col gap-6 text-[clamp(1.05rem,1.45vw,1.5rem)] leading-[1.5] tracking-tight md:col-start-6 md:col-end-13">
          {WORDS.map((words, index) => (
            <p key={PARAGRAPHS[index]?.step}>
              {words.map((word) => (
                <LitWord
                  key={word.index}
                  word={word}
                  progress={scrollYProgress}
                  still={reducedMotion}
                />
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function LitWord({
  word,
  progress,
  still,
}: {
  word: Word;
  progress: MotionValue<number>;
  still: boolean;
}): ReactNode {
  // Function form: see the scroll-timeline note in hero.tsx. Each word fades
  // up over a window about 12 words wide, so the light has a soft edge.
  const opacity = useTransform(() => {
    if (still) return 1;
    const at = (progress.get() / FINISH) * TOTAL;
    const lit = Math.min(1, Math.max(0, (at - word.index + 6) / 12));
    return 0.22 + lit * 0.78;
  });

  return (
    <>
      <motion.span
        style={{ opacity }}
        className={word.strong ? "text-sage font-semibold" : undefined}
      >
        {word.text}
      </motion.span>{" "}
    </>
  );
}
