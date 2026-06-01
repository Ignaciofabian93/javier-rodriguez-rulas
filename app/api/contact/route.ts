import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;

  // Validation
  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Invalid name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 5) {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  // Use Resend's onboarding sender unless a verified domain sender is provided.
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error(
      "Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.",
    );
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email.trim(),
      subject: `Nuevo mensaje del portafolio — ${safeName}`,
      text: `Nombre: ${name.trim()}\nCorreo: ${email.trim()}\n\nMensaje:\n${message.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1f1b17;">
          <div style="background:#14110f; color:#f7f3ec; padding:20px 24px; border-radius:12px 12px 0 0;">
            <h2 style="margin:0; font-size:18px;">Nuevo mensaje del portafolio</h2>
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
