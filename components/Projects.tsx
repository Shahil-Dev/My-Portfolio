"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/app/Data/projects";
import Link from "next/link";

const spring = {
  type: "spring",
  stiffness: 140,
  damping: 26,
  mass: 1,
} as const;

const tick = (color: string, step: number) =>
  `repeating-linear-gradient(to right, ${color} 0px, ${color} 1px, transparent 1px, transparent ${step}px)`;

const CORNERS = [
  "top-3 left-3 border-t border-l",
  "top-3 right-3 border-t border-r",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

export default function Projects() {
  const reduce = useReducedMotion();

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-16 sm:px-6 md:py-24 lg:py-32"
    >
      {/* Header */}
      <motion.div
        className="mb-14 text-center md:mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="mb-4 inline-flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Selected Work
          </span>
          <div className="h-px w-8 bg-border" />
        </div>
        <h2 className="text-4xl font-light tracking-tight md:text-6xl lg:text-7xl">
          Featured <span className="font-medium">Projects</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
          A selection of production-ready applications I have designed and
          built.
        </p>
      </motion.div>

      <div className="space-y-20 md:space-y-28 lg:space-y-36">
        {PROJECTS.map((project, idx) => {
          const isEven = idx % 2 === 0;
          const textX = reduce ? 0 : isEven ? -50 : 50;
          const imageX = reduce ? 0 : isEven ? 50 : -50;

          return (
            <article
              key={project.id}
              className="relative grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-16"
            >
              {/* Vignette */}
              <div
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background: `radial-gradient(ellipse at ${isEven ? "80%" : "20%"} 50%, ${project.accent}0d 0%, transparent 70%)`,
                }}
              />

              {/* Screenshot */}
              <motion.div
                className={cn("lg:col-span-7", !isEven && "lg:order-2")}
                initial={{ opacity: 0, x: imageX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...spring, delay: 0.1 }}
              >
                <div className="relative overflow-hidden rounded-2xl border bg-card shadow-lg">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    width={1600}
                    height={1000}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="block h-auto w-full"
                  />
                  {CORNERS.map((pos) => (
                    <div
                      key={pos}
                      className={`pointer-events-none absolute h-6 w-6 ${pos}`}
                      style={{ borderColor: `${project.accent}99` }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                className={cn("lg:col-span-5", !isEven && "lg:order-1")}
                initial={{ opacity: 0, x: textX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...spring, delay: 0.2 }}
              >
                <div className="mb-5 flex items-center gap-4">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: project.accent }}
                  >
                    {project.code}
                  </span>
                  <div className="flex-1">
                    <div
                      className="h-2"
                      style={{
                        backgroundImage: tick(`${project.accent}50`, 12),
                      }}
                    />
                  </div>
                </div>

                <h3 className="mb-4 text-3xl font-light leading-[1.1] tracking-tight md:text-4xl">
                  {project.title}
                </h3>

                <p className="max-w-md text-sm font-light leading-relaxed tracking-wide text-muted-foreground md:text-[15px]">
                  {project.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-sm border bg-card/50 px-3 py-1.5 text-xs font-medium text-foreground/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "h-11 rounded-full px-6 text-sm sm:h-10",
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
                        "h-11 rounded-full px-6 text-sm sm:h-10",
                      )}
                    >
                      <SiGithub className="size-4" />
                      GitHub
                    </a>
                  )}

                  <Link
                    href={`/projects/${project.slug}`}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" }),
                      "h-11 rounded-full px-6 text-sm sm:h-10",
                    )}
                  >
                    View Details
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </motion.div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
