"use client";

import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

import { SplitReveal } from "@/components/motion/split-reveal";
import { Label } from "@/components/ui/primitives";
import { ProjectShot } from "@/components/ui/project-shot";
import { Reveal } from "@/components/ui/reveal";
import { FEATURED_COUNT, PROJECTS, type Project } from "@/lib/data";
import { useReducedMotion } from "@/lib/motion";

/** Card colours, cycled in order. Each must stand out from the deep backdrop. */
const THEMES = [
  "bg-cream text-ink",
  "bg-accent text-cream-light",
  "bg-sage text-ink",
  "bg-cream-light text-ink",
  "bg-ink text-cream",
];

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/**
 * Featured projects as a deck. Every card is sticky inside one tall
 * container, so each new card slides up over the last one, which shrinks and
 * dims behind it.
 */
export function Trail(): ReactNode {
  const featured = PROJECTS.slice(0, FEATURED_COUNT);
  const deck = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: deck,
    offset: ["start start", "end end"],
  });

  return (
    <div className="bg-deep text-cream">
      <section className="grid-w pt-28 pb-16 md:pt-44 md:pb-24">
        <Reveal className="col-span-full flex flex-col items-center text-center">
          <Label>Selected work</Label>
          <h2 className="t-l mt-8 md:mt-10">
            <SplitReveal lines={["The trail", "I’ve built"]} />
          </h2>
          <p className="t-body mt-8 max-w-[38ch] md:mt-10">
            A few projects across software, AI, and research &mdash; each one
            a step further down the path.
          </p>
        </Reveal>
      </section>

      <div ref={deck} className="relative">
        {featured.map((project, index) => (
          <TrailCard
            key={project.id}
            project={project}
            index={index}
            total={featured.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function TrailCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}): ReactNode {
  const reducedMotion = useReducedMotion();
  const isLast = index === total - 1;

  // Deck progress runs 0..1 over (total - 1) card-heights of scrolling, so
  // `position` is "how many cards have arrived", as a fraction.
  // Function-form transforms: see the scroll-timeline note in hero.tsx.
  const covered = (): number =>
    reducedMotion || isLast
      ? 0
      : clamp01(progress.get() * (total - 1) - index);
  const arrived = (): number =>
    reducedMotion || index === 0
      ? 1
      : clamp01(progress.get() * (total - 1) - (index - 1));

  const scale = useTransform(() => 1 - covered() * 0.1);
  const dim = useTransform(() => covered() * 0.5);
  const shotScale = useTransform(() => 0.9 + arrived() * 0.1);

  const detailsHref = `/projects#${project.id}`;

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-[var(--margin)]">
      <motion.article
        style={{ scale, marginTop: `${index * 0.85}rem` }}
        className={`relative grid h-[86svh] w-full origin-top grid-cols-1 content-start gap-x-10 gap-y-5 overflow-hidden rounded-[1.75rem] p-5 shadow-[0_-20px_50px_-20px_rgba(20,0,0,0.55)] md:h-[min(84vh,46rem)] md:grid-cols-12 md:content-center md:rounded-[2rem] md:p-10 ${THEMES[index % THEMES.length]}`}
      >
        {/* Screenshot */}
        <motion.div
          style={{ scale: shotScale }}
          className="origin-bottom md:col-span-7"
        >
          <Link
            href={detailsHref}
            data-cursor="view"
            aria-label={`${project.title}: details`}
            className="focus-ring group block rounded-lg"
          >
            <ProjectShot project={project} eager={index === 0} />
          </Link>
        </motion.div>

        {/* Text */}
        <div className="flex min-h-0 flex-col md:col-span-5">
          <div className="flex items-center gap-4">
            <p className="t-label">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>
            <div aria-hidden="true" className="flex gap-1.5">
              {Array.from({ length: total }, (_, tick) => (
                <span
                  key={tick}
                  className={`h-1 w-6 bg-current ${
                    tick <= index ? "opacity-100" : "opacity-25"
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="t-h1 mt-4 !text-[clamp(1.9rem,3.5vw,4rem)] md:mt-6">
            <SplitReveal lines={[project.title]} />
          </h3>
          <p className="t-h7 mt-3 md:mt-5">{project.tagline}</p>
          <p className="t-body mt-2 line-clamp-4 md:mt-4 md:line-clamp-none">
            {project.description}
          </p>

          <p className="t-label mt-3 opacity-70 md:hidden">{project.meta}</p>
          <ul className="mt-5 hidden flex-wrap gap-2 md:flex">
            {project.meta.split(" · ").map((tag) => (
              <li
                key={tag}
                className="t-label border border-current/40 px-2.5 py-2"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 md:mt-7">
            {project.live && (
              <TrailLink href={project.live}>Live demo</TrailLink>
            )}
            {project.github && (
              <TrailLink href={project.github}>GitHub</TrailLink>
            )}
            <TrailLink href={detailsHref}>Details</TrailLink>
          </div>
        </div>

        {/* Darkens the card as the next one covers it. */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 bg-ink"
        />
      </motion.article>
    </div>
  );
}

function TrailLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}): ReactNode {
  const external = href.startsWith("http");
  const className =
    "focus-ring t-h8 group inline-flex items-center gap-1.5 border-b border-current pb-1";
  const arrow = (
    <ArrowUpRight
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden="true"
    />
  );

  if (!external) {
    return (
      <Link href={href} className={className}>
        {children}
        {arrow}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      {arrow}
    </a>
  );
}
