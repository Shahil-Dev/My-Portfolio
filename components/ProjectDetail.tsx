"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import ScreenshotSlider from "@/components/ScreenshotSlider";
import { cn } from "@/lib/utils";
import type { Project } from "@/app/Data/projects";

const tick = (color: string, step: number) =>
  `repeating-linear-gradient(to right, ${color} 0px, ${color} 1px, transparent 1px, transparent ${step}px)`;

const CORNERS = [
  "top-3 left-3 border-t border-l",
  "top-3 right-3 border-t border-r",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

const ease = [0.23, 1, 0.32, 1] as const;

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease },
};

function SectionLabel({
  index,
  children,
  accent,
}: {
  index: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span
        className="font-mono text-[10px] uppercase tracking-[0.25em]"
        style={{ color: accent }}
      >
        {index}
      </span>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {children}
      </h2>
      <div className="flex-1">
        <div className="h-2" style={{ backgroundImage: tick(`${accent}40`, 12) }} />
      </div>
    </div>
  );
}

function ActionButtons({ project }: { project: Project }) {
  if (!project.liveUrl && !project.githubUrl) return null;
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 rounded-full px-6 text-sm",
          )}
        >
          Live Demo
          <ArrowUpRight className="size-4" />
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-11 rounded-full bg-background/60 px-6 text-sm backdrop-blur-md",
          )}
        >
          <SiGithub className="size-4" />
          GitHub
        </a>
      )}
    </div>
  );
}

export default function ProjectDetail({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [lead, ...restOverview] = project.overview;

  return (
    <>
      {/* Reading progress */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="fixed top-0 right-0 left-0 z-[60] h-0.5 origin-left"
          style={{ scaleX: progress, backgroundColor: project.accent }}
        />
      )}

      <article className="relative w-full">
        {/* Hero background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px] overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${project.accent}26 0%, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_0%,#000_40%,transparent_100%)]" />
          <span
            className="absolute -top-4 right-4 select-none font-mono text-[9rem] font-light leading-none opacity-[0.06] sm:text-[14rem]"
            style={{ color: project.accent }}
          >
            {project.code.replace("P-", "")}
          </span>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 pt-28 pb-16 sm:px-6 md:pt-32 md:pb-24">
          {/* Back */}
          <Link
            href="/#projects"
            className="group mb-8 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Projects
          </Link>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-10 md:mb-14"
          >
            <div className="mb-5 flex items-center gap-4">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.25em]"
                style={{ color: project.accent }}
              >
                {project.code}
              </span>
              <div className="max-w-xs flex-1">
                <div
                  className="h-2"
                  style={{ backgroundImage: tick(`${project.accent}50`, 12) }}
                />
              </div>
            </div>

            <h1 className="max-w-4xl text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
              {project.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur-md"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ActionButtons project={project} />
            </div>
          </motion.header>

          {/* Screenshots */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="relative mb-16 md:mb-24"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] blur-3xl"
              style={{ background: `${project.accent}14` }}
            />
            <ScreenshotSlider
              images={project.screenshots}
              title={project.title}
              accent={project.accent}
            />
          </motion.div>

          {/* Content + Sidebar */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Main */}
            <div className="space-y-14 md:space-y-20 lg:col-span-8">
              <motion.section {...fade}>
                <SectionLabel index="01" accent={project.accent}>
                  Overview
                </SectionLabel>
                {lead && (
                  <p className="text-xl font-light leading-relaxed tracking-tight md:text-2xl">
                    {lead}
                  </p>
                )}
                {restOverview.length > 0 && (
                  <div className="mt-6 space-y-4 text-base font-light leading-relaxed text-muted-foreground">
                    {restOverview.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}
              </motion.section>

              <motion.section {...fade}>
                <SectionLabel index="02" accent={project.accent}>
                  Key Features
                </SectionLabel>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {project.features.map((f, i) => (
                    <li
                      key={f}
                      className="group relative rounded-2xl border bg-card/50 p-5 transition-colors hover:bg-muted/40"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span
                          className="font-mono text-[10px] tracking-[0.25em]"
                          style={{ color: project.accent }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="flex size-6 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: `${project.accent}1f`,
                            color: project.accent,
                          }}
                        >
                          <Check className="size-3.5" />
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/85">
                        {f}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <motion.div
                {...fade}
                className="relative rounded-2xl border bg-card/50 p-6 shadow-lg backdrop-blur-md lg:sticky lg:top-28"
              >
                {CORNERS.map((pos) => (
                  <div
                    key={pos}
                    className={`pointer-events-none absolute h-5 w-5 ${pos}`}
                    style={{ borderColor: `${project.accent}99` }}
                  />
                ))}

                <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Project Info
                </h2>

                <dl className="space-y-5">
                  {project.role && (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Role
                      </dt>
                      <dd className="mt-1 text-sm">{project.role}</dd>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Year
                      </dt>
                      <dd className="mt-1 text-sm">{project.year}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Tech Stack
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-sm border bg-background/60 px-2 py-1 text-xs text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                {(project.liveUrl || project.githubUrl) && (
                  <div className="mt-6 flex flex-col gap-3 border-t pt-6">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ size: "lg" }),
                          "h-10 w-full rounded-full text-sm",
                        )}
                      >
                        Live Demo
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "lg" }),
                          "h-10 w-full rounded-full text-sm",
                        )}
                      >
                        <SiGithub className="size-4" />
                        View Source
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </aside>
          </div>

          {/* Next project */}
          <motion.div {...fade} className="mt-16 md:mt-24">
            <Link
              href={`/projects/${next.slug}`}
              className="group relative block overflow-hidden rounded-2xl border bg-card/50 p-6 transition-colors hover:bg-muted/40 md:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at 80% 50%, ${next.accent}1f 0%, transparent 70%)`,
                }}
              />
              <div className="relative flex items-center gap-4">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: next.accent }}
                >
                  Next / {next.code}
                </span>
                <div className="flex-1">
                  <div
                    className="h-2"
                    style={{ backgroundImage: tick(`${next.accent}40`, 12) }}
                  />
                </div>
              </div>
              <div className="relative mt-5 flex items-center justify-between gap-4">
                <span className="text-3xl font-light tracking-tight md:text-5xl">
                  {next.title}
                </span>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors group-hover:bg-background md:size-14">
                  <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:size-6" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </article>
    </>
  );
}