"use client";

import { useState, type FormEvent } from "react";
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageProvider";
import { CONTACT } from "../i18n/content";
import { InstagramIcon } from "./BrandIcons";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import Link from "next/link";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const validate = (data: { name: string; email: string; message: string }) => {
    const next: { [k: string]: string } = {};
    if (data.name.trim().length < 2) next.name = t.contact.required;
    if (!EMAIL_RE.test(data.email.trim())) next.email = t.contact.invalidEmail;
    if (data.message.trim().length < 5) next.message = t.contact.required;
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    const validation = validate(data);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full rounded-xl border bg-night/60 px-4 py-3 text-sm text-cream placeholder:text-faint transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40";

  const socials = [
    { href: CONTACT.instagram, label: "Instagram", icon: InstagramIcon },
    // { href: CONTACT.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-gold/10 bg-charcoal/40 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker={t.contact.kicker} title={t.contact.title} />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: details */}
          <Reveal className="space-y-8">
            <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {t.contact.intro}
            </p>

            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-4 text-cream"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-surface text-gold transition-colors group-hover:bg-gold group-hover:text-night">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm transition-colors group-hover:text-gold">
                    {CONTACT.email}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 text-cream">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-surface text-gold">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm">{CONTACT.city}</span>
              </li>
            </ul>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-faint">
                {t.contact.orReach}
              </p>
              <div className="flex gap-3">
                {socials.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-surface text-muted transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={120}>
            {status === "success" ? (
              <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-2xl border border-gold/25 bg-surface p-10 text-center">
                <CheckCircle2 className="h-14 w-14 text-gold" aria-hidden />
                <p className="mt-4 max-w-sm text-lg text-cream">
                  {t.contact.success}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-medium text-gold underline-offset-4 hover:underline"
                >
                  {t.nav.contact}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-gold/15 bg-surface p-6 sm:p-8"
              >
                <div className="grid gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-cream"
                    >
                      {t.contact.nameLabel}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t.contact.namePlaceholder}
                      className={`${fieldClass} ${
                        errors.name ? "border-red-500/60" : "border-gold/20"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-cream"
                    >
                      {t.contact.emailLabel}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t.contact.emailPlaceholder}
                      className={`${fieldClass} ${
                        errors.email ? "border-red-500/60" : "border-gold/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-cream"
                    >
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder={t.contact.messagePlaceholder}
                      className={`${fieldClass} resize-y ${
                        errors.message ? "border-red-500/60" : "border-gold/20"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      <AlertCircle
                        className="mt-0.5 h-4 w-4 shrink-0"
                        aria-hidden
                      />
                      <span>{t.contact.error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night transition-all duration-300 hover:bg-gold-soft hover:shadow-(--shadow-glow) disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        {t.contact.sending}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden />
                        {t.contact.submit}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
