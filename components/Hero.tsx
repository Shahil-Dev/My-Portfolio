"use client";

import { ArrowUpRight } from "lucide-react";
import Aurora from "@/components/Aurora";
import SplitText from "@/components/SplitText";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[60svh] w-full flex-col items-center justify-center overflow-hidden bg-background px-4 pt-28 pb-16 sm:px-6 md:min-h-[70svh] md:px-8 md:pt-32 md:pb-20 lg:min-h-screen lg:py-24"
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
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-start lg:my-auto lg:pt-10 lg:pb-16">
        {/* Status badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md md:mb-6">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          Available for work
        </div>

        <SplitText
          tag="h1"
          textAlign="left"
          text="Building high-performance, robust web architecture with absolute visual utility."
          className="text-balance text-3xl font-normal leading-[1.15] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.1]"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
        />

        {/* Description */}
        <p className="mt-5 max-w-2xl text-balance text-base font-normal leading-relaxed sm:text-lg md:mt-6 lg:mt-8 lg:text-xl">
          I am a Full-stack Web Engineer specialized in structural execution,
          clean system models, and building highly-optimized web applications
          designed to last.
        </p>

       
      </div>
    </section>
  );
}