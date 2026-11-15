"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { RollText } from "@/components/motion/roll-text";
import { NAV_ITEMS, SOCIALS } from "@/lib/data";
import { EASE } from "@/lib/motion";

function isActive(pathname: string, href: string): boolean {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header(): ReactNode {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > previous && y > 240);
  });

  return (
    <>
      {/* Reading progress: a thin line that fills as the page scrolls. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="bg-sage fixed inset-x-0 top-0 z-[60] h-1 origin-left"
      />

      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-130%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 p-3 sm:p-4"
      >
        <div
          className={`text-ink flex h-14 items-center justify-between px-4 transition-colors duration-500 sm:px-5 ${
            solid || open ? "bg-cream-light" : "bg-transparent"
          }`}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="focus-ring t-h3 leading-none"
            aria-label="Ayush, home"
          >
            Ayush
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="focus-ring t-h8 group relative inline-block py-2"
                    >
                      <RollText>{item.label}</RollText>
                      <span
                        aria-hidden="true"
                        className={`bg-accent absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden md:inline-block">
              <a
                href={`mailto:${SOCIALS.email}`}
                className="focus-ring t-h8 bg-accent text-cream-light hover:bg-ink inline-block px-4 py-3 transition-colors duration-300"
              >
                <RollText>Let&rsquo;s talk</RollText>
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="focus-ring t-h8 border-ink cursor-pointer border px-4 py-3 md:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="bg-deep text-cream fixed inset-0 z-40 flex flex-col justify-between px-5 pt-28 pb-8 md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + index * 0.07,
                      ease: EASE,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={
                        isActive(pathname, item.href) ? "page" : undefined
                      }
                      className="focus-ring t-l aria-[current=page]:text-sage block"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="t-h8 flex flex-wrap gap-x-6 gap-y-3">
              <a href={`mailto:${SOCIALS.email}`} className="focus-ring">
                Email
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring"
              >
                LinkedIn
              </a>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
