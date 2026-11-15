"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { getLenis } from "@/components/layout/smooth-scroll";
import { Magnetic } from "@/components/motion/magnetic";

/** Footer row: availability, live local time, and a back-to-top button. */
export function FooterExtras(): ReactNode {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = (): void => setTime(format.format(new Date()));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  function toTop(): void {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="mt-16 flex flex-wrap items-center justify-between gap-x-10 gap-y-8 border-t border-cream/20 px-[var(--margin)] py-10 md:mt-24 md:py-14">
      <div className="flex flex-col gap-3">
        <p className="t-h7 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-sage opacity-70" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-sage" />
          </span>
          Open to research &amp; internships
        </p>
        <p className="t-label opacity-70">
          India &middot;{" "}
          <span className="tabular-nums">{time ?? "--:--"}</span> IST
        </p>
      </div>

      <Magnetic>
        <button
          type="button"
          onClick={toTop}
          className="focus-ring group flex items-center gap-4"
        >
          <span className="t-h8">Back to top</span>
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/40 transition-colors duration-300 group-hover:border-sage group-hover:bg-sage group-hover:text-ink">
            <ArrowUp
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </button>
      </Magnetic>
    </div>
  );
}
