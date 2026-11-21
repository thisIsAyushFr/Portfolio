"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { getLenis } from "@/components/layout/smooth-scroll";
import { SplitReveal } from "@/components/motion/split-reveal";
import { SideIndex } from "@/components/projects/side-index";
import { FillButton } from "@/components/ui/primitives";
import { ProjectShot } from "@/components/ui/project-shot";
import { Reveal } from "@/components/ui/reveal";
import {
  HIGHLIGHTS_BY_PROJECT,
  PROJECTS,
  PROJECT_TAGS,
  TAGS_BY_PROJECT,
  type Project,
  type ProjectTag,
} from "@/lib/data";
import { EASE, useReducedMotion } from "@/lib/motion";

type Filter = "All" | ProjectTag;

const FILTERS: Filter[] = ["All", ...PROJECT_TAGS];
/** Space the site header takes when it is showing, in px. */
const HEADER_SPACE = 76;

const pad = (n: number): string => String(n).padStart(2, "0");
const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

function matches(project: Project, filter: Filter): boolean {
  return (
    filter === "All" || (TAGS_BY_PROJECT[project.id] ?? []).includes(filter)
  );
}

/**
 * Full project index: a sticky filter bar, then large alternating rows that
 * open up as they scroll in. Each row expands to show more detail, and on
 * wide screens a side list of names tracks which project is on screen.
 */
export function ProjectList(): ReactNode {
  const [filter, setFilter] = useState<Filter>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [onScreen, setOnScreen] = useState(0);
  const list = useRef<HTMLOListElement | null>(null);

  const shown = PROJECTS.filter((project) => matches(project, filter));
  const shownKey = shown.map((project) => project.id).join(",");

  // Which row crosses the middle of the viewport.
  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setOnScreen(index);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    root
      .querySelectorAll<HTMLElement>(":scope > li[data-index]")
      .forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [shownKey]);

  // A link such as /projects#ecosort opens that project.
  useEffect(() => {
    function fromHash(): void {
      const id = window.location.hash.slice(1);
      if (PROJECTS.some((project) => project.id === id)) {
        setFilter("All");
        setOpenId(id);
        // Scroll there ourselves: the browser's own jump can land early,
        // before the page has settled.
        window.setTimeout(() => {
          const row = document.getElementById(id);
          if (!row) return;
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(row);
          else row.scrollIntoView();
        }, 650);
      }
    }
    const first = window.setTimeout(fromHash, 0);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.clearTimeout(first);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  // Escape closes the open project.
  useEffect(() => {
    if (!openId) return;
    function onKey(event: KeyboardEvent): void {
      if (event.key === "Escape") setOpenId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  function choose(next: Filter): void {
    setFilter(next);
    setOpenId(null);
    setOnScreen(0);
  }

  return (
    <section className="bg-cream text-ink pb-28 md:pb-44">
      <FilterBar filter={filter} onChoose={choose} count={shown.length} />

      <div className="xl:grid xl:grid-cols-[11rem_minmax(0,1fr)]">
        <SideIndex
          projects={shown}
          active={Math.min(onScreen, Math.max(0, shown.length - 1))}
        />

        <ol ref={list} className="border-ink/30 border-t">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((project, index) => (
              <motion.li
                key={project.id}
                id={project.id}
                data-index={index}
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`relative scroll-mt-24 transition-colors duration-700 ${
                  openId === project.id ? "bg-cream-light" : ""
                }`}
              >
                <ProjectRow
                  project={project}
                  index={index}
                  open={openId === project.id}
                  onToggle={() =>
                    setOpenId((current) =>
                      current === project.id ? null : project.id
                    )
                  }
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      </div>
    </section>
  );
}

/* ---------- Filter bar ---------- */

function FilterBar({
  filter,
  onChoose,
  count,
}: {
  filter: Filter;
  onChoose: (filter: Filter) => void;
  count: number;
}): ReactNode {
  const reducedMotion = useReducedMotion();
  const sentinel = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const [stuck, setStuck] = useState(false);
  const [headerShown, setHeaderShown] = useState(true);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Same rule as the site header: it hides while scrolling down.
    setHeaderShown(!(y > previous && y > 240));
    const top = sentinel.current?.getBoundingClientRect().top ?? 1;
    setStuck(top < 0);
  });

  return (
    <>
      <div ref={sentinel} aria-hidden="true" />
      <motion.div
        role="group"
        aria-label="Filter projects"
        initial={false}
        // Step down out of the header's way whenever it is showing.
        animate={{ y: stuck && headerShown ? HEADER_SPACE : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.6, ease: EASE }}
        className={`sticky top-0 z-30 mb-10 flex items-center justify-between gap-4 border-b px-[var(--margin)] py-3 transition-colors duration-500 md:mb-14 ${
          stuck
            ? "border-ink/15 bg-cream/90 backdrop-blur-md"
            : "border-transparent"
        }`}
      >
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 [scrollbar-width:none] md:gap-3">
          {FILTERS.map((item) => {
            const total = PROJECTS.filter((project) =>
              matches(project, item)
            ).length;
            const active = item === filter;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => onChoose(item)}
                className={`focus-ring t-h8 relative isolate flex shrink-0 items-center gap-2 border px-4 py-3 transition-colors duration-300 ${
                  active
                    ? "text-cream-light border-transparent"
                    : "border-ink/40 hover:border-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    aria-hidden="true"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                    className="bg-accent absolute -inset-px -z-10"
                  />
                )}
                {item}
                <span className="t-label opacity-70">{pad(total)}</span>
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="t-label flex shrink-0 items-center gap-1.5"
        >
          <span className="relative grid overflow-hidden tabular-nums">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={count}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: EASE }}
                className="text-accent"
              >
                {pad(count)}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="opacity-60">/ {pad(PROJECTS.length)}</span>
          <span className="hidden opacity-60 sm:inline">projects</span>
        </p>
      </motion.div>
    </>
  );
}

/* ---------- Row ---------- */

function ProjectRow({
  project,
  index,
  open,
  onToggle,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}): ReactNode {
  const reducedMotion = useReducedMotion();
  const flipped = index % 2 === 1;
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.72"],
  });

  // 0 as the row enters at the bottom of the screen, 1 once it has risen a
  // little. Function-form transforms: see the note in hero.tsx.
  const arrived = (): number =>
    reducedMotion ? 1 : clamp01(scrollYProgress.get());
  const clipPath = useTransform(
    () => `inset(${(1 - arrived()) * 100}% 0% 0% 0%)`
  );
  const rotateX = useTransform(() => (1 - arrived()) * 14);
  const scale = useTransform(() => 0.92 + arrived() * 0.08);
  const lineScale = useTransform(() => arrived());

  const highlights = HIGHLIGHTS_BY_PROJECT[project.id] ?? [];
  const panelId = `${project.id}-details`;
  // Every link the project has, so the row shows GitHub even when a live demo exists.
  const links = [
    project.live && { href: project.live, label: "Live demo" },
    project.github && { href: project.github, label: "GitHub" },
  ].filter((link): link is { href: string; label: string } => Boolean(link));

  return (
    <div ref={ref} className="py-10 md:py-16">
      <div className="grid-w items-center gap-y-8">
        {/* Screenshot */}
        <div
          className={`col-span-full [perspective:1400px] md:col-span-7 ${
            flipped ? "md:order-2 md:col-start-6" : ""
          }`}
        >
          <motion.div
            style={{ clipPath, rotateX, scale }}
            className="origin-bottom will-change-transform"
          >
            <div
              className={`group transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "scale-[1.02]" : ""
              }`}
            >
              <ProjectShot project={project} eager={index < 2} />
            </div>
          </motion.div>
        </div>

        {/* Text */}
        <div
          className={`col-span-full md:col-span-4 ${
            flipped ? "md:order-1 md:col-start-1" : "md:col-start-9"
          }`}
        >
          <Reveal>
            <p className="t-label">
              <span className="bg-accent text-cream-light mr-3 px-2 py-1">
                {pad(index + 1)}
              </span>
              <span className="opacity-70">{project.meta}</span>
            </p>
          </Reveal>
          <h2 className="t-h1 mt-4 !text-[clamp(2.25rem,4.2vw,4.75rem)]">
            <SplitReveal lines={[project.title]} />
          </h2>
          <Reveal delay={0.12}>
            <p className="t-body mt-5">{project.description}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={panelId}
                className="focus-ring t-h8 group flex items-center gap-3"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${
                    open
                      ? "border-accent bg-accent text-cream-light"
                      : "border-ink/40 group-hover:border-accent group-hover:bg-accent group-hover:text-cream-light"
                  }`}
                >
                  <Plus
                    aria-hidden="true"
                    className={`h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      open ? "rotate-[135deg]" : ""
                    }`}
                  />
                </span>
                {open ? "Less" : "More details"}
              </button>

              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring t-h8 group inline-flex items-center gap-1.5 border-b border-current pb-1"
                >
                  {link.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid-w gap-y-8 pt-10 md:pt-14">
              <ul className="col-span-full flex flex-col md:col-span-7">
                {highlights.map((point, i) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.6,
                      delay: reducedMotion ? 0 : 0.15 + i * 0.08,
                      ease: EASE,
                    }}
                    className="border-ink/20 t-h7 flex items-baseline gap-4 border-t py-4 last:border-b"
                  >
                    <span className="t-label text-accent">{pad(i + 1)}</span>
                    {point}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.6,
                  delay: reducedMotion ? 0 : 0.3,
                  ease: EASE,
                }}
                className="col-span-full md:col-span-4 md:col-start-9"
              >
                <p className="t-label opacity-60">Tags</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.meta.split(" · ").map((tag) => (
                    <li
                      key={tag}
                      className="t-label border-ink/40 border px-2.5 py-2"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.live && (
                    <FillButton href={project.live} tone="accent" size="sm">
                      Live demo
                    </FillButton>
                  )}
                  {project.github && (
                    <FillButton href={project.github} tone="ink" size="sm">
                      GitHub
                    </FillButton>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider that draws in with the row. */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: lineScale }}
        className="bg-ink/30 absolute inset-x-0 bottom-0 block h-px origin-left"
      />
    </div>
  );
}
