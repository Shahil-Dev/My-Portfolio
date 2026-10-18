"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CORNERS = [
  "top-3 left-3 border-t border-l",
  "top-3 right-3 border-t border-r",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

const SWIPE_THRESHOLD = 60;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function ScreenshotSlider({
  images,
  title,
  accent,
}: {
  images: string[];
  title: string;
  accent: string;
}) {
  const reduce = useReducedMotion();
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const total = images.length;

  const paginate = useCallback(
    (dir: number) => {
      setPage(([i]) => [(i + dir + total) % total, dir]);
    },
    [total],
  );

  const goTo = (next: number) => {
    if (next === index) return;
    setPage([next, next > index ? 1 : -1]);
  };

  if (total === 0) return null;

  return (
    <div
      className="w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") paginate(-1);
        if (e.key === "ArrowRight") paginate(1);
      }}
    >
      {/* Slide frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border bg-card shadow-lg">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial={reduce ? false : "enter"}
            animate="center"
            exit={reduce ? undefined : "exit"}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            drag={total > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset, velocity }) => {
              const power = Math.abs(offset.x) * velocity.x;
              if (offset.x < -SWIPE_THRESHOLD || power < -8000) paginate(1);
              else if (offset.x > SWIPE_THRESHOLD || power > 8000) paginate(-1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[index]}
              alt={`${title} screenshot ${index + 1} of ${total}`}
              fill
              sizes="(min-width: 1152px) 1100px, 100vw"
              priority={index === 0}
              draggable={false}
              className="select-none object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Corner brackets */}
        {CORNERS.map((pos) => (
          <div
            key={pos}
            className={`pointer-events-none absolute z-10 h-6 w-6 ${pos}`}
            style={{ borderColor: `${accent}99` }}
          />
        ))}

        {/* Counter */}
        <span className="pointer-events-none absolute right-4 bottom-4 z-10 rounded-full border bg-background/70 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground backdrop-blur-md">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous screenshot"
              className="absolute top-1/2 left-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/70 text-foreground backdrop-blur-md transition-colors hover:bg-background md:left-4"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next screenshot"
              className="absolute top-1/2 right-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/70 text-foreground backdrop-blur-md transition-colors hover:bg-background md:right-4"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => {
            const active = i === index;
            return (
              <button
                key={src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show screenshot ${i + 1}`}
                aria-current={active}
                className={cn(
                  "relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg border bg-card transition-all sm:w-32",
                  active ? "opacity-100" : "opacity-50 hover:opacity-80",
                )}
                style={active ? { borderColor: accent, boxShadow: `0 0 0 1px ${accent}` } : undefined}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}