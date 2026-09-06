"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";

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

const EASE = [0.22, 1, 0.36, 1] as const;

function PolaroidCard({
  photo,
  index,
  onHover,
}: {
  photo: Polaroid;
  index: number;
  onHover: (photo: Polaroid | null) => void;
}): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, {
    stiffness: 220,
    damping: 18,
    mass: 0.6,
  });

  const sy = useSpring(my, {
    stiffness: 220,
    damping: 18,
    mass: 0.6,
  });

  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const max = 18;
    const k = 0.25;

    mx.set(Math.max(-max, Math.min(max, dx * k)));
    my.set(Math.max(-max, Math.min(max, dy * k)));
  };

  const handleEnter = (): void => {
    onHover(photo);
  };

  const handleLeave = (): void => {
    mx.set(0);
    my.set(0);
    onHover(null);
  };

  return (
    <motion.div
      ref={ref}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{
        opacity: 0,
        y: -120,
        filter: "blur(18px)",
        rotate: photo.rotate,
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        rotate: photo.rotate,
      }}
      transition={{
        duration: 0.9,
        delay: 0.05 + index * 0.08,
        ease: EASE,
      }}
      style={{
        x: tx,
        y: ty,
        rotate: photo.rotate,
      }}
      className="relative aspect-[3/4] w-[clamp(5.5rem,10vw,8rem)] shrink-0 overflow-hidden rounded-2xl border-6 border-neutral-300/40 bg-white p-1.5 dark:border-white/15 dark:bg-neutral-900"
    >
      <img
        src={photo.src}
        alt=""
        className="h-full w-full rounded-xl object-cover"
        draggable={false}
      />
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
      <div className="flex w-full flex-wrap items-start justify-center gap-1 px-4 pb-4 sm:gap-1.5 sm:px-8 sm:pb-6">
        {PHOTOS.map((photo, i) => (
          <PolaroidCard
            key={photo.id}
            photo={photo}
            index={i}
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
            <div className="relative max-h-[82vh] max-w-[78vw] overflow-hidden rounded-3xl border-8 border-white bg-white p-2 shadow-2xl dark:border-neutral-800 dark:bg-neutral-800">
              <img
                src={hoveredPhoto.src}
                alt=""
                className="max-h-[76vh] max-w-[72vw] rounded-2xl object-contain"
                draggable={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}