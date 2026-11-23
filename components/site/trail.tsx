"use client";

import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

import { SplitReveal } from "@/components/motion/split-reveal";
import { Label } from "@/components/ui/primitives";
import { PrivateRepoNote } from "@/components/ui/private-repo-note";
import { ProjectShot } from "@/components/ui/project-shot";
import { Reveal } from "@/components/ui/reveal";
import { FEATURED_COUNT, PROJECTS, type Project } from "@/lib/data";
import { useReducedMotion } from "@/lib/motion";

/** Card colours, cycled in order. Each must stand out from the deep backdrop. */
const THEMES = [
  "bg-cream text-ink",
  "bg-accent text-cream-light",
  "bg-sage text-ink",
  "bg-olive text-cream-light",
  "bg-ink text-cream",
];

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/**
 * Featured projects as a sideways gallery: the section pins while vertical
 * scrolling slides the cards horizontally. The track is padded so the first
 * card is centred at progress 0 and the last at progress 1, which means card
 * `i` is centred at progress `i / (total - 1)` with no measuring.
 */
export function Trail(): ReactNode {
  const featured = PROJECTS.slice(0, FEATURED_COUNT);
  const total = featured.length;
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useMotionTemplate`calc(${scrollYProgress} * (100vw - 100%))`;
  const barScale = useTransform(() => scrollYProgress.get());
  const current = useTransform(() =>
    String(Math.round(scrollYProgress.get() * (total - 1)) + 1).padStart(2, "0")
  );

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

      {reducedMotion ? (
        <ol className="flex flex-col gap-6 px-[var(--margin)] pb-24">
          {featured.map((project, index) => (
            <li key={project.id}>
              <TrailCard project={project} index={index} total={total} />
            </li>
          ))}
        </ol>
      ) : (
        <section
          ref={ref}
          aria-label="Featured projects"
          className="relative"
          style={{ height: `${total * 70 + 100}vh` }}
        >
          <div className="sticky top-0 flex h-screen flex-col overflow-hidden pb-14 md:pb-16">
            {/* Ruler: at the top, so the section pill at the bottom never covers it. */}
            <div
              aria-hidden="true"
              className="flex items-center gap-4 px-[var(--margin)] pt-20 md:pt-24"
            >
              <motion.span className="t-h7 tabular-nums">{current}</motion.span>
              <div className="h-0.5 flex-1 bg-cream/20">
                <motion.div
                  style={{ scaleX: barScale }}
                  className="h-full origin-left bg-sage"
                />
              </div>
              <span className="t-h7 tabular-nums opacity-60">
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <motion.ol
              style={{ x }}
              className="flex w-max flex-1 items-center gap-[3vw] px-[6vw] will-change-transform lg:px-[14vw]"
            >
              {featured.map((project, index) => (
                <li
                  key={project.id}
                  className="w-[88vw] shrink-0 lg:w-[72vw]"
                >
                  <TrailCard
                    project={project}
                    index={index}
                    total={total}
                    progress={scrollYProgress}
                  />
                </li>
              ))}
            </motion.ol>

          </div>
        </section>
      )}
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
  /** Omitted for the static (reduced motion) list. */
  progress?: MotionValue<number>;
}): ReactNode {
  // How far this card is from the centre, in cards: -1 (one to the right of
  // centre) .. 0 (centred) .. 1 (one to the left).
  // Function-form transforms: see the scroll-timeline note in hero.tsx.
  const offset = (): number =>
    progress ? clamp(progress.get() * (total - 1) - index, -1, 1) : 0;

  const scale = useTransform(() => 1 - Math.abs(offset()) * 0.1);
  const rotate = useTransform(() => offset() * -3);
  const dim = useTransform(() => Math.abs(offset()) * 0.45);

  const detailsHref = `/projects#${project.id}`;

  return (
    <motion.article
      style={progress ? { scale, rotate } : {}}
      className={`relative grid w-full grid-cols-1 content-start gap-x-10 gap-y-5 overflow-hidden rounded-[1.75rem] p-5 shadow-[0_30px_60px_-30px_rgba(20,26,10,0.7)] lg:grid-cols-12 lg:content-center lg:rounded-[2rem] lg:p-10 ${
        progress ? "h-[80svh] lg:h-[min(74vh,44rem)]" : ""
      } ${THEMES[index % THEMES.length]}`}
    >
      {/* Screenshot */}
      <div className="lg:col-span-7">
        <Link
          href={detailsHref}
          data-cursor="view"
          aria-label={`${project.title}: details`}
          className="focus-ring group block rounded-lg"
        >
          <ProjectShot project={project} eager={index === 0} />
        </Link>
      </div>

      {/* Text */}
      <div className="flex min-h-0 flex-col lg:col-span-5">
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

        <h3 className="t-h1 mt-4 !text-[clamp(1.9rem,3.5vw,4rem)] lg:mt-6">
          {project.title}
        </h3>
        <p className="t-h7 mt-3 lg:mt-5">{project.tagline}</p>
        <p className="t-body mt-2 line-clamp-3 lg:mt-4 lg:line-clamp-none">
          {project.summary ?? project.description}
        </p>

        <p className="t-label mt-3 opacity-70 lg:hidden">{project.meta}</p>
        <ul className="mt-5 hidden flex-wrap gap-2 lg:flex">
          {project.meta.split(" · ").map((tag) => (
            <li
              key={tag}
              className="t-label border border-current/40 px-2.5 py-2"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 lg:mt-7">
          {project.live && (
            <TrailLink href={project.live}>
              {project.liveLabel ?? "Live demo"}
            </TrailLink>
          )}
          {project.github && (
            <TrailLink href={project.github}>GitHub</TrailLink>
          )}
          <TrailLink href={detailsHref}>Details</TrailLink>
        </div>
        {project.privateRepo && <PrivateRepoNote className="mt-3" />}
      </div>

      {/* Darkens the card while it is off-centre. */}
      {progress && (
        <motion.div
          aria-hidden="true"
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 bg-ink"
        />
      )}
    </motion.article>
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
