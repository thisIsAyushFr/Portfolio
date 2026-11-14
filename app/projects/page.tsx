import { ProjectList } from "@/components/projects/project-list";
import { PageIntro } from "@/components/site/page-intro";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Selected work and case studies.",
  path: "/projects",
});

export default function ProjectsPage(): ReactNode {
  return (
    <main id="main-content">
      <PageIntro
        label="Selected work"
        title={["My recent", "work"]}
        copy="Experiments, collaborations, and projects I’m especially proud to have shipped."
      />
      <ProjectList />
    </main>
  );
}
