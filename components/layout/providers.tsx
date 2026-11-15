"use client";

import { Cursor } from "@/components/motion/cursor";
import { PageTransition } from "@/components/motion/page-transition";
import { ReducedMotionProvider } from "@/lib/motion";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ReducedMotionProvider>
      <SmoothScroll>{children}</SmoothScroll>
      <PageTransition />
      <Cursor />
    </ReducedMotionProvider>
  );
}
