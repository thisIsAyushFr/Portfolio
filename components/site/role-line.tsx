"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";

import { FillButton, Label } from "@/components/ui/primitives";
import { PROJECTS } from "@/lib/data";
import { EASE, useReducedMotion } from "@/lib/motion";

/** One line per thing I do. `highlight` is the phrase shown in sage. */
const SENTENCES = [
  { before: "I", highlight: "build software", after: "that people actually use." },
  { before: "I", highlight: "train ML models", after: "from data to deployment." },
  {
    before: "I",
    highlight: "research",
    after: "ideas in tech and AI, then test whether they hold up.",
  },
  { before: "I", highlight: "design AI tools", after: "that make studying easier." },
  { before: "I", highlight: "wire hardware", after: "to computer vision." },
  { before: "I", highlight: "lead", after: "content at Code2Chill and represent my class." },
  { before: "I", highlight: "compete", after: "in hackathons, finalist among 100+ teams." },
];

const TOTAL = SENTENCES.length;
const pad = (n: number): string => String(n).padStart(2, "0");
const full = (s: (typeof SENTENCES)[number]): string =>
  `${s.before} ${s.highlight} ${s.after}`;

const BIG =
  "font-display uppercase leading-[1.05] text-[clamp(2.25rem,6.2vw,6.5rem)]";

// `d` is the scroll direction: 1 going down, -1 going back up.
const WORD = {
  enter: (d: number) => ({
    y: `${d * 0.6}em`,
    opacity: 0,
    filter: "blur(10px)",
    rotateX: d * -40,
  }),
  shown: {
    y: "0em",
    opacity: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: { duration: 0.7, ease: EASE },
  },
  exit: (d: number) => ({
    y: `${d * -0.4}em`,
    opacity: 0,
    filter: "blur(8px)",
    transition: { duration: 0.3, ease: EASE },
  }),
};

const LINE = {
  enter: {},
  shown: { transition: { staggerChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.015 } },
};

const UNDERLINE = {
  enter: { scaleX: 0 },
  shown: {
    scaleX: 1,
    transition: { duration: 0.6, ease: EASE, delay: 0.35 },
  },
  exit: { scaleX: 0, transition: { duration: 0.2 } },
};

/**
 * Pinned intro: one sentence per thing I do. Scrolling swaps the sentence;
 * the old words lift away and the new ones settle in one after another.
 */
export function RoleLine(): ReactNode {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(TOTAL - 1, Math.floor(value * TOTAL));
    if (next === active) return;
    setDirection(next > active ? 1 : -1);
    setActive(next);
  });

  const bio = (
    <>
      <p className="t-body mt-8 max-w-[44ch] text-center md:mt-10">
        AI/ML student at Chitkara University &middot; 9.39 CGPA &middot;{" "}
        {PROJECTS.length}+ projects across software, AI and research.
      </p>
      <div className="mt-8 md:mt-10">
        <FillButton href="/about" tone="cream">
          About me
        </FillButton>
      </div>
    </>
  );

  if (reducedMotion) {
    return (
      <section className="flex flex-col items-center bg-deep px-[var(--margin)] py-28 text-cream">
        <Label>Curious by default</Label>
        <ul className="t-h2 mt-10 flex flex-col gap-4 text-center">
          {SENTENCES.map((sentence) => (
            <li key={sentence.highlight}>
              {sentence.before}{" "}
              <span className="text-sage">{sentence.highlight}</span>{" "}
              {sentence.after}
            </li>
          ))}
        </ul>
        {bio}
      </section>
    );
  }

  const sentence = SENTENCES[active] ?? SENTENCES[0]!;
  const words = [
    ...sentence.before.split(" ").map((text) => ({ text, lit: false })),
    ...sentence.highlight.split(" ").map((text) => ({ text, lit: true })),
    ...sentence.after.split(" ").map((text) => ({ text, lit: false })),
  ];

  return (
    <section
      ref={ref}
      className="relative bg-deep text-cream"
      style={{ height: `${TOTAL * 40 + 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-[var(--margin)]">
        <Label>Curious by default</Label>

        <ul className="sr-only">
          {SENTENCES.map((item) => (
            <li key={item.highlight}>{full(item)}</li>
          ))}
        </ul>

        {/* Fixed height (three lines) so the layout never jumps. */}
        <div
          aria-hidden="true"
          className={`${BIG} mt-8 flex min-h-[3.3em] w-full max-w-[11em] items-center justify-center md:mt-10`}
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.p
              key={active}
              variants={LINE}
              initial="enter"
              animate="shown"
              exit="exit"
              className="text-center [perspective:900px]"
            >
              {words.map((word, index) => (
                <span key={`${word.text}-${index}`}>
                  <motion.span
                    custom={direction}
                    variants={WORD}
                    className={`relative inline-block origin-bottom will-change-transform ${
                      word.lit ? "text-sage" : ""
                    }`}
                  >
                    {word.text}
                    {word.lit && (
                      <motion.span
                        variants={UNDERLINE}
                        className="absolute right-0 bottom-[0.02em] left-0 h-[0.05em] origin-left bg-sage"
                      />
                    )}
                  </motion.span>{" "}
                </span>
              ))}
            </motion.p>
          </AnimatePresence>
        </div>

        <div
          aria-hidden="true"
          className="mt-8 flex items-center gap-4 md:mt-10"
        >
          <span className="t-label tabular-nums">
            <span className="text-sage">{pad(active + 1)}</span> / {pad(TOTAL)}
          </span>
          <span className="flex items-center gap-1.5">
            {SENTENCES.map((item, index) => (
              <span
                key={item.highlight}
                className={`h-1 transition-all duration-500 ${
                  index === active
                    ? "w-8 bg-sage"
                    : index < active
                      ? "w-3 bg-cream/60"
                      : "w-3 bg-cream/25"
                }`}
              />
            ))}
          </span>
        </div>

        {bio}
      </div>
    </section>
  );
}
