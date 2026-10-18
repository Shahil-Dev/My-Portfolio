export interface Project {
  id: string;
  slug: string;
  code: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  accent: string;

  overview: string[];
  features: string[];
  screenshots: string[];
  role?: string;
  year?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "project-one",
    slug: "project-one",
    code: "P-01",
    title: "Project One",
    description:
      "A full-stack web application with authentication, role-based dashboards and a clean REST API.",
    image:
      "/image/Beige Minimal Website Launch Laptop Mockup Instagram Post.png",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    liveUrl: "https://assignment-4-frontend-b6q4.vercel.app/",
    githubUrl: "https://github.com/Shahil-Dev/Assignment-4-Frontend-",
    accent: "#3b82f6",
    overview: [
      "Write here what problem this project solves and who it is for.",
      "Write here how you built it, the architecture and key decisions.",
    ],
    features: [
      "Secure authentication and role-based access",
      "Responsive dashboard with real-time data",
      "REST API with validation and error handling",
    ],
    screenshots: [
      "/image/foodie-ss-1.png",
      "/image/foodie-ss-2.png",
      "/image/Foodie-ss-3.png",
    ],
    role: "Full-stack Developer",
    year: "2026",
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);
