"use client";

import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { ProjectShot } from "@/components/ui/project-shot";
import { PROJECTS, type Project } from "@/lib/data";
import { EASE, useReducedMotion } from "@/lib/motion";

/** The three windows shown in the hero: back-left, back-right, front. */
const CARDS: Project[] = [
  PROJECTS[2] as Project,
  PROJECTS[3] as Project,
  PROJECTS[0] as Project,
];

type Slot = {
  left: string;
  top: string;
  width: string;
  /** Depth in px. The front window sits closer, so tilt separates the layers. */
  depth: number;
  /** How far the window is tucked in (x, % of its width) before the scroll fan-out. */
  tuck: number;
  /** Rotation once fanned out, in degrees. */
  lean: number;
};

const SLOTS: Slot[] = [
  { left: "0%", top: "16%", width: "44%", depth: 0, tuck: 30, lean: -7 },
  { left: "56%", top: "16%", width: "44%", depth: 0, tuck: -30, lean: 7 },
  { left: "22%", top: "0%", width: "56%", depth: 70, tuck: 0, lean: 0 },
];
const FRONT = 2;
const ROTATE_EVERY_MS = 4500;

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/**
 * The project windows in the hero. They fan out as the page scrolls, tilt in
 * 3D toward the mouse, float gently, and take turns at the front. Hovering one
 * lifts it; clicking opens it on the Projects page.
 */
export function HeroStack({
  progress,
  wait,
}: {
  progress: MotionValue<number>;
  wait: number;
}): ReactNode {
  const reducedMotion = useReducedMotion();
  // slots[i] is the slot that card i currently occupies.
  const [slots, setSlots] = useState<number[]>([0, 1, FRONT]);
  const [active, setActive] = useState<number | null>(null);
  const root = useRef<HTMLDivElement | null>(null);

  // Mouse position across the viewport, -0.5..0.5, smoothed.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 18, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 18, mass: 0.6 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    function onMove(event: PointerEvent): void {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion, mouseX, mouseY]);

  // Take turns at the front, unless someone is looking at a specific window.
  useEffect(() => {
    if (reducedMotion || active !== null) return;
    const id = window.setInterval(() => {
      // Skip while the tab is hidden or the hero has scrolled out of view.
      const box = root.current?.getBoundingClientRect();
      if (document.hidden || !box || box.bottom < 0) return;
      setSlots((current) => current.map((slot) => (slot + 1) % SLOTS.length));
    }, ROTATE_EVERY_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, active]);

  return (
    <div ref={root} className="absolute inset-0 [perspective:1400px]">
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: wait + 0.5, ease: EASE }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="absolute inset-0"
        onPointerLeave={() => setActive(null)}
      >
        {CARDS.map((project, index) => {
          const slot = slots[index] ?? 0;
          return (
            <StackCard
              key={project.id}
              project={project}
              slot={SLOTS[slot] as Slot}
              floatClass={`hero-float-${index + 1}`}
              progress={progress}
              lifted={active === index}
              dimmed={active !== null && active !== index}
              onHover={() => setActive(index)}
              onBlur={() => setActive(null)}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

function StackCard({
  project,
  slot,
  floatClass,
  progress,
  lifted,
  dimmed,
  onHover,
  onBlur,
}: {
  project: Project;
  slot: Slot;
  floatClass: string;
  progress: MotionValue<number>;
  lifted: boolean;
  dimmed: boolean;
  onHover: () => void;
  onBlur: () => void;
}): ReactNode {
  // The slot's tuck and lean glide to their new values when the card moves
  // slot, and scroll then scales them: tucked in at the top, fanned out below.
  const tuck = useMotionValue(slot.tuck);
  const lean = useMotionValue(slot.lean);

  useEffect(() => {
    const options = { duration: 0.9, ease: EASE };
    const a = animate(tuck, slot.tuck, options);
    const b = animate(lean, slot.lean, options);
    return () => {
      a.stop();
      b.stop();
    };
  }, [slot, tuck, lean]);

  const fanned = (): number => clamp01(progress.get() / 0.8);
  const x = useTransform(() => `${tuck.get() * (1 - fanned())}%`);
  const rotate = useTransform(() => lean.get() * fanned());

  return (
    <motion.div
      initial={false}
      animate={{ left: slot.left, top: slot.top, width: slot.width }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ x, rotate, transformStyle: "preserve-3d" }}
      className="absolute"
    >
      <motion.div
        initial={false}
        animate={{
          z: slot.depth + (lifted ? 90 : 0),
          scale: lifted ? 1.05 : 1,
          filter: dimmed ? "brightness(0.8)" : "brightness(1)",
        }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className={floatClass}>
          <Link
            href={`/projects#${project.id}`}
            data-cursor="view"
            aria-label={`${project.title}: ${project.tagline}`}
            onPointerEnter={onHover}
            onFocus={onHover}
            onBlur={onBlur}
            className="focus-ring relative block rounded-lg"
          >
            <ProjectShot project={project} eager />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
