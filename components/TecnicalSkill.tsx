"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiFirebase,
  SiJsonwebtokens,
} from "react-icons/si";
import {
  ShieldCheck,
  Code2,
  Database,
  Lock,
  Cloud,
  GitBranch,
} from "lucide-react";
import OrbitTech from "./OrbitCircle";

/* ----------------------------- Types & Data ----------------------------- */

type IconComponent = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
}>;

interface OrbitEntry {
  icon: IconComponent;
  color: string;
  label: string;
}

interface Skill {
  name: string;
  percentage: number;
}

interface SkillSection {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  skills: Skill[];
  orbitItems: OrbitEntry[];
  accent: string;
  accentSoft: string;
}

const SECTIONS: SkillSection[] = [
  {
    id: "frontend",
    code: "01",
    title: "Frontend Development",
    subtitle:
      "Architecting component systems with precision—crafting semantic interfaces that balance aesthetic clarity with technical rigor.",
    skills: [
      { name: "React / Next.js", percentage: 88 },
      { name: "TypeScript", percentage: 84 },
      { name: "Tailwind CSS", percentage: 92 },
      { name: "Semantic HTML5 & Modern CSS", percentage: 95 },
    ],
    orbitItems: [
      { icon: SiReact, color: "#61DAFB", label: "React" },
      { icon: SiNextdotjs, color: "#FFFFFF", label: "Next.js" },
      { icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
      { icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
      { icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind" },
      { icon: Code2, color: "#A78BFA", label: "Code" },
    ],
    accent: "#06b6d4",
    accentSoft: "rgba(6, 182, 212, 0.08)",
  },
  {
    id: "backend",
    code: "02",
    title: "Backend & Data Systems",
    subtitle:
      "Designing decoupled service architectures and relational schemas that scale with operational integrity.",
    skills: [
      { name: "Node.js / Express", percentage: 82 },
      { name: "Prisma ORM", percentage: 86 },
      { name: "PostgreSQL Optimization", percentage: 78 },
      { name: "MongoDB Schema Design", percentage: 80 },
    ],
    orbitItems: [
      { icon: SiNodedotjs, color: "#339933", label: "Node.js" },
      { icon: SiExpress, color: "#FFFFFF", label: "Express" },
      { icon: SiPrisma, color: "#FFFFFF", label: "Prisma" },
      { icon: SiPostgresql, color: "#4169E1", label: "PostgreSQL" },
      { icon: SiMongodb, color: "#47A248", label: "MongoDB" },
      { icon: Database, color: "#8B5CF6", label: "Data" },
    ],
    accent: "#a855f7",
    accentSoft: "rgba(168, 85, 247, 0.08)",
  },
  {
    id: "auth",
    code: "03",
    title: "Security & Authentication",
    subtitle:
      "Implementing robust identity protocols and defensive layers that protect user data at every boundary.",
    skills: [
      { name: "Cryptographic Identity Protocols", percentage: 87 },
      { name: "JWT & Token Architecture", percentage: 83 },
      { name: "Better Auth", percentage: 76 },
      { name: "Firebase Auth", percentage: 88 },
    ],
    orbitItems: [
      { icon: ShieldCheck, color: "#34D399", label: "Security" },
      { icon: SiJsonwebtokens, color: "#FFFFFF", label: "JWT" },
      { icon: SiFirebase, color: "#FFCA28", label: "Firebase" },
      { icon: Lock, color: "#F472B6", label: "Auth" },
      { icon: Cloud, color: "#60A5FA", label: "Cloud" },
      { icon: GitBranch, color: "#F59E0B", label: "Git" },
    ],
    accent: "#10b981",
    accentSoft: "rgba(16, 185, 129, 0.08)",
  },
];

/* ------------------------------- Constants ------------------------------ */

const spring = { type: "spring", stiffness: 140, damping: 26, mass: 1 } as const;
const gentleSpring = {
  type: "spring",
  stiffness: 90,
  damping: 30,
  mass: 1,
} as const;

const tickPattern = (color: string, step: number) =>
  `repeating-linear-gradient(to right, ${color} 0px, ${color} 1px, transparent 1px, transparent ${step}px)`;

const RING_RADIUS = 34;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function levelFor(percentage: number) {
  if (percentage >= 90) return "Expert";
  if (percentage >= 80) return "Advanced";
  if (percentage >= 70) return "Proficient";
  return "Intermediate";
}

/* ---------------------------- Small components --------------------------- */

function OrbitItem({ icon: Icon, color, label }: OrbitEntry) {
  return (
    <div className="group relative flex h-full w-full flex-col items-center justify-center">
      {/* চিপ ইচ্ছাকৃতভাবে ডার্ক রাখা হয়েছে, যাতে সাদা আইকন লাইট মোডেও দেখা যায় */}
      <motion.div
        className="relative rounded-3xl border bg-zinc-950/90 p-6 shadow-lg"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
        whileHover={{
          y: -6,
          borderColor: "rgba(255,255,255,0.18)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.35)",
          transition: { type: "spring", stiffness: 400, damping: 25 },
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent" />
        <Icon
          className="h-16 w-16 transition-transform duration-300 group-hover:scale-110"
          style={{ color }}
        />
      </motion.div>
      <span className="mt-3 select-none font-mono text-[17px] tracking-[0.12em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
        {label}
      </span>
    </div>
  );
}

function SkillCard({
  name,
  percentage,
  accent,
  delay,
}: {
  name: string;
  percentage: number;
  accent: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  const value = useMotionValue(0);
  const dashOffset = useTransform(
    value,
    (v) => RING_CIRCUMFERENCE * (1 - v / 100),
  );
  const display = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      value.set(percentage);
      return;
    }
    const controls = animate(value, percentage, {
      duration: 1.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, reduce, percentage, delay, value]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center rounded-2xl border bg-card/50 px-3 py-5 text-center backdrop-blur-sm transition-colors hover:bg-muted/40 sm:px-4"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...gentleSpring, delay: delay * 0.6 }}
      whileHover={{ y: -3 }}
    >
      <div
        role="progressbar"
        aria-label={name}
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative size-20 sm:size-24"
      >
        <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden>
          <circle
            cx="40"
            cy="40"
            r={RING_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="4"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={RING_RADIUS}
            fill="none"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            style={{
              strokeDashoffset: dashOffset,
              filter: `drop-shadow(0 0 6px ${accent}88)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-lg font-light tabular-nums sm:text-xl">
            <motion.span>{display}</motion.span>
            <span className="ml-0.5 text-[10px] text-muted-foreground">%</span>
          </span>
        </div>
      </div>

      <p className="mt-3 min-h-10 text-sm leading-snug font-light tracking-wide text-foreground/90">
        {name}
      </p>
      <span
        className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em]"
        style={{ color: accent }}
      >
        {levelFor(percentage)}
      </span>
    </motion.div>
  );
}

/* -------------------------------- Component ------------------------------ */

export default function TechnicalSkill() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative isolate mx-auto w-full max-w-7xl overflow-hidden py-16 text-foreground selection:bg-muted md:py-24 lg:py-32">
      {/* Header */}
      <motion.div
        className="mx-auto mb-16 max-w-6xl px-4 sm:px-6 md:mb-24 lg:mb-28"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Spec Sheet
            </span>
            <div className="h-px w-8 bg-border" />
          </div>
          <h2 className="text-4xl font-light tracking-tight md:text-6xl lg:text-7xl">
            Technical <span className="font-medium">Skills</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
            Full-stack engineering with a focus on clean architecture, security,
            and performance
          </p>
        </div>
      </motion.div>

      <div className="space-y-24 md:space-y-32 lg:space-y-44">
        {SECTIONS.map((section, idx) => {
          const isEven = idx % 2 === 0;
          const textX = shouldReduceMotion ? 0 : isEven ? -60 : 60;
          const orbitX = shouldReduceMotion ? 0 : isEven ? 60 : -60;

          return (
            <div key={section.id} className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -inset-y-12 z-0"
                style={{
                  background: `radial-gradient(ellipse 60% 55% at ${isEven ? "25%" : "75%"} 50%, ${section.accentSoft} 0%, transparent 100%)`,
                }}
              />

              {/* Content: max-w-6xl */}
              <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:gap-14 lg:grid-cols-12 lg:gap-24">
                {/* Text Content */}
                <motion.div
                  className={`lg:col-span-5 ${!isEven ? "lg:order-2" : ""}`}
                  initial={{ opacity: 0, x: textX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ ...spring, delay: 0.15 }}
                >
                  <div className="mb-5 flex items-center gap-4 md:mb-6">
                    <span
                      className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em]"
                      style={{ color: section.accent }}
                    >
                      {section.code}
                    </span>
                    <div className="flex-1">
                      <div
                        className="h-2"
                        style={{
                          backgroundImage: tickPattern(
                            `${section.accent}50`,
                            12,
                          ),
                        }}
                      />
                    </div>
                  </div>

                  <h3 className="mb-4 text-3xl font-light leading-[1.1] tracking-tight md:mb-5 md:text-4xl lg:text-5xl">
                    {section.title}
                  </h3>

                  <p className="max-w-md text-sm font-light leading-relaxed tracking-wide text-muted-foreground md:text-[15px]">
                    {section.subtitle}
                  </p>

                  {/* Skill cards */}
                  <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:mt-10 lg:mt-12">
                    {section.skills.map((skill, sIdx) => (
                      <SkillCard
                        key={skill.name}
                        name={skill.name}
                        percentage={skill.percentage}
                        accent={section.accent}
                        delay={0.2 + sIdx * 0.1}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Orbit Tech */}
                <motion.div
                  className={`relative flex justify-center lg:col-span-7 ${!isEven ? "lg:order-1" : ""}`}
                  initial={{ opacity: 0, x: orbitX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ ...spring, delay: 0.25 }}
                >
                  <div className="relative aspect-square w-full max-w-xl lg:max-w-none">
                    {/* Schematic corner brackets */}
                    {[
                      "top-3 left-3 border-t border-l",
                      "top-3 right-3 border-t border-r",
                      "bottom-3 left-3 border-b border-l",
                      "bottom-3 right-3 border-b border-r",
                    ].map((pos, i) => (
                      <motion.div
                        key={pos}
                        className={`pointer-events-none absolute h-6 w-6 ${pos}`}
                        style={{
                          borderColor: `${section.accent}60`,
                          borderWidth: "1px",
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ ...gentleSpring, delay: 0.4 + i * 0.05 }}
                      />
                    ))}

                    <OrbitTech
                      items={section.orbitItems.map((item) => (
                        <OrbitItem key={item.label} {...item} />
                      ))}
                      shape="circle"
                      radius={350}
                      rotation={isEven ? -6 : 6}
                      duration={48}
                      itemSize={200}
                      direction={isEven ? "normal" : "reverse"}
                      pathColor={section.accent + "15"}
                      pathWidth={1.5}
                      centerContent={
                        <motion.div
                          className="flex h-16 w-16 items-center justify-center rounded-full border bg-card/90 shadow-lg transition-all duration-500 sm:h-20 sm:w-20"
                          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
                          whileHover={{
                            scale: 1.08,
                            borderColor: `${section.accent}60`,
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            },
                          }}
                        >
                          <span
                            className="select-none font-mono text-[8px] tracking-[0.2em] sm:text-[9px]"
                            style={{ color: section.accent }}
                          >
                            {section.id.toUpperCase()}
                          </span>
                        </motion.div>
                      }
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}