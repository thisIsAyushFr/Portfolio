import type { ReactNode } from "react";

import { FillButton, Label } from "@/components/ui/primitives";

export default function NotFound(): ReactNode {
  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-cream-light to-cream px-[var(--margin)] py-40 text-center text-forest"
    >
      <Label>Error 404</Label>
      <h1 className="t-xl mt-8">
        Off the
        <br />
        trail
      </h1>
      <p className="t-body mt-8 max-w-[36ch]">
        This page doesn&rsquo;t exist, or it moved somewhere else.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <FillButton href="/" tone="forest">
          Back home
        </FillButton>
        <FillButton href="/projects" tone="amber">
          See projects
        </FillButton>
      </div>
    </main>
  );
}
