"use client";

import { FolderOpen, UserRound } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useRef, type ComponentType, type ReactNode } from "react";

import { Label } from "@/components/ui/primitives";
import { HeroStack } from "./hero-stack";
import { EASE, introDelay } from "@/lib/motion";


const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

export function Hero(): ReactNode {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // The shift distance is a CSS variable so small screens can move less.
  const contentProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const contentY = useMotionTemplate`calc(${contentProgress} * var(--hero-shift))`;
  const contentScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.86]);
  const stackY = useTransform(scrollYProgress, [0, 0.8], ["62%", "-6%"]);
  const stackScale = useTransform(scrollYProgress, [0, 0.8], [0.84, 1]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.5]);
  // Function-form transforms on purpose: range-mapped opacity gets handed to a
  // native scroll timeline that tracks the whole page, not this section.
  const hotspotOpacity = useTransform(() =>
    clamp01((scrollYProgress.get() - 0.5) / 0.25)
  );
  const hintOpacity = useTransform(
    () => 1 - clamp01(scrollYProgress.get() / 0.12)
  );

  // Hold the entrance until the intro loader lifts (zero on later visits).
  const wait = introDelay();

  return (
    <section ref={ref} className="relative h-[210vh] bg-cream">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Sky */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-cream-light via-cream to-[#f0e9c4]"
        />
        <motion.div
          aria-hidden="true"
          style={{ scale: glowScale }}
          className="absolute bottom-[-30vh] left-1/2 h-[90vh] w-[90vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(188,108,37,0.30)_0%,rgba(188,108,37,0.12)_38%,transparent_68%)]"
        />

        {/* Copy */}
        <motion.div
          style={{ y: contentY, scale: contentScale }}
          className="relative flex origin-top flex-col items-center px-[var(--margin)] pt-[max(7rem,15vh)] text-center text-ink [--hero-shift:-4vh] md:[--hero-shift:-19vh]"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: wait + 0.1, ease: EASE }}
          >
            <Label>Hey, I&rsquo;m Ayush</Label>
          </motion.div>

          <h1 className="t-xl mt-7 sm:mt-9">
            <HeroLine delay={wait + 0.2}>
              Computer <br className="sm:hidden" />
              Science &amp;
            </HeroLine>
            <HeroLine delay={wait + 0.32}>AI/ML Engineer</HeroLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: wait + 0.55, ease: EASE }}
            className="t-body mt-7 max-w-[36ch] sm:mt-9"
          >
            Computer Science student building software, AI systems, and
            research-driven projects.
          </motion.p>
        </motion.div>

        {/* Rising stack of real work: see hero-stack.tsx */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
          <motion.div
            style={{ y: stackY, scale: stackScale }}
            className="pointer-events-auto relative aspect-[5/2] w-[min(92vw,60rem)] origin-bottom will-change-transform"
          >
            <HeroStack progress={scrollYProgress} wait={wait} />

            <motion.div style={{ opacity: hotspotOpacity }}>
              <Hotspot
                href="/projects"
                label="Explore projects"
                icon={FolderOpen}
                side="left"
                className="top-[-62%] left-[9%] md:top-[58%] md:left-[-5%]"
              />
              <Hotspot
                href="/about"
                label="About me"
                icon={UserRound}
                side="right"
                className="top-[-24%] left-[91%] md:top-[58%] md:left-[105%]"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ opacity: hintOpacity }}
          className="t-label absolute bottom-6 left-[var(--margin)] hidden items-center gap-3 text-ink sm:flex"
        >
          <span className="inline-block h-8 w-px bg-ink" />
          Scroll
        </motion.div>
      </div>
    </section>
  );
}

function HeroLine({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}): ReactNode {
  return (
    <span className="block overflow-hidden pt-[0.08em]">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * A marker pinned beside the project stack. On desktop the flag points away
 * from the stack; on small screens it points inward so it stays on screen.
 */
function Hotspot({
  href,
  label,
  icon: Icon,
  side,
  className,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  side: "left" | "right";
  className: string;
}): ReactNode {
  const outward = side === "left" ? "leftward" : "rightward";
  const inward = side === "left" ? "rightward" : "leftward";

  return (
    <Link
      href={href}
      data-open="true"
      className={`hotspot focus-ring group absolute z-10 block -translate-x-1/2 -translate-y-1/2 rounded-full ${className}`}
    >
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream-light transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
        <Icon className="h-4.5 w-4.5" strokeWidth={2.25} />
        <svg
          aria-hidden="true"
          viewBox="0 0 60 60"
          className="hotspot-ring absolute -inset-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+0.75rem)] text-ink"
        >
          <circle
            cx="30"
            cy="30"
            r="29"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="3 5"
          />
        </svg>
      </span>
      <Flag direction={outward} className="hidden md:block">
        {label}
      </Flag>
      <Flag direction={inward} className="md:hidden">
        {label}
      </Flag>
    </Link>
  );
}

function Flag({
  children,
  direction,
  className,
}: {
  children: ReactNode;
  direction: "leftward" | "rightward";
  className: string;
}): ReactNode {
  const leftward = direction === "leftward";
  return (
    <span
      className={`hotspot-flag absolute top-1/2 -translate-y-1/2 ${
        leftward
          ? "hotspot-flag--left right-[calc(100%+0.6rem)]"
          : "left-[calc(100%+0.6rem)]"
      } ${className}`}
    >
      <span
        className={`t-h8 block bg-ink py-4 whitespace-nowrap text-cream-light ${
          leftward ? "pr-7 pl-4" : "pr-4 pl-7"
        }`}
        style={{
          clipPath: leftward
            ? "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)"
            : "polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)",
        }}
      >
        {children}
      </span>
    </span>
  );
}
