"use client";

import React from "react";
import { motion } from "framer-motion";

import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, 
  SiHtml5, SiCss, SiNodedotjs, SiExpress, SiPostgresql, 
  SiMongodb, SiPrisma, SiFirebase, SiJsonwebtokens 
} from "react-icons/si";
import { ShieldCheck } from "lucide-react";
import OrbitTech from "./OrbitCircle";

export default function TechnicalSkill() {
  const sections = [
    {
      id: "frontend",
      title: "Frontend Stack",
      subtitle: "Crafting interfaces with structural pixel perfection.",
      skills: [
        { name: "React.js / Next.js", percentage: 85, step: "01" },
        { name: "TypeScript / JavaScript", percentage: 80, step: "02" },
        { name: "Tailwind CSS", percentage: 90, step: "03" },
        { name: "HTML5 & CSS3", percentage: 95, step: "04" },
      ],
      orbitElements: [
        <div key="1" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#61DAFB]"><SiReact className="w-7 h-7" /></div>,
        <div key="2" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white"><SiNextdotjs className="w-7 h-7" /></div>,
        <div key="3" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#3178C6]"><SiTypescript className="w-7 h-7" /></div>,
        <div key="4" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#F7DF1E]"><SiJavascript className="w-7 h-7" /></div>,
        <div key="5" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#06B6D4]"><SiTailwindcss className="w-7 h-7" /></div>,
        <div key="6" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#E34F26]"><SiHtml5 className="w-7 h-7" /></div>,
        <div key="7" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#1572B6]"><SiCss className="w-7 h-7" /></div>
      ],
      glowColor: "rgba(6, 182, 212, 0.15)",
      neonLine: "rgba(6, 182, 212, 1)",
      lineGradient: "from-cyan-500 to-blue-500",
    },
    {
      id: "backend",
      title: "Backend & Databases",
      subtitle: "Architecting high-availability data layers and server logic.",
      skills: [
        { name: "Node.js / Express.js", percentage: 80, step: "01" },
        { name: "Prisma ORM", percentage: 85, step: "02" },
        { name: "PostgreSQL", percentage: 75, step: "03" },
        { name: "MongoDB", percentage: 80, step: "04" },
      ],
      orbitElements: [
        <div key="1" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#339933]"><SiNodedotjs className="w-7 h-7" /></div>,
        <div key="2" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500"><SiExpress className="w-7 h-7" /></div>,
        <div key="3" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white"><SiPrisma className="w-7 h-7" /></div>,
        <div key="4" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#4169E1]"><SiPostgresql className="w-7 h-7" /></div>,
        <div key="5" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#47A248]"><SiMongodb className="w-7 h-7" /></div>
      ],
      glowColor: "rgba(168, 85, 247, 0.15)",
      neonLine: "rgba(168, 85, 247, 1)",
      lineGradient: "from-purple-500 to-indigo-500",
    },
    {
      id: "auth-security",
      title: "Authentication & Security",
      subtitle: "Shielding application ecosystems and securing state pipelines.",
      skills: [
        { name: "Better Auth Architecture", percentage: 85, step: "01" },
        { name: "JWT Token Security", percentage: 80, step: "02" },
        { name: "Firebase Infrastructure", percentage: 70, step: "03" },
      ],
      orbitElements: [
        <div key="1" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-emerald-500"><ShieldCheck className="w-7 h-7" /></div>,
        <div key="2" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white"><SiJsonwebtokens className="w-7 h-7" /></div>,
        <div key="3" className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[#FFCA28]"><SiFirebase className="w-7 h-7" /></div>
      ],
      glowColor: "rgba(16, 185, 129, 0.15)",
      neonLine: "rgba(16, 185, 129, 1)",
      lineGradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="w-full space-y-24 py-12 max-w-6xl mx-auto px-4">
      {sections.map((section, idx) => (
        <div key={section.id} className="grid items-center gap-12 lg:grid-cols-12 min-h-[480px]">
          
          {/* LEFT COLUMN: Neon Timeline Stepper */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-xs font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                System Compartment 0{idx + 1}
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl mt-1">
                {section.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-md">
                {section.subtitle}
              </p>
            </div>

            <div className="relative pl-10 space-y-8">
              {/* Neon Line Guide */}
              <div 
                className={`absolute left-[17px] top-4 bottom-4 w-[2px] bg-gradient-to-b ${section.lineGradient}`}
                style={{ filter: `drop-shadow(0 0 6px ${section.neonLine})` }}
              />

              {section.skills.map((skill, sIdx) => (
                <motion.div
                  key={skill.name}
                  className="relative flex flex-col space-y-2"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: sIdx * 0.1 }}
                >
                  {/* Step Ring */}
                  <div 
                    className="absolute left-[-31px] mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-zinc-950 border-2 transition-all duration-300"
                    style={{ 
                      borderColor: section.neonLine,
                      boxShadow: `0 0 8px ${section.neonLine}`
                    }}
                  />

                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium tracking-wide text-zinc-800 dark:text-zinc-200">
                      {skill.name}
                    </h4>
                    <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                      {skill.percentage}%
                    </span>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${section.lineGradient}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Dominik's Elliptical Motion Space */}
          <div className="lg:col-span-6 flex items-center justify-center relative overflow-hidden">
            <div 
              className="absolute h-64 w-64 rounded-full blur-[120px] opacity-20 pointer-events-none"
              style={{ backgroundColor: section.neonLine }}
            />
            
            <OrbitTech
              items={section.orbitElements}
              shape="ellipse"
              radiusX={220}
              radiusY={220}
              rotation={-15}
              duration={25}
              itemSize={64}
              showPath={true}
              pathColor={idx === 0 ? "rgba(6, 182, 212, 0.15)" : idx === 1 ? "rgba(168, 85, 247, 0.15)" : "rgba(16, 185, 129, 0.15)"}
              pathWidth={1.5}
              direction={idx % 2 === 0 ? "normal" : "reverse"}
              centerContent={
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-wider">CORE</span>
                </div>
              }
            />
          </div>

        </div>
      ))}
    </div>
  );
}