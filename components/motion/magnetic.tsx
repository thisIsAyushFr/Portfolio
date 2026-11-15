"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

import { useReducedMotion } from "@/lib/motion";

/** Pulls its child a few pixels toward the mouse, and springs back on leave. */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}): ReactNode {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 });

  function onMove(event: PointerEvent<HTMLSpanElement>): void {
    const el = ref.current;
    if (!el || reducedMotion || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onLeave(): void {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
