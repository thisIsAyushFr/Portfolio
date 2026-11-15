import { Hero } from "@/components/hero/hero";
import { Journey } from "@/components/site/journey";
import { Marquee } from "@/components/site/marquee";
import { Moments } from "@/components/site/moments";
import { MoreWork } from "@/components/site/more-work";
import { RoleLine } from "@/components/site/role-line";
import { SectionRail, type RailSection } from "@/components/site/section-rail";
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

/** The floating section pill. Each id wraps a section below. */
const SECTIONS: RailSection[] = [
  { id: "top", label: "Intro" },
  { id: "build", label: "What I build" },
  { id: "moments", label: "Moments" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "more", label: "More" },
];

export default function HomePage(): ReactNode {
  return (
    <main id="main-content">
      <SectionRail sections={SECTIONS} />
      <div id="top">
        <Hero />
      </div>
      <div id="build">
        <RoleLine />
      </div>
      <div id="moments">
        <Moments />
      </div>
      <div id="work">
        <Trail />
      </div>
      <Marquee items={SKILLS} className="bg-sage text-ink" />
      <div id="journey">
        <Journey />
      </div>
      <div id="more">
        <MoreWork />
      </div>
    </main>
  );
}
