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
    title: "Al-Iman School Management System",
    description:
      "A full-stack school ERP that digitizes admissions, attendance, results and fees for students, guardians, teachers and administrators, with automated WhatsApp alerts for parents.",
    image:
      "/image/Brown Modern Webdesign Portfolio Tablet Mockup Facebook Post.png",
    tech: ["Next.js", "TypeScript", "Express.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://al-iman-school-frontend.vercel.app/",
    githubUrl: "https://github.com/Shahil-Dev/Al-Iman-School-Frontend",
    accent: "#3b82f6",
    overview: [
      "Al-Iman is an enterprise-style school management platform that replaces paper registers and manual fee tracking with one system for four roles: Super Admin, Teacher, Student and Parent. Each role gets its own portal, protected by strict role-based access control.",
      "The frontend is built with Next.js (App Router), React 19 and TypeScript, using Tailwind CSS, Shadcn UI and Framer Motion, with a centralized Axios instance and interceptors for API calls and Zod for validation. The backend is a modular Express.js service (controller, service and route layers) on PostgreSQL via Prisma ORM, hosted on Neon, secured with JWT, BCrypt and custom RBAC middleware.",
      "A standalone Node.js microservice powered by Baileys handles WhatsApp notifications. It sends an instant alert to parents when a student is marked absent, and delivers login credentials to guardians after admission. The core backend talks to it using a shared secret key, and local Bangladeshi phone numbers are normalized automatically to the international 880 format.",
      "Three engineering problems shaped the design. Student identity was unified by matching records on id, userId and student code with Prisma OR conditions. Attendance date mismatches were fixed with UTC start-of-day and end-of-day range filters. WhatsApp dispatch was moved off the request path with setImmediate, so bulk attendance saves return instantly instead of waiting on the notification API.",
    ],
    features: [
      "Dual-mode authentication: email or phone with password, and student code with PIN for students",
      "Role-based portals for Admin, Teacher, Student and Parent",
      "Automated WhatsApp alerts for absences and admission credentials",
      "Admin tools for admissions, academic years, class allocation, payroll and fee invoicing",
      "Bulk attendance, marks entry and exam routines for teachers",
      "Student and parent dashboards for attendance, results, invoices and notices",
    ],
    screenshots: [
      "/image/al-iman-protfolio.png",
      "/image/Al-Iman-portfolio-img-2.png",
      "/image/Al-Iman-portfolio-img-3.png",
    ],
    role: "Full-stack Developer",
    year: "2026",
  },
  {
    id: "project-two",
    slug: "project-two",
    code: "P-02",
    title: "Foodie",
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