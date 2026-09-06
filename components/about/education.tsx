import type { ReactNode } from "react";

type Entry = {
  school: string;
  degree: string;
  period: string;
  logo: string;
};

const ENTRIES: Entry[] = [
  {
    school: "Chitkara University",
    degree: "B.E. Computer Science & Engineering (AI/ML) • CGPA 9.39/10",
    period: "2025 – 2029",
    logo: "/education/chitkara.png",
  },
  {
    school: "DHBW Ravensburg, Germany",
    degree: "Semester Exchange",
    period: "Jan 2027 – Mar 2027",
    logo: "/education/dhbw.png",
  },
];

const ROW_HEIGHT = 64;

export function Education(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Education
      </h3>

      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {ENTRIES.map((entry) => (
            <li
              key={`${entry.school}-${entry.period}`}
              className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2"
              style={{ minHeight: ROW_HEIGHT }}
            >
              <SchoolLogo entry={entry} />
              
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                  {entry.school}
                </span>

                <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                  {entry.degree}
                  <span className="text-foreground/30 mx-2">•</span>
                  <span className="text-foreground/55">{entry.period}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SchoolLogo({ entry }: { entry: Entry }): ReactNode {
  const isDHBW = entry.school.includes("DHBW");

  return (
    <span
      className="border-foreground/15 bg-white inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border"
      aria-hidden="true"
      style={{ borderRadius: 14 }}
    >
      <img
        src={entry.logo}
        alt=""
        width={isDHBW ? 44 : 32}
        height={isDHBW ? 32 : 32}
        className={
          isDHBW
            ? "h-8 w-11 object-contain"
            : "h-8 w-8 object-contain"
        }
        draggable={false}
      />
    </span>
  );
}