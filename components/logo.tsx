"use client";

import React from 'react';
import LogoLoop, { LogoItem } from './LogoLoop'; 

import { 
  SiJavascript, 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiExpress, 
  SiPostgresql, 
  SiMongodb, 
  SiPrisma, 
  SiGithub 
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc'; 

export default function TechnicalWeaponryLoop() {
  
  const techLogos: LogoItem[] = [
    { 
      node: <SiJavascript className="text-[#F7DF1E]" />, 
      title: "JavaScript", 
      ariaLabel: "JavaScript" 
    },
    { 
      node: <SiReact className="text-[#61DAFB]" />, 
      title: "React.js", 
      ariaLabel: "React.js" 
    },
    { 
      node: <SiNextdotjs className="text-zinc-900 dark:text-white" />, 
      title: "Next.js", 
      ariaLabel: "Next.js" 
    },
    { 
      node: <SiTypescript className="text-[#3178C6]" />, 
      title: "TypeScript", 
      ariaLabel: "TypeScript" 
    },
    { 
      node: <SiTailwindcss className="text-[#06B6D4]" />, 
      title: "Tailwind CSS", 
      ariaLabel: "Tailwind CSS" 
    },
    { 
      node: <SiNodedotjs className="text-[#339933]" />, 
      title: "Node.js", 
      ariaLabel: "Node.js" 
    },
    { 
      node: <SiExpress className="text-zinc-700 dark:text-zinc-300" />, 
      title: "Express.js", 
      ariaLabel: "Express.js" 
    },
    { 
      node: <SiPostgresql className="text-[#4169E1]" />, 
      title: "PostgreSQL", 
      ariaLabel: "PostgreSQL" 
    },
    { 
      node: <SiMongodb className="text-[#47A248]" />, 
      title: "MongoDB", 
      ariaLabel: "MongoDB" 
    },
    { 
      node: <SiPrisma className="text-[#2D3748] dark:text-white" />, 
      title: "Prisma ORM", 
      ariaLabel: "Prisma ORM" 
    },
    { 
      node: <SiGithub className="text-zinc-900 dark:text-zinc-200" />, 
      title: "Git & GitHub", 
      ariaLabel: "Git & GitHub" 
    },
    { 
      node: <VscCode className="text-[#5A52FF]" />, 
      title: "Cursor AI", 
      ariaLabel: "Cursor" 
    },
  ];

  return (
    <div className="w-full bg-zinc-50/50 dark:bg-zinc-900/10 py-10 border-y border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6">
      
      </div>

      <LogoLoop
        logos={techLogos}
        speed={50}
        direction="left"
        logoHeight={42} 
        gap={64} 
        pauseOnHover={true} 
        scaleOnHover={true} 
        fadeOut={true} 
        className="w-full"
      />
    </div>
  );
}