import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/metadata";

export const alt = `${siteConfig.name} — Computer Science & AI/ML Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link-preview card, generated at build time in the site palette. */
export default function OpenGraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#2d0000",
          color: "#eeead7",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            border: "2px solid #eeead7",
            padding: "10px 18px",
            fontSize: 24,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Hey, I&rsquo;m Ayush
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 112,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -2,
            textTransform: "uppercase",
          }}
        >
          <span>Computer Science</span>
          <span style={{ color: "#f7f4e8" }}>&amp; AI/ML Engineer</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
          }}
        >
          <span>Software · AI systems · Research</span>
          <span
            style={{
              display: "flex",
              background: "#6d0808",
              color: "#f7f4e8",
              padding: "12px 22px",
            }}
          >
            thisisayushfr.vercel.app
          </span>
        </div>
      </div>
    ),
    size
  );
}
