"use client";

import React from "react";
import { Terminal, Users, GraduationCap, Code2, Layers } from "lucide-react";
import SplitText from "@/components/SplitText";

export default function About() {
  const coreSkills = [
    "Next.js",
    "React.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Prisma",
    "PostgreSQL",
    "MongoDB",
    "Better Auth",
    "Tailwind CSS",
  ];

  return (
    <section id="about" className="w-full px-4 py-16 md:px-8 max-w-7xl mx-auto">
      <div className="grid min-h-[85vh] lg:grid-cols-2 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="flex flex-col justify-between p-8 md:p-12 lg:p-16 gap-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              <span>About The Engineer</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              I am{" "}
              <span className="text-zinc-950 dark:text-white underline decoration-blue-500 decoration-2 underline-offset-4">
                Yemtehan Shahil
              </span>
            </h2>

            <div className="pt-2">
              <SplitText
                tag="h3"
                textAlign="left"
                text="Architecting robust backend environments with an analytical business mindset."
                className="text-balance text-xl font-normal tracking-tight text-zinc-800 dark:text-zinc-300 sm:text-2xl leading-relaxed"
                delay={30}
                duration={1}
                splitType="words"
              />
            </div>
          </div>

          <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-base md:text-md leading-relaxed font-normal">
  <p>
    My path into <span className="font-semibold text-zinc-900 dark:text-zinc-100">web development</span> is shaped by logic and system building. 
    Coming from a <span className="font-semibold text-zinc-900 dark:text-zinc-100">Business Administration (BBA) background</span>, 
    I built my core skills through <span className="font-semibold text-zinc-900 dark:text-zinc-100">Programming Hero</span>. 
    Having spent a significant amount of time focusing on this craft, I have developed a deep, long-term commitment to the web ecosystem.
  </p>

  <p>
    While I prioritize building practical, production-ready applications over competitive problem-solving, 
    my true strength lies in <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-blue-500">structuring clean backend operations and databases</span>. 
    My development approach revolves around writing <span className="font-semibold text-zinc-900 dark:text-zinc-100">clean code</span>, 
    improving <span className="font-semibold text-zinc-900 dark:text-zinc-100">application performance</span>, and ensuring a seamless <span className="font-semibold text-zinc-900 dark:text-zinc-100">user experience</span>.
  </p>

  <p>
    Beyond writing code, I focus heavily on collaboration and community dynamics. I have successfully 
    <span className="font-semibold text-zinc-900 dark:text-zinc-100"> led and managed community organizations</span>, 
    which helped me sharpen my communication, take responsibility, and bring teamwork and real-world empathy into my development projects.
  </p>
</div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
              <Layers className="h-3.5 w-3.5" /> Core Weaponry
            </h4>
            <div className="flex flex-wrap gap-2">
              {coreSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-xs font-medium rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-800 dark:text-zinc-300 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-[40vh] lg:min-h-full overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-50 dark:from-zinc-950/80 via-transparent to-transparent z-10 pointer-events-none" />
          <img
            src="/image/my profile.jpeg"
            alt="Yemtehan Shahil - Profile"
            className="absolute inset-0 h-full w-full object-cover object-center "
          />
        </div>
      </div>
    </section>
  );
}
