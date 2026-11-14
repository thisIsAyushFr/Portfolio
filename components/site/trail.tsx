"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { Label } from "@/components/ui/primitives";
import { ProjectShot } from "@/components/ui/project-shot";
import { Reveal } from "@/components/ui/reveal";
import { FEATURED_COUNT, PROJECTS, type Project } from "@/lib/data";

type Theme = {
  section: string;
  dashed: string;
  solid: string;
  badge: string;
};

const THEMES: Theme[] = [
  {
    section: "bg-pine text-cream",
    dashed: "text-cream/45",
    solid: "bg-amber",
    badge: "bg-amber text-cream-light",
  },
  {
    section: "bg-cream text-forest",
    dashed: "text-forest/45",
    solid: "bg-amber",
    badge: "bg-amber text-cream-light",
  },
  {
    section: "bg-amber text-cream-light",
    dashed: "text-cream-light/55",
    solid: "bg-cream-light",
    badge: "bg-cream-light text-amber",
  },
];

export function Trail(): ReactNode {
  const featured = PROJECTS.slice(0, FEATURED_COUNT);

  return (
    <div>
      <section className="grid-w bg-pine pt-28 pb-40 text-cream md:pt-44 md:pb-56">
        <Reveal className="col-span-full flex flex-col items-center text-center">
          <Label>Selected work</Label>
          <h2 className="t-l mt-8 md:mt-10">
            The trail
            <br />
            I&rsquo;ve built
          </h2>
          <p className="t-body mt-8 max-w-[38ch] md:mt-10">
            A few projects across software, AI, and research &mdash; each one
            a step further down the path.
          </p>
        </Reveal>
      </section>

      {featured.map((project, index) => (
        <TrailSection
          key={project.id}
          project={project}
          index={index}
          total={featured.length}
          theme={THEMES[index % THEMES.length] as Theme}
        />
      ))}
    </div>
  );
}

function TrailSection({
  project,
  index,
  total,
  theme,
}: {
  project: Project;
  index: number;
  total: number;
  theme: Theme;
}): ReactNode {
  const ref = useRef<HTMLElement | null>(null);

  // Progress while the section slides into view, before it pins.
  const { scrollYProgress: enter } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  // Progress while the section is pinned.
  const { scrollYProgress: pinned } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const clip = useTransform(
    enter,
    [0.25, 1],
    ["inset(38% 34% 38% 34%)", "inset(0% 0% 0% 0%)"]
  );
  const imageScale = useTransform(enter, [0.25, 1], [1.2, 1]);
  const imageY = useTransform(pinned, [0, 1], ["0%", "-6%"]);
  const lineScale = useTransform(pinned, [0, 1], [0.08, 1]);
  const badgeTop = useTransform(pinned, [0, 1], ["8%", "100%"]);

  return (
    <section ref={ref} className={`relative h-[180vh] ${theme.section}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* The trail: a dashed guide with a solid line drawn over it. */}
        <div
          aria-hidden="true"
          className={`trail-dashed absolute top-0 left-1/2 hidden h-full w-px md:block ${theme.dashed}`}
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: lineScale }}
          className={`absolute top-0 left-1/2 hidden h-full w-px origin-top md:block ${theme.solid}`}
        />
        <motion.div
          aria-hidden="true"
          style={{ top: badgeTop }}
          className={`t-label absolute left-1/2 hidden h-7 w-7 md:flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${theme.badge}`}
        >
          {index + 1}
        </motion.div>

        {/* Screenshot */}
        <div className="absolute inset-0 flex items-center justify-center px-[var(--margin)] pb-[8vh]">
          <motion.div
            style={{ clipPath: clip, y: imageY }}
            className="w-[min(100%,42rem,70vh)]"
          >
            <motion.div style={{ scale: imageScale }}>
              <ProjectShot project={project} />
            </motion.div>
          </motion.div>
        </div>

        {/* Title */}
        <div className="grid-w absolute inset-x-0 top-0 z-10 pt-24 md:pt-28">
          <h3 className="t-h1 col-span-full !text-[clamp(2.25rem,4.6vw,5.25rem)] md:col-span-7 xl:col-span-5">
            {project.title}
          </h3>
        </div>

        {/* Details */}
        <div className="grid-w absolute inset-x-0 bottom-0 z-10 items-end pb-6 md:pb-10">
          <p className="t-label col-span-3 hidden md:block">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
          <div className="col-span-full md:col-start-8 md:col-end-13 xl:col-start-9">
            <p className="t-h7">{project.tagline}</p>
            <p className="t-body mt-3 md:mt-4">{project.description}</p>
            <p className="t-label mt-4 opacity-70">{project.meta}</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {project.github && (
                <TrailLink href={project.github}>GitHub</TrailLink>
              )}
              {project.live && (
                <TrailLink href={project.live}>Live demo</TrailLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrailLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}): ReactNode {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring t-h8 group inline-flex items-center gap-1.5 border-b border-current pb-1"
    >
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
}
