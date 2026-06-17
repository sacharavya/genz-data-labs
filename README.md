# genz technologies

Marketing site for genz technologies, an organic-growth agency (Toronto, Dubai,
Kathmandu). Next.js App Router + Tailwind + Sanity CMS, deployable to Vercel.

- **Stack:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4, shadcn/ui,
  Lenis (smooth scroll), Framer Motion (reveals), Sanity (embedded Studio at
  `/studio`).
- **Editable in the CMS:** case studies, blog posts, and a `siteSettings`
  singleton (availability tag, stats numbers, pricing line items, contact email,
  cities).
- **Stays in code:** brand identity, hero headline, manifesto copy, layout, and
  all motion.

The site renders from a **local seed** out of the box, so `npm run dev` works
with no Sanity project. Connect a project and run `npm run seed` to switch the
content over to the CMS.

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 (Next picks the next free port if 3000 is taken).

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run build` | Production build (type-check + lint + prerender) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run seed` | Import the seed content into Sanity (needs a write token) |
| `npm run seed:ndjson` | Write `sanity/seed.ndjson` for `sanity dataset import` |

---

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. See `.env.example` for the
full list.

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | for CMS | Public. From sanity.io/manage. |
| `NEXT_PUBLIC_SANITY_DATASET` | for CMS | Usually `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | optional | Defaults to `2024-10-01`. |
| `SANITY_API_WRITE_TOKEN` | for seeding | Server only. Never commit. |
| `SANITY_API_READ_TOKEN` | recommended | Server only. A Viewer token makes reads reliable regardless of public-CDN propagation. Set locally and on Vercel. |

Without `NEXT_PUBLIC_SANITY_PROJECT_ID`, the site serves the local seed content
(`content/`). With it set, the site reads from Sanity (run `npm run seed` first,
or the CMS will be empty).

---

## Connecting Sanity

1. Create a free project: run `npx sanity@latest init` in this repo (choose
   "use existing config" if prompted) or create one at
   https://www.sanity.io/manage.
2. Put the project id and dataset in `.env.local`.
3. Create an **Editor** API token (Project > API > Tokens at sanity.io/manage)
   and set `SANITY_API_WRITE_TOKEN` in `.env.local`.
4. Seed the content:

   ```bash
   npm run seed
   ```

   This imports the three case studies (Big Bang Immigration, RP Nails, CRF
   Parfums), the site settings (availability tag, stats, pricing), and the
   starter blog post. Re-running is safe (documents use stable ids and are
   created-or-replaced).

   Alternative without a token:

   ```bash
   npm run seed:ndjson
   npx sanity dataset import sanity/seed.ndjson <dataset> --replace
   ```

The Studio is embedded at **`/studio`** (e.g. http://localhost:3000/studio).

---

## Adding a case study in the Studio

1. Go to `/studio` and log in.
2. **Case studies > Create new.**
3. Fill in the **Overview** group: title, client name, slug (auto from client
   name), sector, location, scope, status, and `order` (lower numbers appear
   first in Selected Work). Toggle **Featured** to show it on the main page, and
   **Has a full case study page** to give it a `/work/<slug>` page (turn this off
   for card-only entries like CRF).
4. Fill in the **Main-page card** group (the condensed version in Selected Work):
   short problem, result line, metric number/unit/label, sub-stats.
5. For a full page, fill in **Hero + stats**, **Body** (problem, approach, build
   list/blueprint, result, client quote), **Images**, and **CTA**.
6. **Images / slots:** upload a hero image and gallery images. Any gallery entry
   without an upload shows a labeled placeholder slot, so a page can go live with
   real proof pending (see RP Nails). Empty optional fields hide rather than
   break the layout.
7. **Publish.** The site revalidates within ~60s (or redeploy to refresh
   immediately).

**Pricing and main-page numbers** live in **Site settings** (a single document):
availability tag, the four stats-band numbers, the pricing line items (name,
description, monthly price, checked-by-default), contact email, and cities. The
pricing prices ship as editable placeholder defaults; confirm them in the Studio.

**Blog posts** live under **Blog posts**: title, slug, excerpt, cover image,
author, published date, and body. They appear at `/blog` and `/blog/<slug>`.

---

## Inviting a teammate (publish access, no code access)

Sanity membership is separate from the codebase, so editors never touch GitHub
or Vercel.

1. Go to https://www.sanity.io/manage and open this project.
2. **Members > Invite members.**
3. Enter their email and assign the **Editor** role (create, edit, and publish
   content; no project or billing administration).
4. They accept the invite, then sign in at your deployed site's `/studio`
   (e.g. `https://your-domain.com/studio`) to start publishing.

Use **Viewer** for read-only access, or **Administrator** only for people who
should manage members and settings.

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, **New Project > Import** the repo. Framework preset: Next.js
   (auto-detected).
3. Add the environment variables under **Project Settings > Environment
   Variables**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (`production`)
   - `NEXT_PUBLIC_SANITY_API_VERSION` (optional)

   The write token is only used locally for seeding; it is not needed on Vercel.
4. **Deploy.** The Studio is served at `https://your-domain.com/studio`.
5. In sanity.io/manage, add your Vercel domain (and `http://localhost:3000`)
   under **API > CORS origins** so the Studio can connect. Enable credentials.

---

## Project structure

```
app/
  (site)/            Marketing site (Lenis smooth scroll + film grain)
    page.tsx           Home
    work/[slug]/       Case study pages
    blog/, blog/[slug] Journal
  studio/[[...tool]]/  Embedded Sanity Studio (no smooth scroll/grain)
  layout.tsx           Root: fonts, dark theme
  globals.css          Design tokens, fonts, grain, motion primitives
components/            Sections, motion helpers, case + contact blocks
content/               Local seed content (the source for `npm run seed`)
lib/                   Types, brand constants, content access layer
sanity/                Client, schemas, Studio structure
scripts/seed.ts        Seed / migration script
design-source/         The original approved static HTML (design reference)
```

### Notes on the port

- The case cards use sticky stacking (`top: 0`) to deliver the stack-and-overlap
  effect described in the brief.
- A pricing checklist section was added after Services (sourced from
  `siteSettings`); it was not in the original HTML.
- Copy contains no em or en dashes anywhere, per the brand rule.
- Smooth scroll, reveals, count-ups, the marquee, and magnetic hover all respect
  `prefers-reduced-motion`.
