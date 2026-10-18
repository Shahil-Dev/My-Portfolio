"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/app/Data/contact";

const ACCENT = "#3b82f6";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const spring = { type: "spring", stiffness: 140, damping: 26, mass: 1 } as const;

const tick = (color: string, step: number) =>
  `repeating-linear-gradient(to right, ${color} 0px, ${color} 1px, transparent 1px, transparent ${step}px)`;

const CORNERS = [
  "top-3 left-3 border-t border-l",
  "top-3 right-3 border-t border-r",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

const SOCIALS = [
  {
    label: "WhatsApp",
    hint: "Send me a direct message",
    href: `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`,
    icon: FaWhatsapp,
    color: "#25D366",
  },
  {
    label: "LinkedIn",
    hint: "Connect and message me",
    href: CONTACT.linkedinUrl,
    icon: FaLinkedin,
    color: "#0A66C2",
  },
  {
    label: "Facebook",
    hint: "Message me on my page",
    href: CONTACT.facebookUrl,
    icon: FaFacebook,
    color: "#1877F2",
  },
  {
    label: "GitHub",
    hint: "Browse my profile",
    href: CONTACT.githubUrl,
    icon: FaGithub,
    color: "currentColor",
  },
];

type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const inputClass =
  "w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 disabled:opacity-60 aria-[invalid=true]:border-destructive";

export default function Contact() {
  const reduce = useReducedMotion();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field as keyof Errors]) {
        setErrors((er) => ({ ...er, [field]: undefined }));
      }
    };

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters.";
    return e;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

   
    const honeypot = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement)
      ?.checked;
    if (honeypot) return;

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus("error");
      setFeedback(
        "Contact form is not configured yet. Please use email or social links instead.",
      );
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || `New message from ${form.name.trim()} (Portfolio)`,
          message: form.message.trim(),
          from_name: "Portfolio Contact Form",
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFeedback("Thanks! Your message has been sent. I will reply as soon as I can.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setFeedback(
          data?.message ||
            "Something went wrong while sending. Please try again or email me directly.",
        );
      }
    } catch {
      setStatus("error");
      setFeedback(
        "Network error. Please check your connection and try again, or email me directly.",
      );
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
    
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-16 sm:px-6 md:py-24 lg:py-32"
    >
      {/* Header */}
      <motion.div
        className="mb-12 text-center md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="mb-4 inline-flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Get In Touch
          </span>
          <div className="h-px w-8 bg-border" />
        </div>
        <h2 className="text-4xl font-light tracking-tight md:text-6xl lg:text-7xl">
          Let&rsquo;s Work <span className="font-medium">Together</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
          Have a project in mind, a job opportunity, or just want to say hello?
          Send me a message and I will get back to you.
        </p>
      </motion.div>

      <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${ACCENT}0d 0%, transparent 70%)`,
          }}
        />

        {/* Left: info */}
        <motion.div
          className="space-y-6 lg:col-span-5"
          initial={{ opacity: 0, x: reduce ? 0 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...spring, delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: ACCENT }}
            >
              01 / Reach Out
            </span>
            <div className="flex-1">
              <div className="h-2" style={{ backgroundImage: tick(`${ACCENT}50`, 12) }} />
            </div>
          </div>

          {/* Availability */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Available for work
          </div>

          {/* Email card */}
          <div className="flex items-center gap-4 rounded-2xl border bg-card/50 p-4">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-xl border"
              style={{ color: ACCENT }}
            >
              <Mail className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Email
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="block truncate text-sm font-medium transition-colors hover:text-foreground/70"
              >
                {CONTACT.email}
              </a>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {copied ? (
                <Check className="size-4 text-emerald-500" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          </div>

         

          {/* Socials */}
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {SOCIALS.map(({ label, hint, href, icon: Icon, color }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border bg-card/50 p-4 transition-colors hover:bg-muted/50"
                >
                  <Icon className="size-6 shrink-0" style={{ color }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="truncate text-xs text-muted-foreground">{hint}</p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>

          {/* CV */}
          {CONTACT.cvUrl ? (
            <a
              href={CONTACT.cvUrl}
              download
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 w-full rounded-full text-sm",
              )}
            >
              <Download className="size-4" />
              Download CV
            </a>
          ) : (
            <button
              type="button"
              disabled
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 w-full rounded-full text-sm",
              )}
            >
              <Download className="size-4" />
              CV coming soon
            </button>
          )}
        </motion.div>

        {/* Right: form */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: reduce ? 0 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...spring, delay: 0.2 }}
        >
          <div className="relative rounded-2xl border bg-card/50 p-6 shadow-lg backdrop-blur-md sm:p-8 md:p-10">
            {CORNERS.map((pos) => (
              <div
                key={pos}
                className={`pointer-events-none absolute h-6 w-6 ${pos}`}
                style={{ borderColor: `${ACCENT}99` }}
              />
            ))}

            <h3 className="mb-1 text-2xl font-light tracking-tight md:text-3xl">
              Send a message
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Fields marked with * are required.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
            
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={update("name")}
                    disabled={status === "loading"}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={update("email")}
                    disabled={status === "loading"}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is this about? (optional)"
                  value={form.subject}
                  onChange={update("subject")}
                  disabled={status === "loading"}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={update("message")}
                  disabled={status === "loading"}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(inputClass, "resize-y")}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 w-full rounded-full text-sm sm:w-auto sm:px-8",
                )}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="size-4" />
                  </>
                )}
              </button>

          
              <div aria-live="polite" role="status">
                {feedback && (
                  <p
                    className={cn(
                      "rounded-lg border px-4 py-3 text-sm",
                      status === "success"
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-destructive/40 bg-destructive/10 text-destructive",
                    )}
                  >
                    {feedback}
                  </p>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}