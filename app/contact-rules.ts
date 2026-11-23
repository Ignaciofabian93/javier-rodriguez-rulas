/**
 * Contact-form rules shared by the client form (app/components/Contact.tsx)
 * and the API route (app/api/contact/route.ts), so both always agree.
 */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 200 },
  message: { min: 5, max: 5000 },
} as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Hidden honeypot input: real visitors never see or fill it, bots do. */
export const HONEYPOT_FIELD = "website";

/** Submissions faster than this after the form mounted are treated as bots. */
export const MIN_FILL_MS = 3000;
