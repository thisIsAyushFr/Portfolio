import type { ReactNode } from "react";

import type { TimelineEntry } from "@/lib/data";

/** Ruled list of roles or schools. Inherits text colour from its section. */
export function Timeline({
  title,
  entries,
}: {
  title: string;
  entries: TimelineEntry[];
}): ReactNode {
  return (
    <div>
      <h3 className="t-label mb-4 opacity-70">{title}</h3>
      <ul className="border-t border-current/30">
        {entries.map((entry) => (
          <li
            key={`${entry.place}-${entry.period}`}
            className="group flex items-center gap-4 border-b border-current/30 py-5 transition-[padding,background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent hover:px-4 hover:text-cream-light sm:gap-6 sm:py-6"
          >
            <span
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center bg-white p-2 sm:h-16 sm:w-16"
            >
              <img
                src={entry.logo}
                alt=""
                className="max-h-full max-w-full object-contain"
                draggable={false}
              />
            </span>

            <div className="min-w-0 flex-1">
              <p className="t-h3">{entry.place}</p>
              <p className="t-body mt-1 opacity-80">{entry.role}</p>
            </div>

            <p className="t-label hidden shrink-0 sm:block">{entry.period}</p>
            <p className="t-label sr-only sm:hidden">{entry.period}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
