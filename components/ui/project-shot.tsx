import type { ReactNode } from "react";

import type { Project } from "@/lib/data";

/**
 * A project screenshot inside a small browser window. Every screenshot has
 * its own colours and aspect ratio, so the shared chrome and the fixed 16:10
 * viewport are what make them sit together.
 */
export function ProjectShot({
  project,
  eager = false,
  className = "",
}: {
  project: Project;
  eager?: boolean;
  className?: string;
}): ReactNode {
  return (
    <div
      className={`overflow-hidden rounded-lg bg-cream-light shadow-[0_30px_60px_-30px_rgba(4,18,13,0.65)] ring-1 ring-black/10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:-rotate-1 ${className}`}
    >
      <div
        aria-hidden="true"
        className="relative flex h-7 items-center gap-1.5 px-3 sm:h-8"
      >
        <span className="h-2 w-2 rounded-full bg-amber" />
        <span className="h-2 w-2 rounded-full bg-forest/25" />
        <span className="h-2 w-2 rounded-full bg-forest/25" />
        <span className="absolute inset-x-16 truncate text-center font-mono text-[10px] tracking-wide text-forest/55 lowercase">
          {project.id}
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-forest">
        <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading={eager ? "eager" : "lazy"}
            draggable={false}
            className="h-full w-full object-cover"
            style={{
              objectPosition: project.focus ?? "50% 0%",
              ...(project.zoom
                ? {
                    transform: `scale(${project.zoom.scale})`,
                    transformOrigin: project.zoom.origin,
                  }
                : {}),
            }}
          />
        </div>
      </div>
    </div>
  );
}
