import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "404 | Page Not Found",
  description: "The page you are looking for does not exist.",
};

const BLUE = "#3b82f6";

const tick = (color: string, step: number) =>
  `repeating-linear-gradient(to right, ${color} 0px, ${color} 1px, transparent 1px, transparent ${step}px)`;

const CORNERS = [
  "top-3 left-3 border-t border-l",
  "top-3 right-3 border-t border-r",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85svh] flex-1 items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 25% 30%, ${BLUE}22 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 75% 40%, #a855f720 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 50% 95%, #10b9811c 0%, transparent 70%)
          `,
        }}
      />

      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 relative z-10 w-full max-w-2xl duration-700">
        <div className="relative rounded-2xl border bg-card/50 px-6 py-12 text-center shadow-lg backdrop-blur-md sm:px-12 sm:py-16">
          {CORNERS.map((pos) => (
            <div
              key={pos}
              className={`pointer-events-none absolute h-6 w-6 ${pos}`}
              style={{ borderColor: `${BLUE}99` }}
            />
          ))}

          {/* Label */}
          <div className="mx-auto mb-6 flex max-w-xs items-center gap-4">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em] whitespace-nowrap"
              style={{ color: BLUE }}
            >
              Error / 404
            </span>
            <div className="flex-1">
              <div
                className="h-2"
                style={{ backgroundImage: tick(`${BLUE}50`, 12) }}
              />
            </div>
          </div>

          {/* 404 */}
          <h1 className="bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#10b981] bg-clip-text text-8xl leading-none font-light tracking-tight text-transparent sm:text-9xl">
            404
          </h1>

          <h2 className="mt-6 text-2xl font-light tracking-tight sm:text-3xl">
            Page <span className="font-medium">not found</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed font-light text-muted-foreground sm:text-base">
            The page you are looking for does not exist, was moved, or the link
            is incorrect. Let&rsquo;s get you back on track.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-full px-6 text-sm",
              )}
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
            <Link
              href="/#projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full bg-background/60 px-6 text-sm backdrop-blur-md",
              )}
            >
              View Projects
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
