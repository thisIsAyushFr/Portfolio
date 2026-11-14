import type { ReactNode } from "react";

import { FillButton, Label } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { EDUCATION, EXPERIENCE } from "@/lib/data";
import { Timeline } from "./timeline";

export function Journey(): ReactNode {
  return (
    <section className="grid-w gap-y-14 bg-cream py-28 text-forest md:py-44">
      <div className="col-span-full lg:col-span-5">
        <Reveal className="lg:sticky lg:top-28">
          <Label>The journey so far</Label>
          <h2 className="t-h1 mt-8">
            Learning,
            <br />
            leading
            <br />
            &amp; shipping
          </h2>
          <p className="t-body mt-8 max-w-[40ch]">
            Studying AI/ML at Chitkara University, leading content at
            Code2Chill, and heading to Germany for a semester exchange &mdash;
            building in public along the way.
          </p>
          <div className="mt-8">
            <FillButton href="/about" tone="forest">
              More about me
            </FillButton>
          </div>
        </Reveal>
      </div>

      <div className="col-span-full flex flex-col gap-14 lg:col-start-7 lg:col-end-13">
        <Reveal>
          <Timeline title="Experience" entries={EXPERIENCE} />
        </Reveal>
        <Reveal delay={0.1}>
          <Timeline title="Education" entries={EDUCATION} />
        </Reveal>
      </div>
    </section>
  );
}
