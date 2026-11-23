# Javier Rodríguez Rulas — Portfolio

Professional portfolio / résumé site for **Javier Eduardo Rodríguez Rulas**,
international bartender with a mention in mixology. Built with Next.js 16,
React 19 and Tailwind CSS v4.

## Features

- 🍸 Elegant dark "cocktail bar" theme, fully responsive
- 🌐 **Bilingual** Spanish / English with a language toggle (remembers choice)
- 📄 **Download CV** — a static PDF served from `public/`
- ✉️ **Contact form** powered by [Resend](https://resend.com), with spam
  protection (honeypot field, minimum fill time, per-IP rate limit)
- 🔒 Baseline security headers (see `next.config.ts`)
- ♿ Accessible markup, reduced-motion support, semantic sections
- 🔎 SEO: metadata, Open Graph image, JSON-LD, sitemap, robots, manifest

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev
```

Open http://localhost:3000.

## Contact form setup (Resend)

The contact form sends email through Resend. Configure these in `.env.local`:

| Variable               | Required | Description                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | yes      | API key from https://resend.com/api-keys                                  |
| `CONTACT_TO_EMAIL`     | yes      | Inbox that receives messages (Javier's email)                             |
| `CONTACT_FROM_EMAIL`   | no       | Verified sender. Defaults to Resend's `onboarding@resend.dev` for testing |
| `NEXT_PUBLIC_SITE_URL` | no       | Production URL for canonical/OG links. Defaults to `https://www.barrajavier.com` |

`onboarding@resend.dev` only delivers to the Resend account owner's own
address. For production, verify a domain in Resend and set
`CONTACT_FROM_EMAIL` to an address on that domain. The visitor's email is set
as the **reply-to**, so replying goes straight to them.

`.env.example` is committed — keep only placeholders in it, never real keys.

### Spam protection

`app/api/contact/route.ts` silently drops submissions that fill the hidden
honeypot field or arrive less than 3 s after the form loaded, rejects
cross-site requests, and rate-limits each IP to 5 messages per 10 minutes.
The rate limit is in memory, so on serverless hosts it is per instance; for a
hard global limit add a platform rule (e.g. a Vercel Firewall rate-limit rule
on `/api/contact`). The form limits live in `app/contact-rules.ts` and are
shared by the form and the API.

## Editing content

- **Copy, drinks and experience** — all text lives in `app/i18n/content.ts`
  (Spanish under `es`, English under `en`). Edit both to keep them in sync.
- **Contact details** — the `CONTACT` object in the same file. The LinkedIn
  URL is still a placeholder; once it's real, re-enable the LinkedIn entry in
  `app/components/Contact.tsx`.
- **Photos** — portrait at `public/javier.jpeg`, drink photos in `public/`.
- **CV** — replace `public/Javier_Rodriguez_Rulas.pdf` (the file name is set
  in `app/components/DownloadCvButton.tsx`).

## Project structure

```
app/
  api/contact/route.ts      # Resend contact endpoint (validated, rate-limited)
  components/               # Nav, Hero, About, Skills, Experience, Contact, …
  i18n/
    content.ts              # All bilingual copy + contact info (edit here)
    LanguageProvider.tsx    # Language context + toggle persistence
  contact-rules.ts          # Form limits shared by the form and the API
  layout.tsx                # Fonts, metadata, JSON-LD, providers
  page.tsx                  # Section composition
  opengraph-image.tsx       # Generated social-share image
  globals.css               # Theme tokens & base styles
```

## Deploy

Deploy to [Vercel](https://vercel.com/new). Add the same environment variables
(`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, optionally `CONTACT_FROM_EMAIL` and
`NEXT_PUBLIC_SITE_URL`) in the project settings.

```bash
pnpm build && pnpm start   # production build locally
```
