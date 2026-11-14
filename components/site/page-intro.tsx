"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { Label } from "@/components/ui/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Centered label / giant title / copy block that opens the inner pages. */
export function PageIntro({
  label,
  title,
  copy,
  children,
}: {
  label: string;
  title: string[];
  copy: string;
  children?: ReactNode;
}): ReactNode {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-cream-light to-cream px-[var(--margin)] pt-36 pb-20 text-center text-forest md:pt-48 md:pb-28">
      {children}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      >
        <Label>{label}</Label>
      </motion.div>

      <h1 className="t-xl mt-7 sm:mt-9">
        {title.map((line, index) => (
          <span key={line} className="block overflow-hidden pt-[0.08em]">
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1,
                delay: 0.2 + index * 0.12,
                ease: EASE,
              }}
              className="block"
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        className="t-body mx-auto mt-7 max-w-[40ch] sm:mt-9"
      >
        {copy}
      </motion.p>
    </section>
  );
}
