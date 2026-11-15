"use client";

import { animate } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

import { getLenis } from "@/components/layout/smooth-scroll";
import { NAV_ITEMS } from "@/lib/data";
import { EASE, useReducedMotion } from "@/lib/motion";

const HIDDEN_BELOW = "inset(100% 0 0 0)";
const COVERING = "inset(0% 0 0 0)";
const HIDDEN_ABOVE = "inset(0 0 100% 0)";

/**
 * Curtain between pages. Internal link clicks are intercepted: the curtain
 * rises to cover the screen, the route changes underneath, then the curtain
 * lifts away. Individual <Link>s need no changes.
 */
export function PageTransition(): ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const curtain = useRef<HTMLDivElement | null>(null);
  const label = useRef<HTMLSpanElement | null>(null);
  const covering = useRef(false);

  // Intercept clicks on internal links.
  useEffect(() => {
    if (reducedMotion) return;

    function onClick(event: MouseEvent): void {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement).closest?.("a");
      const el = curtain.current;
      if (!anchor || !el || covering.current) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page or #hash

      event.preventDefault();
      covering.current = true;

      if (label.current) {
        label.current.textContent =
          NAV_ITEMS.find((item) => item.href === url.pathname)?.label ?? "";
      }

      const destination = url.pathname + url.search + url.hash;
      animate(
        el,
        { clipPath: [HIDDEN_BELOW, COVERING] },
        { duration: 0.55, ease: EASE }
      ).then(() => {
        router.push(destination);
        // Safety net: never leave the curtain down if navigation stalls.
        window.setTimeout(() => {
          if (covering.current) window.location.assign(destination);
        }, 5000);
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reducedMotion, router]);

  // The route changed: reset scroll and lift the curtain.
  useEffect(() => {
    const el = curtain.current;
    if (!covering.current || !el) return;

    if (!window.location.hash) {
      getLenis()?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }

    animate(
      el,
      { clipPath: [COVERING, HIDDEN_ABOVE] },
      { duration: 0.7, ease: EASE, delay: 0.15 }
    ).then(() => {
      el.style.clipPath = HIDDEN_BELOW;
      covering.current = false;
    });
  }, [pathname]);

  return (
    <div
      ref={curtain}
      aria-hidden="true"
      style={{ clipPath: HIDDEN_BELOW }}
      className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center bg-accent text-cream-light"
    >
      <span ref={label} className="t-xl" />
    </div>
  );
}
