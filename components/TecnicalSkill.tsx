"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
    accentSoft: "rgba(6, 182, 212, 0.05)",
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
    accentSoft: "rgba(168, 85, 247, 0.05)",
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
    accentSoft: "rgba(16, 185, 129, 0.05)",
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

function SkillGauge({
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
  return (
    <div
      role="progressbar"
      aria-label={name}
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      className="relative h-2.5 w-full overflow-hidden text-foreground"
    >
      {/* ট্র্যাক */}
      <div
        className="absolute inset-0 opacity-15"
        style={{ backgroundImage: tickPattern("currentColor", 8) }}
      />
      {/* ফিল */}
      <motion.div
        className="absolute inset-y-0 left-0 w-full origin-left"
        style={{ backgroundImage: tickPattern(`${accent}cc`, 8) }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: percentage / 100 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ ...gentleSpring, delay }}
      />
    </div>
  );
}

function RuledLine({ opacity = 0.3 }: { opacity?: number }) {
  return (
    <div className="h-2 w-full text-foreground" style={{ opacity }}>
      <div
        className="h-full w-full opacity-20"
        style={{ backgroundImage: tickPattern("currentColor", 12) }}
      />
    </div>
  );
}

/* -------------------------------- Component ------------------------------ */

export default function TechnicalSkill() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-16 text-foreground selection:bg-muted sm:px-6 md:py-24 lg:py-32">
      {/* Header */}
      <motion.div
        className="mb-16 md:mb-24 lg:mb-28"
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

        {/* Scale reference */}
        <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 md:mt-12">
          <span className="select-none font-mono text-[9px] tracking-[0.2em] text-muted-foreground">
            0
          </span>
          <div className="flex-1">
            <RuledLine opacity={0.6} />
          </div>
          <span className="select-none font-mono text-[9px] tracking-[0.2em] text-muted-foreground">
            100
          </span>
        </div>
      </motion.div>

      <div className="space-y-24 md:space-y-32 lg:space-y-44">
        {SECTIONS.map((section, idx) => {
          const isEven = idx % 2 === 0;
          const textX = shouldReduceMotion ? 0 : isEven ? -60 : 60;
          const orbitX = shouldReduceMotion ? 0 : isEven ? 60 : -60;

          return (
            <div
              key={section.id}
              className="relative grid items-center gap-10 md:gap-14 lg:grid-cols-12 lg:gap-24"
            >
              {/* Subtle vignette */}
              <div
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background: `radial-gradient(ellipse at ${isEven ? "20%" : "80%"} 50%, ${section.accentSoft} 0%, transparent 70%)`,
                }}
              />

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
                        backgroundImage: tickPattern(`${section.accent}50`, 12),
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

                {/* Skills List */}
                <div className="mt-8 space-y-6 md:mt-10 md:space-y-7 lg:mt-12 lg:space-y-8">
                  {section.skills.map((skill, sIdx) => (
                    <motion.div
                      key={skill.name}
                      className="group"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ ...gentleSpring, delay: 0.2 + sIdx * 0.08 }}
                    >
                      <div className="mb-2 flex items-baseline justify-between gap-4">
                        <span className="text-sm font-light tracking-wide text-foreground/80 transition-colors duration-300 group-hover:text-foreground">
                          {skill.name}
                        </span>
                        <span className="select-none font-mono text-[11px] tabular-nums tracking-wider text-muted-foreground">
                          {skill.percentage}%
                        </span>
                      </div>

                      <SkillGauge
                        name={skill.name}
                        percentage={skill.percentage}
                        accent={section.accent}
                        delay={0.25 + sIdx * 0.1}
                      />
                    </motion.div>
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
          );
        })}
      </div>
    </div>
  );
}