import { Hero } from "@/components/hero/hero";
import { Journey } from "@/components/site/journey";
import { Marquee } from "@/components/site/marquee";
import { Moments } from "@/components/site/moments";
import { MoreWork } from "@/components/site/more-work";
import { ScrollText } from "@/components/site/scroll-text";
import { Trail } from "@/components/site/trail";
import { SKILLS } from "@/lib/data";
import { createMetadata, siteConfig } from "@/lib/metadata";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description: `Welcome to ${siteConfig.name}. ${siteConfig.description}`,
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <main id="main-content">
      <Hero />
      <ScrollText
        label="Curious by default"
        text="A Computer Science & Engineering student specializing in AI/ML, passionate about building software, exploring intelligent systems, and turning ideas into practical products."
        cta={{ href: "/about", label: "About me" }}
      />
      <Moments />
      <Trail />
      <Marquee items={SKILLS} className="bg-sage text-ink" />
      <Journey />
      <MoreWork />
    </main>
  );
}
