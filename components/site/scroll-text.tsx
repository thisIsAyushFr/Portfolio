"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode } from "react";

import { FillButton, Label } from "@/components/ui/primitives";

/** A pinned statement whose words light up one by one as the page scrolls. */
export function ScrollText({
  label,
  text,
  cta,
}: {
  label: string;
  text: string;
  cta?: { href: string; label: string };
}): ReactNode {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end end"],
  });

  const words = text.split(" ");

  return (
    <section ref={ref} className="relative h-[190vh] bg-deep text-cream">
      <div className="grid-w sticky top-0 min-h-screen content-center py-28">
        <div className="col-span-full flex flex-col items-center md:col-start-2 md:col-end-12 xl:col-start-3 xl:col-end-11">
          <Label>{label}</Label>

          <p className="t-h2 mt-8 text-center md:mt-10">
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
              {words.map((word, index) => (
                <Word
                  key={`${word}-${index}`}
                  progress={scrollYProgress}
                  range={[
                    (index / words.length) * 0.85,
                    ((index + 1) / words.length) * 0.85,
                  ]}
                >
                  {word}
                </Word>
              ))}
            </span>
          </p>

          {cta && (
            <div className="mt-8 md:mt-10">
              <FillButton href={cta.href} tone="cream">
                {cta.label}
              </FillButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}): ReactNode {
  const color = useTransform(progress, range, ["#2d0000", "#eeead7"]);
  return (
    <>
      <motion.span style={{ color }}>{children}</motion.span>{" "}
    </>
  );
}
