"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { EASE } from "@/lib/motion";

/**
 * Heading text whose letters rise out of a mask, one after another, the
 * first time it scrolls into view. Pass one string per line. Screen readers
 * get the plain text; the animated letters are hidden from them.
 */
export function SplitReveal({
  lines,
  stagger = 0.022,
}: {
  lines: string[];
  stagger?: number;
}): ReactNode {
  let letterIndex = 0;

  return (
    <>
      <span className="sr-only">{lines.join(" ")}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        className="block"
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line.split(" ").map((word, wordIndex) => (
              <span key={`${word}-${wordIndex}`}>
                {wordIndex > 0 && " "}
                <span className="-mb-[0.12em] inline-block overflow-hidden pt-[0.08em] pb-[0.12em] align-bottom whitespace-nowrap">
                  {Array.from(word).map((letter, index) => {
                    const delay = letterIndex++ * stagger;
                    return (
                      <motion.span
                        key={index}
                        variants={{
                          hidden: { y: "115%" },
                          shown: {
                            y: "0%",
                            transition: { duration: 0.9, delay, ease: EASE },
                          },
                        }}
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                </span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </>
  );
}
