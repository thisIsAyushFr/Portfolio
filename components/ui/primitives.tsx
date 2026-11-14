import Link from "next/link";
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

type Tone = "cream" | "forest" | "amber";

/**
 * `tone` names the colour of the button itself (border, text, hover fill),
 * so pick the one that contrasts with the section behind it.
 */
const TONES: Record<Tone, { className: string; ink: string }> = {
  cream: { className: "text-cream", ink: "var(--forest)" },
  forest: { className: "text-forest", ink: "var(--cream-light)" },
  amber: { className: "text-amber", ink: "var(--cream-light)" },
};

export function FillButton({
  href,
  children,
  tone = "forest",
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
      <a
        href={href}
        className={classes}
        style={style}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span>{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} style={style}>
      <span>{children}</span>
    </Link>
  );
}
