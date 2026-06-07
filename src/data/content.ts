import type { ComponentType } from "react";
import clientApiPreview from "../assets/client-api-preview.png";
import mediamultiversePreview from "../assets/mediamultiverse-preview.png";
import rebirthuoPreview from "../assets/rebirthuo-preview.png";
import scriptsdkPreview from "../assets/scriptsdk-preview.png";
import stealthClientPreview from "../assets/stealth-client-preview.png";
import {
  Braces,
  Code2,
  Database,
  Globe2,
  Layers3,
  MonitorCog,
  Sparkles,
  Zap,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type Profile = {
  name: string;
  handle: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  socials: LinkItem[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  period?: string;
  summary: string;
  challenge: string;
  role: string;
  roles?: string[];
  stack: string[];
  highlights: string[];
  links: LinkItem[];
  accent: "cyan" | "lime" | "coral" | "steel";
  image?: ProjectImage;
};

export type ProjectTimelineItem = {
  projectSlug: string;
  period: string;
  narrative: string;
  tags: string[];
};

export type ProjectImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  aspectRatio?: string;
  objectPosition?: string;
};

const projectBannerImageBase = {
  fit: "cover",
  aspectRatio: "2 / 1",
} satisfies Pick<ProjectImage, "fit" | "aspectRatio">;

export type StackItem = {
  label: string;
  description: string;
  icon: ComponentType<LucideProps>;
};

export type ProfileSection = {
  title: string;
  copy: string;
  icon: ComponentType<LucideProps>;
};

export type ProfileListItem = {
  title: string;
  copy: string;
};

export const profile: Profile = {
  name: "Jan",
  handle: "Crome696",
  role: "Tech Lead",
  headline: "Tech Lead, software engineer, AI enthusiast.",
  summary:
    "I work in the international financial services sector, leading and collaborating with cross-functional teams to build reliable, scalable, and meaningful software solutions.",
  location: "Rhineland-Palatinate, Germany",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Crome696",
      external: true,
    },
  ],
};

export const heroTechStackItems = [
  "Java",
  "Spring Boot",
  "Angular",
  "C#",
  "Python",
  "Delphi",
  "Pascal Script",
];

export const professionalFocusItems = [
  "Software Engineering",
  "Software Architecture",
  "Technical Leadership",
  "AI Enablement",
  "Automation",
  "Product Discovery",
  "Product Value Evaluation",
];

export const workingMethodItems = [
  "Agile Engineering",
  "AI-assisted Engineering",
  "New Ways of Work",
  "Cross-functional Collaboration",
  "Continuous Learning",
  "Pragmatic Problem Solving",
];

export const projects: Project[] = [
  {
    slug: "rebirthuo",
    title: "RebirthUO",
    category: "Ultima Online Freeshard",
    period: "2014 to 2017",
    summary:
      "A customized Ultima Online free shard based on ServUO, operated and maintained by a team from 2014 to 2017.",
    challenge:
      "RebirthUO brought together community operations, shard hosting, and custom gameplay design to offer players a tailored Ultima Online experience beyond the default ServUO setup.",
    role:
      "Part of the operating team together with Tecmo and Ruaduck, contributing under the Crome696 handle to server operation, community presence, and scene tooling around the shard.",
    roles: ["Tech Lead", "Lead Developer", "Game Master"],
    stack: ["C#", ".NET", "ServUO", "RunUO", "Shard operations"],
    highlights: [
      "Runnable service hosted and maintained by the team from 2014 to 2017.",
      "Customized gameplay experience using ideas and features from RunUO and ServUO.",
      "Community activity reached up to 50 players online at the same time.",
      "Player-focused additions such as newbie armor, skill and stat bonuses, and house placement options.",
      "The server itself is closed source, while tools and useful community material may be published through the RebirthUO GitHub organization.",
    ],
    links: [],
    accent: "lime",
    image: {
      src: rebirthuoPreview,
      alt: "RebirthUO project banner",
      ...projectBannerImageBase,
      objectPosition: "center",
    },
  },
  {
    slug: "stealth-client",
    title: "Stealth Client",
    category: "Ultima Online Automation Client",
    period: "2010 to 2022",
    summary:
      "A specialized Ultima Online client and scripting environment for automating player actions through Pascal Script, Delphi, Python, and .NET-based tooling.",
    challenge:
      "Stealth Client set out to provide a universal, resource-light automation client for Ultima Online, combining script execution, a built-in editor and debugger, pathfinding, map tooling, proxy support, and a broad script API.",
    role:
      "Used, tested, developed with, and supported the Stealth Client ecosystem from 2010 to 2022, working across Pascal Script, Delphi, Python, and .NET-based integrations.",
    roles: ["User", "Tester", "Developer", "Supporter"],
    stack: ["Pascal Script", "Delphi", "Python", ".NET", "C#", "Stealth-Client API", "Ultima Online"],
    highlights: [
      "Worked with the client and its scripting ecosystem over a long-running 2010 to 2022 period.",
      "Used Pascal Script, Delphi, Python, and .NET while building and testing automation workflows.",
      "Explored a client environment with built-in script editing, syntax highlighting, and debugging support.",
      "Worked around Stealth Client's pathfinding, map tooling, proxy support, and extensive script API surface.",
      "Supported users and community workflows around scripting, testing, and practical client usage.",
    ],
    links: [
      {
        label: "Stealth Client about",
        href: "https://stealth.od.ua/about/",
        external: true,
      },
    ],
    accent: "steel",
    image: {
      src: stealthClientPreview,
      alt: "Stealth Client project banner",
      ...projectBannerImageBase,
      objectPosition: "center",
    },
  },
  {
    slug: "scriptsdk",
    title: "ScriptSDK",
    category: "External Script API",
    period: "2015 to 2022",
    summary:
      "An open-source external script API implementation for Stealth-Client, a specialized Ultima Online client with automation scripting support.",
    challenge:
      "ScriptSDK explored how time-sensitive game-client operations can be exposed through a structured API while staying usable for automation and community-driven tooling.",
    role:
      "Implemented and evolved the SDK across multiple technology generations, starting with C# and .NET 4.8 and later moving into Java 17 with Spring Boot.",
    roles: ["Lead Engineer", "Software Architect", "Founder", "Stealth Client Supporter"],
    stack: [
      "C#",
      ".NET 4.8",
      "Java 17",
      "Spring Boot",
      "Pascal Script",
      "Delphi",
      "Python",
      "Stealth-Client API",
    ],
    highlights: [
      "Open-source project available through the ScriptSDK GitHub organization.",
      "Provided an external API layer for Stealth-Client automation around Ultima Online gameplay.",
      "Connected to a client ecosystem with scripting support through Pascal Script and Python.",
      "Implemented in C# and .NET 4.8 from 2015 to 2020.",
      "Reworked in Java 17 and Spring Boot 2.7.1 from 2021 to 2022.",
      "Influenced by community contributors and used as an educational project for API design around timing-sensitive operations.",
    ],
    links: [],
    accent: "cyan",
    image: {
      src: scriptsdkPreview,
      alt: "ScriptSDK project banner",
      ...projectBannerImageBase,
    },
  },
  {
    slug: "client-sdk",
    title: "Client-SDK",
    category: "WinAPI Automation Research",
    period: "2015 to 2022",
    summary:
      "A .NET-based research library for controlling external Windows applications through WinAPI, OCR, and supporting automation tools.",
    challenge:
      "Client-SDK explored how Windows applications and mobile-market games running on Windows could be analyzed and controlled through screen recognition, WinAPI integration, and carefully scoped automation workflows.",
    role:
      "Designed the automation framework, built the .NET library surface, and created supporting Client-Tools for configuration, code generation, image validation, and encryption.",
    stack: [".NET", ".NET 4.8", ".NET Core", "C#", "WinAPI", "OCR", "Windows Automation"],
    highlights: [
      "Client-SDK provided the library functions needed to interact with target Windows applications.",
      "Client-Tools added configuration workflows, code generation, image validation, and encryption capabilities.",
      "Used WinAPI to manipulate and control external applications running on Windows.",
      "Incorporated OCR to read and interpret text or visual elements from target applications.",
      "Implemented in C# and .NET 4.8 from 2015 to 2020.",
      "Used for a complete Kritika: The White Knights automation research case until the end of 2018.",
      "Rewritten from scratch with .NET Core from 2021 to 2022.",
      "Kept closed source because the automation surface carries legal and ethical considerations around third-party software.",
    ],
    links: [
      {
        label: "Kritika use case",
        href: "https://apps.apple.com/us/app/kritika-the-white-knights/id865958296",
        external: true,
      },
    ],
    accent: "coral",
    image: {
      src: clientApiPreview,
      alt: "Client-SDK automation research banner",
      ...projectBannerImageBase,
      objectPosition: "center",
    },
  },
  {
    slug: "mediamultiverse",
    title: "MediaMultiVerse",
    category: "Media Archiving Platform",
    period: "Since 2024",
    summary:
      "A closed-source application for crawling, organizing, and archiving media from different websites.",
    challenge:
      "MediaMultiVerse explores how media from multiple web sources can be discovered, normalized, and archived while keeping the system maintainable enough to evolve beyond an early private prototype.",
    role:
      "Designing and building the application end to end, using the project as a focused deep dive into Angular 18 while shaping the backend, browser automation, and API contracts around it.",
    roles: ["Creator", "Full-Stack Developer", "Software Architect"],
    stack: [
      "Angular 18",
      "TypeScript",
      "Spring Boot",
      "Java",
      "Docker",
      "OpenAPI",
      "Google Chrome",
      "Selenium",
      "ESLint",
    ],
    highlights: [
      "Closed-source application focused on crawling and archiving media from different websites.",
      "Current project in an early implementation phase since 2024.",
      "Serves as a practical deep dive into Angular 18 application architecture.",
      "Combines a TypeScript frontend with Spring Boot, Java, OpenAPI contracts, and Dockerized workflows.",
      "Explores browser-driven collection flows with Google Chrome and Selenium.",
      "Future organizational structure and external contribution model are still undecided.",
    ],
    links: [
      {
        label: "Crome696 on GitHub",
        href: "https://github.com/Crome696",
        external: true,
      },
    ],
    accent: "steel",
    image: {
      src: mediamultiversePreview,
      alt: "MediaMultiVerse project banner",
      ...projectBannerImageBase,
    },
  },
];

export const projectTimelineItems: ProjectTimelineItem[] = [
  {
    projectSlug: "mediamultiverse",
    period: "Since 2024",
    narrative:
      "Private media archiving platform with Angular, Spring Boot, OpenAPI contracts, and browser flows.",
    tags: ["Angular", "Spring", "Docker"],
  },
  {
    projectSlug: "scriptsdk",
    period: "2015 to 2022",
    narrative:
      "External API design around Stealth-Client automation, later modernized with Java and Spring Boot.",
    tags: [".NET", "Java 17", "API"],
  },
  {
    projectSlug: "client-sdk",
    period: "2015 to 2022",
    narrative:
      "Research into Windows application control through WinAPI, OCR, image validation, and supporting tools.",
    tags: ["WinAPI", "OCR", "Tools"],
  },
  {
    projectSlug: "rebirthuo",
    period: "2014 to 2017",
    narrative:
      "Live shard operations, community responsibility, and custom Ultima Online gameplay systems.",
    tags: ["C#", "ServUO", "Ops"],
  },
  {
    projectSlug: "stealth-client",
    period: "2010 to 2022",
    narrative:
      "Long-running Stealth Client usage, testing, development, and support around Ultima Online scripting.",
    tags: ["Pascal Script", "Python", ".NET"],
  },
];

export const stackItems: StackItem[] = [
  {
    label: "Software Architecture",
    description: "Pragmatic technical decisions that serve teams, products, and long-term maintainability.",
    icon: Braces,
  },
  {
    label: "Software Development",
    description: "Hands-on engineering across code, tooling, maintainable systems, and delivery.",
    icon: Code2,
  },
  {
    label: "Technical Leadership",
    description: "Direction, structure, clarity, and shared ownership for cross-functional teams.",
    icon: Layers3,
  },
  {
    label: "AI Prototyping",
    description: "Using AI to accelerate learning, reduce friction, and turn vague ideas into tangible systems.",
    icon: Zap,
  },
  {
    label: "Automation",
    description: "Workflow modeling, practical tooling, and repeatable operational paths.",
    icon: MonitorCog,
  },
  {
    label: "Product Value",
    description: "Reliable software that creates real value for users and businesses.",
    icon: Globe2,
  },
  {
    label: "Engineering Craft",
    description: "Clean code, clear communication, thoughtful systems, and continuous improvement.",
    icon: Database,
  },
];

export const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Profile", href: "/profile" },
  { label: "Stack", href: "/stack" },
];

export const profileSections: ProfileSection[] = [
  {
    title: "About Me",
    copy:
      "My path into software development started with video games. Curiosity about games, systems, and automation became a fascination with logic, problem-solving, and building tools.",
    icon: Code2,
  },
  {
    title: "Leadership & Engineering Mindset",
    copy:
      "As a Tech Lead, I value clear communication, pragmatic architecture, shared ownership, empathy, and technical decisions that serve both the team and the product.",
    icon: Layers3,
  },
  {
    title: "AI, Automation & Creative Engineering",
    copy:
      "AI is a multiplier for learning, productivity, creativity, and experimentation. I use it to prototype, improve workflows, compensate for blind spots, and make ideas tangible.",
    icon: Sparkles,
  },
];

export const whatIDoItems: ProfileListItem[] = [
  {
    title: "Financial services software",
    copy: "Lead and contribute to reliable, scalable systems in the international financial services domain.",
  },
  {
    title: "Team enablement",
    copy: "Support cross-functional teams with technical direction, structure, and clarity.",
  },
  {
    title: "Architecture and maintainability",
    copy: "Care about long-term product value, understandable systems, and pragmatic technical decisions.",
  },
  {
    title: "AI and automation",
    copy: "Explore AI as a practical tool for learning, prototyping, automation, and creative engineering.",
  },
  {
    title: "Continuous learning",
    copy: "Keep experimenting, adapting to new technologies, and improving the way software is built.",
  },
  {
    title: "Collaboration",
    copy: "Value transparent communication, shared ownership, and grounded decision-making.",
  },
];

export const beyondCodeItems: ProfileListItem[] = [
  {
    title: "Family, friends, and Sam",
    copy: "Spending time with close people and Sam, a grumpy 15-year-old Terrier mix.",
  },
  {
    title: "Games",
    copy: "Playing board games and video games, the original spark behind the software journey.",
  },
  {
    title: "Community and events",
    copy: "Traveling to events, conferences, and meetups while staying connected to local community life.",
  },
  {
    title: "Nature and music",
    copy: "Exploring nature through a hiking association and singing with a local choral society.",
  },
];
