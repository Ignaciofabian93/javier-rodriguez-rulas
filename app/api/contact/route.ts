import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  CONTACT_LIMITS,
  EMAIL_RE,
  HONEYPOT_FIELD,
  MIN_FILL_MS,
} from "../../contact-rules";

export const runtime = "nodejs";

/** Hard cap on the raw request body; a maxed-out valid form is ~6 KB. */
const MAX_BODY_BYTES = 20_000;

const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string, now = Date.now()) {
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT.windowMs,
  );
  const limited = recent.length >= RATE_LIMIT.max;
  if (!limited) recent.push(now);
  hits.set(ip, recent);

  // Keep memory bounded: drop IPs whose window has fully expired.
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (now - times[times.length - 1] >= RATE_LIMIT.windowMs)
        hits.delete(key);
    }
  }
  return limited;
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Browsers always send Origin on fetch POSTs; reject other sites' pages. */
function isCrossSite(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  if (isCrossSite(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Request too large." },
        { status: 413 },
      );
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const fields = (body ?? {}) as Record<string, unknown>;
  const { name, email, message, elapsedMs } = fields;

  // Bot traps: a filled honeypot or an instant submission. Answer with a fake
  // success so bots don't learn to adapt; nothing is sent.
  const honeypot = fields[HONEYPOT_FIELD];
  if (
    (typeof honeypot === "string" && honeypot.length > 0) ||
    typeof elapsedMs !== "number" ||
    elapsedMs < MIN_FILL_MS
  ) {
    return NextResponse.json({ ok: true });
  }

  // Validation
  if (
    typeof name !== "string" ||
    name.trim().length < CONTACT_LIMITS.name.min
  ) {
    return NextResponse.json({ error: "Invalid name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  if (
    typeof message !== "string" ||
    message.trim().length < CONTACT_LIMITS.message.min
  ) {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }
  if (
    name.length > CONTACT_LIMITS.name.max ||
    email.length > CONTACT_LIMITS.email.max ||
    message.length > CONTACT_LIMITS.message.max
  ) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  // Use Resend's onboarding sender unless a verified domain sender is provided.
  const from =
    process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error(
      "Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.",
    );
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();
  // The subject is plain text, not HTML: collapse whitespace/newlines instead
  // of HTML-escaping (which would show "&#039;" for an apostrophe).
  const subjectName = cleanName.replace(/\s+/g, " ");

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br/>");

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: cleanEmail,
      subject: `Nuevo mensaje desde mi sitio web — ${subjectName}`,
      text: `Nombre: ${cleanName}\nCorreo: ${cleanEmail}\n\nMensaje:\n${cleanMessage}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1f1b17;">
          <div style="background:#14110f; color:#f7f3ec; padding:20px 24px; border-radius:12px 12px 0 0;">
            <h2 style="margin:0; font-size:18px;">Nuevo mensaje desde mi sitio web</h2>
            <p style="margin:4px 0 0; color:#d4af37; font-size:13px;">Javier Rodríguez Rulas</p>
          </div>
          <div style="border:1px solid #e6ddcd; border-top:none; padding:24px; border-radius:0 0 12px 12px;">
            <p style="margin:0 0 8px;"><strong>Nombre:</strong> ${safeName}</p>
            <p style="margin:0 0 16px;"><strong>Correo:</strong>
              <a href="mailto:${safeEmail}" style="color:#b08d2a;">${safeEmail}</a>
            </p>
            <div style="background:#faf6ef; border-left:3px solid #d4af37; padding:14px 16px; border-radius:6px;">
              ${safeMessage}
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send the message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending email:", err);
    return NextResponse.json(
      { error: "Could not send the message." },
      { status: 500 },
    );
  }
}
