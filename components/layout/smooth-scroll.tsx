"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { features } from "@/lib/config";

const LENIS_OPTIONS = {
  // lerp gives a continuous, weighty glide; a fixed duration feels steppy
  // when the wheel is flicked repeatedly.
  lerp: 0.09,
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

let instance: Lenis | null = null;

/** The live Lenis instance, or null (reduced motion, or before mount). */
export function getLenis(): Lenis | null {
  return instance;
}

export function SmoothScroll({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  useEffect(() => {
    if (!features.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    instance = lenis;

    let rafId = 0;
    function raf(time: number): void {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    function handleAnchorClick(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();
      lenis.scrollTo(element as HTMLElement, { offset: -100 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return <>{children}</>;
}
