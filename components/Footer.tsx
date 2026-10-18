"use client";

import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "@/app/Data/contact";

const ACCENT = "#3b82f6";

const tick = (color: string, step: number) =>
  `repeating-linear-gradient(to right, ${color} 0px, ${color} 1px, transparent 1px, transparent ${step}px)`;

const NAV = [
  { title: "Home", href: "/#home" },
  { title: "About", href: "/#about" },
  { title: "Skills", href: "/#skills" },
  { title: "Projects", href: "/#projects" },
  { title: "Contact", href: "/#contact" },
];

const SOCIALS = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`,
    icon: FaWhatsapp,
  },
  { label: "LinkedIn", href: CONTACT.linkedinUrl, icon: FaLinkedin },
  { label: "Facebook", href: CONTACT.facebookUrl, icon: FaFacebook },
  { label: "GitHub", href: CONTACT.githubUrl, icon: FaGithub },
  { label: "Email", href: `mailto:${CONTACT.email}`, icon: Mail },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto w-full overflow-hidden border-t">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${ACCENT}0d 0%, transparent 70%)`,
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        {/* Top ruled line */}
        <div className="mb-10 flex items-center gap-4 md:mb-12">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{ color: ACCENT }}
          >
            End / Index
          </span>
          <div className="flex-1">
            <div className="h-2" style={{ backgroundImage: tick(`${ACCENT}50`, 12) }} />
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/#home"
              className="text-2xl font-light tracking-tight transition-opacity hover:opacity-80"
            >
              Yemtehan <span className="font-medium">Shahil</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
              Full-stack web engineer building clean, high-performance web
              applications designed to last.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Available for work
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </h2>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div className="md:col-span-3">
            <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Connect
            </h2>
            <ul className="flex flex-wrap gap-2.5">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex size-10 items-center justify-center rounded-full border bg-card/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground">
            &copy; {year} Yemtehan Shahil. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top
            <span className="flex size-8 items-center justify-center rounded-full border transition-colors group-hover:bg-muted">
              <ArrowUp className="size-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}