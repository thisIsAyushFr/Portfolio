import {
  ArrowUpRight,
  Bot,
  Compass,
  Layers,
  LineChart,
  Sparkles,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: string;
  image: string;
  imageAlt: string;
  github?: string;
  live?: string;
};

const PROJECTS: Project[] = [
  {
    id: "caresync",
    icon: Layers,
    iconLabel: "CareSync",
    title: "CareSync",
    description:
      "Hospital management, organized in one platform. Centralizes appointments, beds, and operational data for patients, doctors, nurses, and administrators.",
    meta: "Finalist, Vibe to Viable · 100+ teams",
    imageRatio: "aspect-[16/10]",
    image: "/projects/caresync.png",
    imageAlt: "CareSync hospital management dashboard",
    github: "https://github.com/thisIsAyushFr/CareSync",
    live: "https://caresync-vtv.vercel.app/",
  },
  {
    id: "promptforge",
    icon: Sparkles,
    iconLabel: "PromptForge",
    title: "PromptForge",
    description:
      "Better prompts for Claude, without leaving the browser. An AI prompt optimization browser extension built with React and Vite.",
    meta: "React · Vite · LLMs",
    imageRatio: "aspect-[16/10]",
    image: "/projects/promptforge.png",
    imageAlt: "PromptForge AI prompt optimization interface",
    github: "https://github.com/thisIsAyushFr/PromptForge",
  },
  {
    id: "gpu-optimization",
    icon: LineChart,
    iconLabel: "GPU Optimization",
    title: "GPU-Accelerated Optimization",
    description:
      "Predicting whether workloads belong on the CPU or GPU using workload characteristics, machine learning models, and benchmarked workloads.",
    meta: "ML Research · Paper Under Review",
    imageRatio: "aspect-[16/10]",
    image: "/projects/gpu-optimization.png",
    imageAlt: "GPU optimization research benchmark results",
    github: "https://github.com/thisIsAyushFr/GPU-accelerated-optimization",
  },
  {
    id: "bookverse",
    icon: Layers,
    iconLabel: "BookVerse",
    title: "BookVerse",
    description:
      "A complete digital workflow for library management, covering cataloging, members, circulation, fines, reservations, notifications, reporting, authentication, and role-based access.",
    meta: "HTML · CSS · JavaScript · Role-Based Access",
    imageRatio: "aspect-[16/10]",
    image: "/projects/bookverse.png",
    imageAlt: "BookVerse library management dashboard",
    github: "https://github.com/thisIsAyushFr/BookVerse",
    live: "https://thisisbookverse.vercel.app/",
  },
  {
    id: "nexus",
    icon: Sparkles,
    iconLabel: "NEXUS",
    title: "NEXUS",
    description:
      "An asteroid survival game that adapts to the player, with optional facial-expression and voice/audio interaction using computer vision and audio analysis.",
    meta: "DOMination · JavaScript · Computer Vision · Audio",
    imageRatio: "aspect-[16/10]",
    image: "/projects/nexus.png",
    imageAlt: "NEXUS emotion-driven asteroid survival game",
    github: "https://github.com/thisIsAyushFr/Nexus-Emotion-Detection",
    live: "https://c2c-event.vercel.app/",
  },
  {
    id: "focusboard",
    icon: Compass,
    iconLabel: "FocusBoard",
    title: "FocusBoard",
    description:
      "A productivity workspace built around focused work and mindful breaks, combining task and board management with meditation, onboarding, authentication, accounts, and subscriptions.",
    meta: "HTML · CSS · JavaScript · Vercel",
    imageRatio: "aspect-[16/10]",
    image: "/projects/focusboard.png",
    imageAlt: "FocusBoard productivity and meditation interface",
    github: "https://github.com/thisIsAyushFr/FocusBoard",
    live: "https://focusboard-wine.vercel.app/",
  },
  {
    id: "scientific-calculator",
    icon: Bot,
    iconLabel: "Scientific Calculator",
    title: "Scientific Calculator",
    description:
      "A lightweight scientific calculator built with Streamlit, supporting standard and scientific mathematical operations.",
    meta: "Python · Streamlit",
    imageRatio: "aspect-[16/10]",
    image: "/projects/scientific-calculator.png",
    imageAlt: "Scientific Calculator Streamlit application",
    github: "https://github.com/thisIsAyushFr/Scientific_Calculator_C2C",
  },
];

export function Projects({
  withHeadline = true,
  viewMoreVisible = false,
  headline,
}: {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
  headline?: string;
}): ReactNode {

  const projects = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 py-24 sm:px-10 sm:py-32">
        {withHeadline && (
          <FadeIn>
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-medium tracking-tight text-foreground/50">
                Selected work
              </p>

              <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {headline ??
                  "A collection of software, AI, research, and product projects I have built."}
              </h2>
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.06}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        {viewMoreVisible && PROJECTS.length > 4 && (
          <FadeIn delay={0.2}>
            <div className="mt-12 flex justify-center">
              <Link
                href="/projects"
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-foreground/5 bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-2xl transition-colors hover:bg-foreground/4"
              >
                View all projects
                <ArrowUpRight
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }): ReactNode {
  return (
    <article className="group overflow-hidden rounded-3xl border border-foreground/8 bg-background shadow-sm transition-shadow duration-500 hover:shadow-xl">
      <div
        className={`relative ${project.imageRatio} overflow-hidden border-b border-foreground/8 bg-foreground/2`}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          draggable={false}
        />
      </div>

      <div className="p-6 sm:p-7">
        <div className="mb-4 flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-foreground/8 bg-foreground/3">
            <project.icon className="h-4 w-4 text-foreground/70" />
          </div>

          <div>
            <h3 className="text-xl font-medium tracking-tight text-foreground">
              {project.title}
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-foreground/60">
              {project.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-foreground/8 pt-4">
          <p className="text-xs font-medium text-foreground/45">
            {project.meta}
          </p>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-foreground/8 px-3 py-1.5 text-xs font-medium text-foreground/70 transition-colors hover:bg-foreground/4 hover:text-foreground"
              >
                GitHub
                <ArrowUpRight
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-foreground/8 px-3 py-1.5 text-xs font-medium text-foreground/70 transition-colors hover:bg-foreground/4 hover:text-foreground"
              >
                Live Demo
                <ArrowUpRight
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}