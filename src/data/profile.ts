import content from "./content.json";

export const profile = {
  name: "Rohesa Sidiq Permana",
  username: "Rohesa123",
  avatar: "https://avatars.githubusercontent.com/u/94891358?v=4",
  location: "Indonesia",
  role: "Java & Spring Boot Developer",
  tagline:
    "Membangun backend yang kokoh, aman, dan rapi dengan Java & Spring Boot.",
  email: "rohesasidiqpermana05@gmail.com",
  githubUrl: "https://github.com/Rohesa123",
  blogUrl: "https://rohesa.my.id",
  joinedYear: 2021,
  bio: "Backend Developer di PT Digital Amore Kriyanesia (DAK). Saya fokus membangun REST API dan sistem yang aman menggunakan Java & Spring Boot, dengan minat khusus pada keamanan aplikasi (JWT & 2FA). Di luar itu saya juga membangun aplikasi mobile dan web, serta terus belajar teknologi baru.",
} as const;

export const cvUrl = "/cv.pdf";

export const company = {
  name: "PT Digital Amore Kriyanesia",
  short: "DAK",
  role: "Backend Developer",
  url: "https://dak.co.id/",
} as const;

export type SocialType =
  | "github"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "facebook"
  | "email"
  | "blog";

export type Social = { type: SocialType; label: string; url: string };

export type Localized = { id: string; en: string };

export const socials = content.socials as Social[];

export type EmploymentType =
  "fulltime" | "parttime" | "contract" | "internship" | "freelance";
export type Workplace = "onsite" | "hybrid" | "remote";

export type Role = {
  title: string;
  type: EmploymentType;
  workplace?: Workplace;
  start: string;
  end: string | null;
  description: { id: string[]; en: string[] };
  skills?: string[];
};

export type Experience = {
  company: string;
  short?: string;
  url?: string;
  logo?: string;
  location?: string;
  roles: Role[];
};

export const experience = content.experience as Experience[];

export type Certificate = { title: string; issuer: string; url: string };

export const certificates: Certificate[] = content.certificates;

export const WEB3FORMS_ACCESS_KEY = "7bb7e3c8-13c0-4f0d-8182-f70c06e5fd18";

export type LanguageStat = { name: string; count: number; pct: number };

export const staticSnapshot = {
  publicRepos: 24,
  followers: 11,
  following: 20,
  createdYear: 2021,
  name: profile.name,
  avatar: profile.avatar,
  bio: null as string | null,
  location: profile.location as string | null,
  languages: [
    { name: "Java", count: 4, pct: 33 },
    { name: "Dart", count: 3, pct: 25 },
    { name: "PHP", count: 2, pct: 17 },
    { name: "JavaScript", count: 1, pct: 8 },
    { name: "TypeScript", count: 1, pct: 8 },
    { name: "C++", count: 1, pct: 8 },
  ] as LanguageStat[],
};

export const statFields = [
  { key: "publicRepos", labelKey: "repos" },
  { key: "followers", labelKey: "followers" },
  { key: "following", labelKey: "following" },
  { key: "createdYear", labelKey: "since" },
] as const;

export type Tech = { name: string; description: Localized };

export const techStack = content.techStack as Tech[];

export type Project = {
  name: string;
  language: string;
  stars?: number;
  spec?: string;
  description: Localized;
  highlight: Localized;
};

export const featuredProjects: Project[] = content.projects;
