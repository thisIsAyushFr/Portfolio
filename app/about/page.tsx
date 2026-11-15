import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Stack } from "@/components/about/stack";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Marquee } from "@/components/site/marquee";
import { PageIntro } from "@/components/site/page-intro";
import { Timeline } from "@/components/site/timeline";
import { Label } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { EDUCATION, EXPERIENCE, SKILLS } from "@/lib/data";
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

      <section className="grid-w gap-y-10 bg-deep py-28 text-cream md:py-44">
        <Reveal className="col-span-full md:col-span-4">
          <Label>The story</Label>
          <p className="t-h2 mt-8 max-w-[12ch]">
            Software, intelligence &amp; research
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="col-span-full flex flex-col gap-6 text-[clamp(1.05rem,1.45vw,1.5rem)] leading-[1.5] tracking-tight md:col-start-6 md:col-end-13 [&_strong]:font-semibold [&_strong]:text-cream-light"
        >
          <p>
            A{" "}
            <strong>
              Computer Science &amp; Engineering student specializing in AI/ML
            </strong>{" "}
            passionate about building software, exploring intelligent systems,
            and turning ideas into practical products. I enjoy working across{" "}
            <strong>
              software development, artificial intelligence, and research
            </strong>{" "}
            to create projects that are both technically meaningful and useful.
          </p>
          <p>
            My work ranges from building{" "}
            <strong>AI-powered tools and full-stack applications</strong> to
            researching machine learning approaches for real-world computing
            problems. I&rsquo;m especially interested in understanding how
            software, data, and intelligent systems can work together to solve
            problems more effectively.
          </p>
          <p>
            Currently, I&rsquo;m focused on strengthening my{" "}
            <strong>software engineering and problem-solving skills</strong>,
            building high-value projects, and exploring opportunities to grow
            through{" "}
            <strong>
              research, international experience, and industry internships
            </strong>
            .
          </p>
        </Reveal>
      </section>

      <Marquee items={SKILLS} className="bg-sage text-ink" />

      <section className="grid-w gap-y-14 bg-cream py-28 text-ink md:py-44">
        <Reveal className="col-span-full lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Label>Background</Label>
            <h2 className="t-h1 mt-8">
              <SplitReveal lines={["Where", "I\u2019ve been"]} />
            </h2>
          </div>
        </Reveal>

        <div className="col-span-full flex flex-col gap-14 lg:col-start-6 lg:col-end-13">
          <Reveal>
            <Timeline title="Experience" entries={EXPERIENCE} />
          </Reveal>
          <Reveal>
            <Timeline title="Education" entries={EDUCATION} />
          </Reveal>
          <Reveal>
            <h3 className="t-label mb-4 opacity-70">What I do</h3>
            <ul className="flex flex-wrap gap-2.5">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="t-h8 border border-ink px-4 py-3 transition-colors duration-300 hover:bg-ink hover:text-cream"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <Stack />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
