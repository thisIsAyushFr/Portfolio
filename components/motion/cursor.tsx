"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/lib/motion";

/**
 * Custom cursor for mouse users. A dot trails the pointer, grows over links
 * and buttons, and turns into a "View" disc over `data-cursor="view"`.
 * Touch devices and reduced-motion users keep the native cursor.
 */
export function Cursor(): ReactNode {
  const reducedMotion = useReducedMotion();
  const dot = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;

    function onMove(event: PointerEvent): void {
      if (event.pointerType !== "mouse") return;
      root.classList.add("has-cursor");
      x.set(event.clientX);
      y.set(event.clientY);
    }

    function onOver(event: PointerEvent): void {
      const el = dot.current;
      const target = event.target as HTMLElement;
      if (!el || !target.closest) return;
      el.dataset.state = target.closest('[data-cursor="view"]')
        ? "view"
        : target.closest("a, button")
          ? "link"
          : "";
    }

    function onLeave(): void {
      root.classList.remove("has-cursor");
    }

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-cursor");
    };
  }, [reducedMotion, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="site-cursor pointer-events-none fixed top-0 left-0 z-[300]"
    >
      <div ref={dot} className="site-cursor-dot">
        <span className="t-label">View</span>
      </div>
    </motion.div>
  );
}
