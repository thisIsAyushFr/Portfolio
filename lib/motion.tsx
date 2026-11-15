"use client";

import { motion, type MotionProps, type Variants } from "motion/react";
import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

function subscribeToReducedMotion(callback: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

const ReducedMotionContext = createContext<boolean>(false);

export function useReducedMotion(): boolean {
  return useContext(ReducedMotionContext);
}

export function ReducedMotionProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  return (
    <ReducedMotionContext.Provider value={prefersReducedMotion}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const defaultTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const,
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

type MotionDivProps = {
  variants?: Variants;
  children?: ReactNode;
  className?: string;
} & MotionProps;

export function MotionDiv({
  variants = fadeInUp,
  children,
  className,
  ...props
}: MotionDivProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  const activeVariants = prefersReducedMotion ? reducedMotionVariants : variants;
  const activeTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={activeVariants}
      transition={activeTransition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionSection({
  variants = fadeInUp,
  children,
  className,
  ...props
}: MotionDivProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  const activeVariants = prefersReducedMotion ? reducedMotionVariants : variants;
  const activeTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={activeVariants}
      transition={activeTransition}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function StaggerContainer({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & MotionProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={prefersReducedMotion ? reducedMotionVariants : staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & MotionProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? reducedMotionVariants : fadeInUp}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** The one easing curve used across the site. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Seconds the intro loader stays up before it lifts. */
export const INTRO_SECONDS = 1.5;

/**
 * Extra delay for above-the-fold entrances, so they play as the intro loader
 * lifts instead of underneath it. Zero once the loader has run (or was
 * skipped). Only use the result for animation timing, never for markup.
 */
export function introDelay(): number {
  if (typeof document === "undefined") return 0;
  return document.documentElement.dataset.intro === "skip" ? 0 : INTRO_SECONDS;
}
