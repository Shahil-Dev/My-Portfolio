"use client";

import { ArrowUpRight } from "lucide-react";
import Aurora from "@/components/Aurora";
import SplitText from "@/components/SplitText"; 

export default function Hero() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <main
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 md:px-8"
    >
      {/* Aurora Background */}
      <Aurora
        colorStops={["#3b82f6", "#a855f7", "#10b981"]}
        blend={0.6}
        amplitude={1.2}
        speed={0.8}
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Central Identity / Narrative Block */}
      <div className="relative z-10 my-auto flex max-w-4xl flex-col items-start pt-10 pb-16">
        
        <SplitText
          tag="h1"
          textAlign="left"
          text="Building high-performance, robust web architecture with absolute visual utility."
          className="text-balance text-4xl font-normal tracking-tight  sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          onLetterAnimationComplete={handleAnimationComplete}
        />

        {/* Description */}
        <p className="mt-8 max-w-2xl text-balance text-base leading-relaxed  sm:text-lg md:text-xl font-normal">
          I am a Full-stack Web Engineer specialized in structural execution,
          clean system models, and building highly-optimized web applications
          designed to last.
        </p>

        
        
      </div>
    </main>
  );
}