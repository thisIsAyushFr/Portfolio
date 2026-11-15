import Link from "next/link";

import { Magnetic } from "@/components/motion/magnetic";
import { RollText } from "@/components/motion/roll-text";
import type { CSSProperties, ReactNode } from "react";

/** Small boxed uppercase eyebrow. Inherits the current text colour. */
export function Label({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  return (
    <span
      className={`t-label inline-block border border-current px-3 py-2 select-none ${className}`}
    >
      {children}
    </span>
  );
}

type Tone = "cream" | "ink" | "accent";

/**
 * `tone` names the colour of the button itself (border, text, hover fill),
 * so pick the one that contrasts with the section behind it.
 */
const TONES: Record<Tone, { className: string; ink: string }> = {
  cream: { className: "text-cream", ink: "var(--ink)" },
  ink: { className: "text-ink", ink: "var(--cream-light)" },
  accent: { className: "text-accent", ink: "var(--cream-light)" },
};

export function FillButton({
  href,
  children,
  tone = "ink",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  size?: "sm" | "md";
  className?: string;
}): ReactNode {
  const { className: toneClass, ink } = TONES[tone];
  const style = { "--btn-ink": ink } as CSSProperties;
  const classes = `fill-btn focus-ring t-h8 ${toneClass} ${
    size === "sm" ? "!px-4 !py-3 !text-[0.8rem]" : ""
  } ${className}`;
  const external = /^(https?:|mailto:)/.test(href);

  if (external) {
    const newTab = href.startsWith("http");
    return (
      <Magnetic>
        <a
          href={href}
          className={classes}
          style={style}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <span>
            <RollText>{children}</RollText>
          </span>
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <Link href={href} className={classes} style={style}>
        <span>
          <RollText>{children}</RollText>
        </span>
      </Link>
    </Magnetic>
  );
}
