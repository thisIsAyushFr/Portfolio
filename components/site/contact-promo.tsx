import type { ReactNode } from "react";

import { FillButton, Label } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { SOCIALS } from "@/lib/data";

export function ContactPromo(): ReactNode {
  return (
    <section
      id="contact"
      className="grid-w relative overflow-hidden bg-amber py-28 text-cream-light md:py-44"
    >
      <div
        aria-hidden="true"
        className="trail-dashed absolute top-0 left-1/2 h-20 w-px text-cream-light/60 md:h-28"
      />
      <Reveal className="col-span-full flex flex-col items-center text-center">
        <Label>Let&rsquo;s connect</Label>
        <h2 className="t-l mt-8 md:mt-10">
          Got an idea?
          <br />
          Let&rsquo;s talk
        </h2>
        <p className="t-body mt-8 max-w-[42ch] md:mt-10">
          I&rsquo;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions. Just reach out!
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
          <FillButton
            href={`mailto:${SOCIALS.email}`}
            tone="cream"
            className="!text-cream-light"
          >
            Email me
          </FillButton>
          <FillButton
            href={SOCIALS.linkedin}
            tone="cream"
            className="!text-cream-light"
          >
            LinkedIn
          </FillButton>
          <FillButton
            href={SOCIALS.github}
            tone="cream"
            className="!text-cream-light"
          >
            GitHub
          </FillButton>
        </div>
      </Reveal>
    </section>
  );
}
