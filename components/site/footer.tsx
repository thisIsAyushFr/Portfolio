import Link from "next/link";
import type { ReactNode } from "react";

import { NAV_ITEMS, PROJECTS, SOCIALS } from "@/lib/data";

const SOCIAL_LINKS = [
  { label: "Email", href: `mailto:${SOCIALS.email}` },
  { label: "LinkedIn", href: SOCIALS.linkedin },
  { label: "GitHub", href: SOCIALS.github },
];

export function Footer(): ReactNode {
  return (
    <footer className="overflow-hidden bg-forest text-cream">
      <div className="grid-w gap-y-12 pt-20 md:pt-28">
        <p className="t-h2 col-span-full max-w-[18ch] md:col-span-6">
          Computer Science &amp; AI/ML engineer, building things that matter.
        </p>

        <FooterColumn title="Pages" className="col-span-6 md:col-span-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="focus-ring hover:text-amber">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Projects" className="col-span-6 md:col-span-2">
          {PROJECTS.slice(0, 5).map((project) => (
            <li key={project.id}>
              <Link
                href={`/projects#${project.id}`}
                className="focus-ring hover:text-amber"
              >
                {project.title}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Connect" className="col-span-6 md:col-span-2">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="focus-ring hover:text-amber"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </FooterColumn>
      </div>

      <p
        aria-hidden="true"
        className="mt-16 text-center font-display text-[31vw] leading-[1.02] text-pine uppercase select-none md:mt-20"
      >
        Ayush
      </p>

      <div className="t-label flex flex-wrap items-center justify-between gap-3 border-t border-cream/20 px-[var(--margin)] py-5">
        <p>&copy; 2026 Ayush. All rights reserved.</p>
        <p className="opacity-70">Built with Next.js</p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className: string;
  children: ReactNode;
}): ReactNode {
  return (
    <div className={className}>
      <h2 className="t-label opacity-60">{title}</h2>
      <ul className="t-body mt-5 flex flex-col gap-2.5 [&_a]:transition-colors [&_a]:duration-300">
        {children}
      </ul>
    </div>
  );
}
