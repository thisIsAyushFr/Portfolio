import { Lock } from "lucide-react";
import type { ReactNode } from "react";

/** Small notice shown beside the GitHub link of a project whose repo is private. */
export function PrivateRepoNote({
  className = "",
}: {
  className?: string;
}): ReactNode {
  return (
    <p
      className={`t-label inline-flex items-center gap-1.5 opacity-70 ${className}`}
    >
      <Lock aria-hidden="true" className="h-3 w-3" strokeWidth={2.25} />
      Repository currently private
    </p>
  );
}
