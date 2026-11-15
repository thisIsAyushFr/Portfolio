import type { ReactNode } from "react";

/**
 * Label that rolls to a second copy when its link or button is hovered.
 * The motion is pure CSS (`.roll` in globals.css). The duplicate is hidden
 * from screen readers, so the label is announced once.
 */
export function RollText({ children }: { children: ReactNode }): ReactNode {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
