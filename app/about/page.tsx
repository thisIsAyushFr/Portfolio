import { Facts } from "@/components/about/facts";
import { JourneyPath } from "@/components/about/journey-path";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { SkillGroups } from "@/components/about/skill-groups";
import { Stack } from "@/components/about/stack";
import { Story } from "@/components/about/story";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Marquee } from "@/components/site/marquee";
import { PageIntro } from "@/components/site/page-intro";
import { Label } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { SKILLS } from "@/lib/data";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About me, background, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content">
      <PageIntro
        label="About me"
        title={["Hello,", "I’m Ayush"]}
        copy="Computer Science & Engineering student specializing in AI/ML — building software, AI systems, and research-driven projects."
      >
        <div className="mx-auto mb-10 w-full max-w-312 md:mb-14">
          <PolaroidStrip />
        </div>
      </PageIntro>

      <Facts />

      <Story />

      <Marquee items={SKILLS} className="bg-sage text-ink" />

      {/* Journey */}
      <section className="grid-w bg-cream text-ink gap-y-14 pt-28 md:pt-44">
        <Reveal className="col-span-full lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Label>Background</Label>
            <h2 className="t-h1 mt-8">
              <SplitReveal lines={["Where", "I’ve been"]} />
            </h2>
          </div>
        </Reveal>

        <div className="col-span-full lg:col-start-6 lg:col-end-13">
          <JourneyPath />
        </div>
      </section>

      {/* Skills */}
      <section className="bg-cream text-ink px-[var(--margin)] pt-28 md:pt-44">
        <Reveal className="flex flex-col items-center text-center">
          <Label>What I do</Label>
          <h2 className="t-l mt-8 md:mt-10">
            <SplitReveal lines={["Build, train", "& lead"]} />
          </h2>
        </Reveal>
        <div className="mt-14 md:mt-20">
          <SkillGroups />
        </div>
      </section>

      {/* Tech stack */}
      <section className="grid-w bg-cream text-ink gap-y-10 py-28 md:py-44">
        <Reveal className="col-span-full lg:col-span-4">
          <Label>Toolbox</Label>
          <h2 className="t-h1 mt-8">
            <SplitReveal lines={["Tools", "I use"]} />
          </h2>
        </Reveal>
        <Reveal className="col-span-full lg:col-start-6 lg:col-end-13">
          <Stack />
        </Reveal>
      </section>
    </main>
  );
}
