"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/lib/motion";

/** Percent of the track travelled per second when the page is still. */
const BASE_SPEED = 1.6;

/**
 * Endless ticker that reacts to scrolling: it speeds up with scroll velocity,
 * follows the scroll direction, and leans into the movement. The list is
 * rendered twice so the loop is seamless at -50%.
 */
export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}): ReactNode {
  const reducedMotion = useReducedMotion();
  const offset = useMotionValue(0);
  const direction = useRef(-1);

  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), {
    damping: 50,
    stiffness: 400,
  });

  const x = useTransform(offset, (value) => `${value}%`);
  const skewX = useTransform(() =>
    reducedMotion ? 0 : Math.max(-8, Math.min(8, velocity.get() / -250))
  );

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;

    const speed = velocity.get();
    if (speed > 1) direction.current = -1;
    else if (speed < -1) direction.current = 1;

    const boost = 1 + Math.min(Math.abs(speed) / 180, 9);
    let next =
      offset.get() + direction.current * BASE_SPEED * boost * (delta / 1000);

    // Keep the offset inside (-50, 0] so the two copies loop seamlessly.
    if (next <= -50) next += 50;
    else if (next > 0) next -= 50;
    offset.set(next);
  });

  return (
    <div className={`overflow-hidden py-6 md:py-8 ${className}`}>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <motion.div
        aria-hidden="true"
        style={{ x, skewX }}
        className="flex w-max will-change-transform"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="t-h2 flex items-center whitespace-nowrap"
              >
                {item}
                <span className="mx-6 inline-block h-3 w-3 rounded-full bg-ink md:mx-10 md:h-4 md:w-4" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
