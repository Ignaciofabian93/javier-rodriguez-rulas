# Javier Rodríguez Rulas — Portfolio

Professional portfolio / résumé site for **Javier Eduardo Rodríguez Rulas**,
international bartender with a mention in mixology. Built with Next.js 16,
React 19 and Tailwind CSS v4.

## Features

- 🍸 Elegant dark "cocktail bar" theme, fully responsive
- 🌐 **Bilingual** Spanish / English with a language toggle (remembers choice)
- 📄 **Download CV** as a PDF, generated on the fly in the selected language
- ✉️ **Contact form** powered by [Resend](https://resend.com)
- ♿ Accessible markup, reduced-motion support, semantic sections

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev
```

Open http://localhost:3000.

## Contact form setup (Resend)

The contact form sends email through Resend. Configure these in `.env.local`:

| Variable             | Required | Description                                              |
| -------------------- | -------- | -------------------------------------------------------- |
| `RESEND_API_KEY`     | yes      | API key from https://resend.com/api-keys                 |
| `CONTACT_TO_EMAIL`   | yes      | Inbox that receives messages (Javier's email)            |
| `CONTACT_FROM_EMAIL` | no       | Verified sender. Defaults to Resend's `onboarding@resend.dev` for testing |

For production, verify a domain in Resend and set `CONTACT_FROM_EMAIL` to an
address on that domain. The visitor's email is set as the **reply-to**, so
replying goes straight to them.

## ✏️ Things to personalize (placeholders)

Search for `TODO` — everything that needs Javier's real data is marked:

1. **Contact details** — `app/i18n/content.ts` → the `CONTACT` object
   (email, phone, city, Instagram, LinkedIn, WhatsApp).
2. **Photo** — drop a portrait at `public/javier.jpg`, then follow the comment
   in `app/components/Hero.tsx` to swap the "JR" placeholder for a real image.
3. **Copy / drinks** — all text lives in `app/i18n/content.ts` (Spanish under
   `es`, English under `en`). Edit there to keep both languages in sync.

## Project structure

```
app/
  api/contact/route.ts      # Resend contact endpoint (server, validated)
  components/               # Nav, Hero, About, Skills, Experience, Contact, …
  i18n/
    content.ts              # All bilingual copy + contact info (edit here)
    LanguageProvider.tsx    # Language context + toggle persistence
  layout.tsx                # Fonts, metadata, providers
  page.tsx                  # Section composition
  globals.css               # Theme tokens & base styles
```

## Deploy

Deploy to [Vercel](https://vercel.com/new). Add the same environment variables
(`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, optionally `CONTACT_FROM_EMAIL`) in the
project settings.

```bash
pnpm build && pnpm start   # production build locally
```
