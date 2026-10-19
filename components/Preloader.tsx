"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "portfolio-intro-seen";
const BLUE = "#3b82f6";
const PURPLE = "#a855f7";
const GREEN = "#10b981";

const ease = [0.76, 0, 0.24, 1] as const;

const tick = (color: string, step: number) =>
  `repeating-linear-gradient(to right, ${color} 0px, ${color} 1px, transparent 1px, transparent ${step}px)`;

const CORNERS = [
  "top-5 left-5 border-t border-l",
  "top-5 right-5 border-t border-r",
  "bottom-5 left-5 border-b border-l",
  "bottom-5 right-5 border-b border-r",
];

const NAME = "Yemtehan Shahil".split("");

function statusFor(count: number) {
  if (count < 30) return "Initializing";
  if (count < 65) return "Loading assets";
  if (count < 95) return "Compiling interface";
  return "Ready";
}

export default function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* স্টোরেজ বন্ধ থাকলে প্রতিবার দেখাবে */
    }
    if (seen) {
      setVisible(false);
      return;
    }

    const duration = reduce ? 1200 : 4000;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = performance.now();

    const finish = () => {
      document.body.style.overflow = previousOverflow;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* উপেক্ষা */
      }
      setVisible(false);
    };

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // শুরুতে ধীর, মাঝে দ্রুত, শেষে ধীর
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        timer = setTimeout(finish, reduce ? 150 : 700);
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background text-foreground"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: reduce ? 0.3 : 0.9, ease }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 50% 40% at 20% 30%, ${BLUE}26 0%, transparent 70%),
                radial-gradient(ellipse 45% 40% at 80% 35%, ${PURPLE}22 0%, transparent 70%),
                radial-gradient(ellipse 50% 40% at 50% 90%, ${GREEN}1f 0%, transparent 70%)
              `,
            }}
          />

          {/* Grid */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          />

          {/* Screen corners */}
          {CORNERS.map((pos, i) => (
            <motion.div
              key={pos}
              aria-hidden
              className={`pointer-events-none absolute h-8 w-8 ${pos}`}
              style={{ borderColor: `${[BLUE, PURPLE, GREEN, BLUE][i]}99` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            />
          ))}

          {/* Top labels */}
          <div className="absolute inset-x-0 top-5 flex justify-between px-14 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:px-20">
            <span>Portfolio / 2026</span>
            <span className="hidden sm:inline">Spec Sheet v1.0</span>
          </div>

          {/* Center identity */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Monogram */}
            <div className="relative mb-8 flex size-24 items-center justify-center sm:size-28">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 size-full -rotate-90"
                aria-hidden
              >
                <defs>
                  <linearGradient id="preloader-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={BLUE} />
                    <stop offset="50%" stopColor={PURPLE} />
                    <stop offset="100%" stopColor={GREEN} />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#preloader-ring)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: count / 100 }}
                  transition={{ duration: 0.15, ease: "linear" }}
                />
              </svg>
              <motion.span
                className="text-3xl font-light tracking-tight sm:text-4xl"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                Y<span className="font-medium">S</span>
              </motion.span>
            </div>

            {/* Name */}
            <h1
              className="text-3xl font-light tracking-tight sm:text-5xl md:text-6xl"
              aria-label="Yemtehan Shahil"
            >
              {NAME.map((char, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="inline-block"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: reduce ? 0 : 0.35 + i * 0.06,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: reduce ? 0 : 1.4 }}
            >
              Full-stack Web Engineer
            </motion.p>
          </div>

          {/* Bottom progress */}
          <div className="absolute inset-x-0 bottom-5 px-14 sm:px-20">
            <div className="mx-auto max-w-2xl">
              <div className="mb-3 flex items-end justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {statusFor(count)}
                  <span className="ml-1 inline-block w-4 text-left">
                    {count < 100 ? "..." : ""}
                  </span>
                </span>
                <span className="font-mono text-3xl font-light tabular-nums leading-none sm:text-4xl">
                  {String(count).padStart(3, "0")}
                </span>
              </div>

              <div className="relative h-2.5 w-full overflow-hidden">
                {/* ট্র্যাক */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{ backgroundImage: tick("currentColor", 8) }}
                />
                {/* ফিল */}
                <div
                  className="absolute inset-y-0 left-0 w-full origin-left"
                  style={{
                    transform: `scaleX(${count / 100})`,
                    backgroundImage: `${tick("#ffffffcc", 8)}`,
                    WebkitMaskImage: tick("#000", 8),
                    maskImage: tick("#000", 8),
                    backgroundColor: "transparent",
                  }}
                >
                  <div
                    className="size-full"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${BLUE}, ${PURPLE}, ${GREEN})`,
                      WebkitMaskImage: tick("#000", 8),
                      maskImage: tick("#000", 8),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}