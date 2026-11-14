export type Project = {
  id: string;
  title: string;
  /** Short tagline shown under the title in the featured trail. */
  tagline: string;
  description: string;
  meta: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the screenshot inside its 16:10 frame. */
  focus?: string;
  /** Extra zoom, for screenshots with dead space or stray browser chrome. */
  zoom?: { scale: number; origin: string };
  github?: string;
  live?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "studylens",
    title: "StudyLens",
    tagline: "Ask your notes, trace every answer",
    description:
      "An AI-powered study assistant built around RAG, enabling students to ask questions from their notes, trace answers to source pages, generate quizzes, and evaluate retrieval quality.",
    meta: "AI / RAG · Python · ChromaDB",
    image: "/projects/studylens.png",
    imageAlt: "StudyLens AI study assistant interface",
    github: "https://github.com/thisIsAyushFr/StudyLens",
  },
  {
    id: "gpu-optimization",
    title: "GPU-Accelerated Optimization",
    tagline: "CPU or GPU? Let the model decide",
    description:
      "Predicting whether workloads belong on the CPU or GPU using workload characteristics, machine learning models, and benchmarked workloads.",
    meta: "ML Research · Paper Under Review · Private Repo",
    image: "/projects/gpu-optimization.png",
    focus: "50% 40%",
    zoom: { scale: 1.07, origin: "50% 45%" },
    imageAlt: "GPU optimization research benchmark results",
    github: "https://github.com/thisIsAyushFr/GPU-accelerated-optimization",
  },
  {
    id: "caresync",
    title: "CareSync",
    tagline: "Hospital management in one platform",
    description:
      "Hospital management, organized in one platform. Centralizes appointments, beds, and operational data for patients, doctors, nurses, and administrators.",
    meta: "Finalist, Vibe to Viable · 100+ teams",
    image: "/projects/caresync.png",
    imageAlt: "CareSync hospital management dashboard",
    github: "https://github.com/thisIsAyushFr/CareSync",
    live: "https://caresync-vtv.vercel.app/",
  },
  {
    id: "promptforge",
    title: "PromptForge",
    tagline: "Better prompts without leaving the browser",
    description:
      "Better prompts for Claude, without leaving the browser. An AI prompt optimization browser extension built with React and Vite.",
    meta: "React · Vite · LLMs",
    image: "/projects/promptforge.png",
    focus: "50% 50%",
    imageAlt: "PromptForge AI prompt optimization interface",
    github: "https://github.com/thisIsAyushFr/PromptForge",
  },
  {
    id: "nexus",
    title: "NEXUS",
    tagline: "A game that reads the player",
    description:
      "An asteroid survival game that adapts to the player, with optional facial-expression and voice/audio interaction using computer vision and audio analysis.",
    meta: "DOMination · JavaScript · Computer Vision · Audio",
    image: "/projects/nexus.png",
    zoom: { scale: 1.35, origin: "25% 88%" },
    imageAlt: "NEXUS emotion-driven asteroid survival game",
    github: "https://github.com/thisIsAyushFr/Nexus-Emotion-Detection",
    live: "https://c2c-event.vercel.app/",
  },
  {
    id: "bookverse",
    title: "BookVerse",
    tagline: "A complete library workflow",
    description:
      "A complete digital workflow for library management, covering cataloging, members, circulation, fines, reservations, notifications, reporting, authentication, and role-based access.",
    meta: "HTML · CSS · JavaScript · Role-Based Access",
    image: "/projects/bookverse.png",
    imageAlt: "BookVerse library management dashboard",
    github: "https://github.com/thisIsAyushFr/BookVerse",
    live: "https://thisisbookverse.vercel.app/",
  },
  {
    id: "focusboard",
    title: "FocusBoard",
    tagline: "Focused work, mindful breaks",
    description:
      "A productivity workspace built around focused work and mindful breaks, combining task and board management with meditation, onboarding, authentication, accounts, and subscriptions.",
    meta: "HTML · CSS · JavaScript · Vercel",
    image: "/projects/focusboard.png",
    imageAlt: "FocusBoard productivity and meditation interface",
    github: "https://github.com/thisIsAyushFr/FocusBoard",
    live: "https://focusboard-wine.vercel.app/",
  },
  {
    id: "scientific-calculator",
    title: "Scientific Calculator",
    tagline: "Lightweight maths in Streamlit",
    description:
      "A lightweight scientific calculator built with Streamlit, supporting standard and scientific mathematical operations.",
    meta: "Python · Streamlit",
    image: "/projects/scientific-calculator.png",
    zoom: { scale: 1.25, origin: "50% 45%" },
    imageAlt: "Scientific Calculator Streamlit application",
    github: "https://github.com/thisIsAyushFr/Scientific_Calculator_C2C",
  },
];

/** The first three projects get the full-screen treatment on the home page. */
export const FEATURED_COUNT = 3;

export type TimelineEntry = {
  kind: "Experience" | "Education";
  place: string;
  role: string;
  period: string;
  logo: string;
  wideLogo?: boolean;
};

export const EXPERIENCE: TimelineEntry[] = [
  {
    kind: "Experience",
    place: "Code2Chill",
    role: "Head of Content",
    period: "2026 – Present",
    logo: "/experience/code2chill.png",
  },
  {
    kind: "Experience",
    place: "Chitkara University",
    role: "Class Representative",
    period: "2026 – Present",
    logo: "/experience/chitkara.png",
  },
];

export const EDUCATION: TimelineEntry[] = [
  {
    kind: "Education",
    place: "Chitkara University",
    role: "B.E. Computer Science & Engineering (AI/ML) · CGPA 9.39/10",
    period: "2025 – 2029",
    logo: "/education/chitkara.png",
  },
  {
    kind: "Education",
    place: "DHBW Ravensburg, Germany",
    role: "Semester Exchange",
    period: "Jan 2027 – Mar 2027",
    logo: "/education/dhbw.png",
    wideLogo: true,
  },
];

export const SKILLS = [
  "Software Development",
  "AI & Machine Learning",
  "Data Structures & Algorithms",
  "LLMs & Prompt Engineering",
  "Computer Vision",
  "Research & Experimentation",
  "Full-Stack Development",
  "Problem Solving",
  "Technical Leadership",
];

export const SOCIALS = {
  email: "thisisayushfr@gmail.com",
  linkedin: "https://www.linkedin.com/in/ayushthisside",
  github: "https://github.com/thisIsAyushFr",
};

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
] as const;
