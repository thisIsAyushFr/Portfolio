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
  /** Show the whole image on white instead of cropping to fill (for charts). */
  contain?: boolean;
  github?: string;
  live?: string;
  /** Label for the `live` link, e.g. "Preprint". Defaults to "Live demo". */
  liveLabel?: string;
  /** The GitHub repo is private for now; a short notice shows beside its link. */
  privateRepo?: boolean;
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
    title: "CPU–GPU Device Selection",
    tagline: "Robust ML scheduling under hardware and load shift",
    description:
      "Research paper on choosing the CPU or GPU for each task. A LightGBM model trained on 7,000 timing measurements across seven workloads and two GPUs cuts time lost against a perfect choice from 3.8% to 1.6% versus a tuned threshold rule, with uncertainty checks and online learning to adapt when hardware or load changes.",
    meta: "ML Research · LightGBM · Paper Under Review · Private Repo",
    image: "/projects/gpu-optimization.png",
    contain: true,
    imageAlt:
      "Rolling slowdown versus oracle for four scheduling methods before and after a load change and a hardware change",
    github: "https://github.com/thisIsAyushFr/GPU-accelerated-optimization",
    privateRepo: true,
  },
  {
    id: "gesture-racing",
    title: "Gesture Racing Game",
    tagline: "Your hand is the steering wheel",
    description:
      "A racing game you drive with your hand. MediaPipe tracks your hand through the webcam: an open palm accelerates, a fist brakes and tilting your hand steers, with calibration and a dead zone to keep it steady. Dodge barriers and cones on an endless road across five themes.",
    meta: "Python · MediaPipe · Pygame · Computer Vision",
    image: "/projects/gesture-racing.png",
    imageAlt:
      "Gesture Racing Game cover: a car on a neon night road, with a webcam inset tracking an open hand",
    github: "https://github.com/thisIsAyushFr/Gesture-Racing-Game",
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
    id: "ecosort",
    title: "EcoSort",
    tagline: "Recyclable or not, decided on camera",
    description:
      "A smart waste-sorting prototype: an OV7675 camera on an Arduino Nano ESP32 streams frames to a small CNN, trained from scratch in PyTorch, that classifies each item as recyclable or non-recyclable in real time.",
    meta: "PyTorch · Computer Vision · ESP32 · OpenCV",
    image: "/projects/ecosort.png",
    imageAlt: "EcoSort illustration: a camera frame of a can passing through a CNN to a recyclable verdict",
    github: "https://github.com/thisIsAyushFr/EcoSort",
  },
  {
    id: "slm-meal-plan",
    title: "Grounded but Not Yet Correct",
    tagline: "Do small language models get meal-plan numbers right?",
    description:
      "A pre-registered evaluation of four small language models on meal planning, with a deterministic verifier that checks every nutrient claim against Indian food-composition data. Across 1,600 runs, retrieval cut the nutrient-claim error rate from about 99% to between 2% and 44% depending on the model, yet 30–43% of plans still failed on food choice, constraints or structure.",
    meta: "NLP Research · Small Language Models · RAG · Preprint · Private Repo",
    image: "/projects/slm-meal-plan.png",
    contain: true,
    imageAlt:
      "Pipeline: request, constraint extraction, optional retrieval, small language model producing a JSON plan, and a verifier that recomputes it",
    github: "https://github.com/thisIsAyushFr/SLM-meal-plan-verifier",
    privateRepo: true,
    live: "https://doi.org/10.5281/zenodo.24465084",
    liveLabel: "Preprint",
  },
  {
    id: "breakr",
    title: "Breakr",
    tagline: "A security audit for AI-built apps",
    description:
      "A security auditor for finished or AI-generated codebases, packaged as a Claude Code skill. Ten specialised agents scan for leaked keys, missing login checks, injection and more; an AI reviewer then checks every finding against the real code and keeps only verified issues, each with a fix.",
    meta: "Python · Security · Claude Code Skill · No Dependencies",
    image: "/projects/breakr.png",
    imageAlt:
      "Breakr security audit: ten agents and a critical finding about a committed Supabase service role key",
    github: "https://github.com/thisIsAyushFr/Skills-For-AI",
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
    id: "repomind",
    title: "RepoMind",
    tagline: "Understand any GitHub repo",
    description:
      "A developer tool that analyzes a public GitHub repository and generates a structured explanation of it: architecture, technologies, main components, entry points, relationships and data flow. Paste a repository URL, analyze it, understand it. Built with Agrim Joshi.",
    meta: "Python · FastAPI · AI · Contributor",
    image: "/projects/repomind.png",
    imageAlt:
      "RepoMind: a repository URL goes in and a structured analysis comes out, with overview, architecture, technologies, components, entry points and data flow",
    github: "https://github.com/thisIsAyushFr/RepoMind",
    live: "https://therepomind.vercel.app",
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

/** Filter chips on the Projects page. */
export const PROJECT_TAGS = [
  "AI",
  "Web",
  "Research",
  "Hardware",
  "Computer Vision",
] as const;
export type ProjectTag = (typeof PROJECT_TAGS)[number];

/** Which filters each project appears under, by project id. */
export const TAGS_BY_PROJECT: Record<string, ProjectTag[]> = {
  studylens: ["AI"],
  "gesture-racing": ["Computer Vision"],
  "slm-meal-plan": ["Research", "AI"],
  repomind: ["AI", "Web"],
  breakr: ["AI"],
  "gpu-optimization": ["Research", "AI"],
  caresync: ["Web"],
  promptforge: ["AI", "Web"],
  ecosort: ["AI", "Hardware", "Computer Vision"],
  nexus: ["AI", "Web", "Computer Vision"],
  bookverse: ["Web"],
  focusboard: ["Web"],
  "scientific-calculator": ["Web"],
};

/** Three short points shown when a project is expanded on the Projects page. */
export const HIGHLIGHTS_BY_PROJECT: Record<string, string[]> = {
  studylens: [
    "Answers questions straight from your own notes",
    "Traces every answer back to its source page",
    "Generates quizzes and evaluates retrieval quality",
  ],
  "gpu-optimization": [
    "7,000 timing measurements across seven workloads and two GPUs",
    "Cuts time lost against a perfect choice from 3.8% to 1.6%",
    "Uncertainty checks and online learning adapt to hardware and load changes",
  ],
  breakr: [
    "Ten agents scan for leaked keys, missing login checks, injection and more",
    "An AI reviewer checks every finding against the real code and drops false positives",
    "Pure Python with no dependencies, packaged as a Claude Code skill",
  ],
  "gesture-racing": [
    "Open palm accelerates, a fist brakes, tilting your hand steers",
    "Calibration and a dead zone keep steering steady",
    "Five themes, a rising obstacle count and three lives",
  ],
  "slm-meal-plan": [
    "Pre-registered study: four small language models, 1,600 runs",
    "A deterministic verifier checks every nutrient claim against Indian food-composition data",
    "Retrieval cut nutrient errors from about 99% to 2–44%, yet 30–43% of plans still failed",
  ],
  repomind: [
    "Paste a repository URL and get a structured explanation of the codebase",
    "Covers architecture, technologies, components, entry points and data flow",
    "FastAPI backend with a responsive Neo-Brutalist frontend",
  ],
  caresync: [
    "Finalist at Vibe to Viable, among 100+ teams",
    "Appointments, beds and operational data in one place",
    "Built for patients, doctors, nurses and administrators",
  ],
  promptforge: [
    "Optimizes prompts for Claude",
    "Works as a browser extension, without leaving the page",
    "Built with React and Vite",
  ],
  ecosort: [
    "OV7675 camera on an Arduino Nano ESP32 streams live frames",
    "Small CNN trained from scratch in PyTorch",
    "Sorts recyclable from non-recyclable in real time",
  ],
  nexus: [
    "Asteroid survival game that adapts to the player",
    "Optional facial-expression interaction through computer vision",
    "Optional voice and audio interaction",
  ],
  bookverse: [
    "Cataloging, members, circulation, fines and reservations",
    "Notifications and reporting",
    "Authentication with role-based access",
  ],
  focusboard: [
    "Task and board management for focused work",
    "Meditation for mindful breaks",
    "Onboarding, accounts and subscriptions",
  ],
  "scientific-calculator": [
    "Standard and scientific operations",
    "Built with Python and Streamlit",
    "Lightweight by design",
  ],
};

/** The first six projects are the sideways cards on the home page. */
export const FEATURED_COUNT = 6;

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
