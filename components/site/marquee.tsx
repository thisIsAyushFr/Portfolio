import type { ReactNode } from "react";

/** Endless horizontal ticker. The list is rendered twice so the loop is seamless. */
export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}): ReactNode {
  return (
    <div className={`overflow-hidden py-6 md:py-8 ${className}`}>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="t-h2 flex items-center whitespace-nowrap"
              >
                {item}
                <span className="mx-6 inline-block h-3 w-3 rounded-full bg-amber md:mx-10 md:h-4 md:w-4" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
