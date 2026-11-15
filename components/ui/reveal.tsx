"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { EASE } from "@/lib/motion";

const VARIANTS = {
  /** Fade and lift. */
  fade: {
    hidden: { opacity: 0, y: 36 },
    shown: { opacity: 1, y: 0 },
  },
  /** Wipe open from the bottom edge while lifting. */
  clip: {
    hidden: { clipPath: "inset(100% 0% 0% 0%)", y: 48 },
    shown: { clipPath: "inset(0% 0% 0% 0%)", y: 0 },
  },
} as const;

/** Animates its children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  variant = "fade",
  className,
}: {
  children: ReactNode;
  delay?: number;
  variant?: keyof typeof VARIANTS;
  className?: string;
}): ReactNode {
  return (
    <motion.div
      initial={VARIANTS[variant].hidden}
      whileInView={VARIANTS[variant].shown}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: variant === "clip" ? 1.1 : 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
