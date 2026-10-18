"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import ScreenshotSlider from "@/components/ScreenshotSlider";
import { cn } from "@/lib/utils";
import type { Project } from "@/app/Data/projects";

const tick = (color: string, step: number) =>
  `repeating-linear-gradient(to right, ${color} 0px, ${color} 1px, transparent 1px, transparent ${step}px)`;

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
};

export default function ProjectDetail({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  return (
    <article className="mx-auto w-full max-w-6xl px-4 pt-28 pb-16 sm:px-6 md:pt-32 md:pb-24">
      {/* Back */}
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Projects
      </Link>

      {/* Header */}
      <motion.header {...fade} className="mb-10 md:mb-14">
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
        <h1 className="text-4xl font-light tracking-tight md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
          {project.description}
        </p>
      </motion.header>

      {/* Meta */}
      {(project.role || project.year) && (
        <motion.dl
          {...fade}
          className="mb-10 grid grid-cols-2 gap-6 border-y py-6 md:mb-14 md:grid-cols-3"
        >
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
          <div className="col-span-2 md:col-span-1">
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Stack
            </dt>
            <dd className="mt-1 text-sm">{project.tech.join(" · ")}</dd>
          </div>
        </motion.dl>
      )}

      {/* Screenshots Slider */}
      <motion.div {...fade} className="mb-14 md:mb-20">
        <ScreenshotSlider
          images={project.screenshots}
          title={project.title}
          accent={project.accent}
        />
      </motion.div>

      {/* Overview + Features */}
      <div className="grid gap-12 md:gap-16 lg:grid-cols-12">
        <motion.section {...fade} className="lg:col-span-7">
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Overview
          </h2>
          <div className="space-y-4 text-base font-light leading-relaxed text-foreground/85">
            {project.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.section>

        <motion.section {...fade} className="lg:col-span-5">
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Key Features
          </h2>
          <ul className="space-y-3">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm leading-relaxed">
                <Check
                  className="mt-0.5 size-4 shrink-0"
                  style={{ color: project.accent }}
                />
                <span className="text-foreground/85">{f}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* Links */}
      <motion.div
        {...fade}
        className="mt-14 flex flex-col gap-3 border-t pt-8 sm:flex-row md:mt-20"
      >
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
              "h-11 rounded-full px-6 text-sm",
            )}
          >
            <SiGithub className="size-4" />
            GitHub
          </a>
        )}
      </motion.div>

      {/* Next project */}
      <Link
        href={`/projects/${next.slug}`}
        className="group mt-14 block rounded-2xl border p-6 transition-colors hover:bg-muted/40 md:mt-20"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Next Project
        </span>
        <div className="mt-2 flex items-center justify-between gap-4">
          <span className="text-2xl font-light tracking-tight md:text-3xl">
            {next.title}
          </span>
          <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </Link>
    </article>
  );
}