"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { introDelay, useReducedMotion } from "@/lib/motion";

type Polaroid = {
  id: string;
  src: string;
  rotate: number;
};

const PHOTOS: Polaroid[] = [
  { id: "a", src: "/about/about-1.png", rotate: -8 },
  { id: "b", src: "/about/about-2.jpeg", rotate: 6 },
  { id: "c", src: "/about/about-3.jpeg", rotate: -4 },
  { id: "d", src: "/about/about-4.jpg", rotate: 7 },
  { id: "e", src: "/about/about-5.jpeg", rotate: -6 },
  { id: "f", src: "/about/about-6.jpg", rotate: 5 },
];


/** Width of one polaroid, and the gap between two, as CSS. */
const CARD_WIDTH = "clamp(5.5rem, 10vw, 8.5rem)";
const CARD_GAP = "0.75rem";

function PolaroidCard({
  photo,
  index,
  scrollY,
  onHover,
}: {
  photo: Polaroid;
  index: number;
  scrollY: MotionValue<number>;
  onHover: (photo: Polaroid | null) => void;
}): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  // 0 = every photo stacked in one pile at the centre, 1 = fanned out.
  const spread = useMotionValue(reducedMotion ? 1 : 0);
  useEffect(() => {
    if (reducedMotion) return;
    const run = animate(spread, 1, {
      type: "spring",
      stiffness: 90,
      damping: 15,
      delay: introDelay() + 0.25 + index * 0.06,
    });
    return () => run.stop();
  }, [spread, index, reducedMotion]);

  // How far this photo sits from the middle of the row, in photo widths.
  const fromCentre = (PHOTOS.length - 1) / 2 - index;
  const side = index % 2 === 0 ? 1 : -1;
  // Function-form transforms: see the scroll-timeline note in hero.tsx.
  const drift = (): number =>
    reducedMotion ? 0 : Math.min(1, scrollY.get() / 600);
  const pileX = useTransform(
    () =>
      `calc(${fromCentre * (1 - spread.get())} * (${CARD_WIDTH} + ${CARD_GAP}))`
  );
  const driftY = useTransform(() => drift() * side * -46 - drift() * 20);
  const rotate = useTransform(
    () =>
      side * 3 * (1 - spread.get()) +
      photo.rotate * spread.get() +
      drift() * side * 7
  );

  // Magnetic pull toward the mouse.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const max = 18;
    const k = 0.25;
    mx.set(Math.max(-max, Math.min(max, dx * k)));
    my.set(Math.max(-max, Math.min(max, dy * k)));
  };

  const handleLeave = (): void => {
    mx.set(0);
    my.set(0);
    onHover(null);
  };

  return (
    <motion.div
      initial={{ opacity: reducedMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: introDelay() + 0.1 }}
      style={{ x: pileX, y: driftY, rotate, zIndex: PHOTOS.length - index }}
      className="relative shrink-0"
    >
      <motion.div
        ref={ref}
        onPointerEnter={() => onHover(photo)}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ x: sx, y: sy }}
        className="relative aspect-[3/4] w-[clamp(5.5rem,10vw,8.5rem)] bg-cream-light p-1.5 pb-5 shadow-[0_16px_30px_-16px_rgba(40,54,24,0.6)] ring-1 ring-ink/15"
      >
        <img
          src={photo.src}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

export function PolaroidStrip(): ReactNode {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [hoveredPhoto, setHoveredPhoto] = useState<Polaroid | null>(null);
  const { scrollY } = useScroll();

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-[clamp(6rem,10vw,8rem)] w-full"
      />
    );
  }

  return (
    <>
      <div className="flex w-full flex-wrap items-start justify-center gap-3 px-4 pb-4 sm:gap-3 sm:px-8 sm:pb-6">
        {PHOTOS.map((photo, i) => (
          <PolaroidCard
            key={photo.id}
            photo={photo}
            index={i}
            scrollY={scrollY}
            onHover={setHoveredPhoto}
          />
        ))}
      </div>

      <AnimatePresence>
        {hoveredPhoto && (
          <motion.div
            key={hoveredPhoto.id}
            initial={{
              opacity: 0,
              scale: 0.82,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(6px)",
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="relative max-h-[82vh] max-w-[78vw] bg-cream-light p-2 pb-8 shadow-2xl ring-1 ring-ink/15">
              <img
                src={hoveredPhoto.src}
                alt=""
                className="max-h-[72vh] max-w-[72vw] object-contain"
                draggable={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}