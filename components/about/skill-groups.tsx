"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { PROJECTS } from "@/lib/data";
import { EASE, useReducedMotion } from "@/lib/motion";

type Group = {
  title: string;
  /** Card colours. */
  theme: string;
  /** Skills, written as they appear in SKILLS in lib/data.ts. */
  skills: string[];
  proofLabel: string;
  /** Project ids from lib/data.ts; shown as links. */
  projects?: string[];
  /** Plain lines, for things that are not projects. */
  notes?: string[];
};

const GROUPS: Group[] = [
  {
    title: "Build",
    theme: "bg-ink text-cream",
    skills: [
      "Software Development",
      "Full-Stack Development",
      "Data Structures & Algorithms",
      "Problem Solving",
    ],
    proofLabel: "Seen in",
    projects: ["caresync", "bookverse", "focusboard"],
  },
  {
    title: "AI / ML",
    theme: "bg-accent text-cream-light",
    skills: [
      "AI & Machine Learning",
      "LLMs & Prompt Engineering",
      "Computer Vision",
      "Research & Experimentation",
    ],
    proofLabel: "Seen in",
    projects: ["studylens", "gpu-optimization", "ecosort", "promptforge"],
  },
  {
    title: "Lead",
    theme: "bg-deep text-cream",
    skills: ["Technical Leadership"],
    proofLabel: "Roles",
    notes: ["Head of Content, Code2Chill", "Class Representative, Chitkara"],
  },
];

/** What I do, as three cards that tilt toward the mouse. */
export function SkillGroups(): ReactNode {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {GROUPS.map((group, index) => (
        <li key={group.title} className="[perspective:1200px]">
          <Reveal variant="clip" delay={index * 0.1} className="h-full">
            <GroupCard group={group} index={index} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function GroupCard({
  group,
  index,
}: {
  group: Group;
  index: number;
}): ReactNode {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 160, damping: 16 });
  const rotateY = useSpring(tiltY, { stiffness: 160, damping: 16 });

  function onMove(event: PointerEvent<HTMLDivElement>): void {
    const box = ref.current?.getBoundingClientRect();
    if (!box || reducedMotion || event.pointerType !== "mouse") return;
    tiltY.set(((event.clientX - box.left) / box.width - 0.5) * 12);
    tiltX.set(((event.clientY - box.top) / box.height - 0.5) * -12);
  }

  function onLeave(): void {
    tiltX.set(0);
    tiltY.set(0);
  }

  const projects = (group.projects ?? [])
    .map((id) => PROJECTS.find((project) => project.id === id))
    .filter((project) => project !== undefined);

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY }}
      className={`flex h-full min-h-[26rem] flex-col rounded-2xl p-6 md:p-8 ${group.theme}`}
    >
      <div className="flex items-start justify-between">
        <h3 className="t-h1 !text-[clamp(2.5rem,4.5vw,4.5rem)]">
          {group.title}
        </h3>
        <span className="t-label opacity-60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <ul className="mt-8 flex flex-wrap gap-2">
        {group.skills.map((skill, i) => (
          <motion.li
            key={skill}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.07, ease: EASE }}
            className="t-h8 border border-current/40 px-3 py-2.5"
          >
            {skill}
          </motion.li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <p className="t-label opacity-60">{group.proofLabel}</p>
        <ul className="mt-3 flex flex-col">
          {projects.map((project) => (
            <li key={project.id} className="border-t border-current/25">
              <Link
                href={`/projects#${project.id}`}
                className="focus-ring group flex items-center justify-between gap-3 py-2.5"
              >
                <span className="t-body transition-transform duration-500 group-hover:translate-x-2">
                  {project.title}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </li>
          ))}
          {(group.notes ?? []).map((note) => (
            <li key={note} className="t-body border-t border-current/25 py-2.5">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
