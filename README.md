# Ayush — Portfolio

Personal portfolio of Ayush, a Computer Science & Engineering student specializing in AI/ML, building software, AI systems, and research-driven projects.

**Live:** [thisisayushfr.vercel.app](https://thisisayushfr.vercel.app)

## What's inside

- **Home** — a scroll-driven story: a pinned hero with a fanned stack of project windows, a statement that lights up word by word, a sideways "Signature moments" timeline, three full-screen featured projects, and a grid of the rest.
- **Projects** — all ten projects with screenshots, descriptions, and GitHub / live demo links.
- **About** — bio, experience, education, skills, photos, and a draggable tech-stack playground.

## Featured projects

| Project | What it is | Stack |
| --- | --- | --- |
| [StudyLens](https://github.com/thisIsAyushFr/StudyLens) | AI study assistant built around RAG: ask questions from your notes, trace answers to source pages, generate quizzes | Python, ChromaDB |
| [CPU–GPU Device Selection](https://github.com/thisIsAyushFr/GPU-accelerated-optimization) | Research paper on ML-based CPU vs GPU scheduling that stays robust under hardware and load shift (paper under review) | ML research |
| [CareSync](https://github.com/thisIsAyushFr/CareSync) | Hospital management platform; finalist at Vibe to Viable among 100+ teams | [Live demo](https://caresync-vtv.vercel.app/) |
| [PromptForge](https://github.com/thisIsAyushFr/PromptForge) | Browser extension that improves prompts for Claude | React, Vite |
| [Breakr](https://github.com/thisIsAyushFr/Skills-For-AI) | Security auditor for AI-built apps: ten scanning agents plus an AI review that keeps only verified issues | Python, Claude Code skill |
| [NEXUS](https://github.com/thisIsAyushFr/Nexus-Emotion-Detection) | Asteroid survival game that adapts to the player's expression and voice | JavaScript, computer vision |

Also on the site: EcoSort, BookVerse, FocusBoard, and a Streamlit scientific calculator.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19, statically generated
- [Tailwind CSS 4](https://tailwindcss.com) for styling
- [Motion](https://motion.dev) for scroll-linked animation
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- [Matter.js](https://brm.io/matter-js/) for the draggable stack chips
- TypeScript throughout, deployed on Vercel

## Run locally

```bash
git clone https://github.com/thisIsAyushFr/Portfolio.git
cd Portfolio
npm install
npm run build
npm start
```

Then open [http://localhost:3000](http://localhost:3000). Use `npm run dev` for hot reload while editing.

## Project structure

```
app/          Pages (home, projects, about), layout, global styles
components/   Hero, page sections, header, and small UI pieces
lib/data.ts   All content: projects, experience, education, skills, links
public/       Screenshots, photos, and logos
```

Content lives in `lib/data.ts`, so adding a project or a role is a single edit there.

## Contact

- Email: [thisisayushfr@gmail.com](mailto:thisisayushfr@gmail.com)
- LinkedIn: [ayushthisside](https://www.linkedin.com/in/ayushthisside)
- GitHub: [thisIsAyushFr](https://github.com/thisIsAyushFr)
