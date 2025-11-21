# Agent Handoff Snapshot

## Project Commands

- Build: `npm run build`
- Develop: `npm run dev`
- Start: `npm run start`
- Install: `npm install`
- Optimize images: `npm run optimize:images`

## Directory Layout

```text
ContinueBuilding/
├── api/                      # Vercel serverless handlers
├── client/                   # Vite React frontend
│   ├── public/               # Static assets
│   └── src/                  # Components, pages, hooks, lib
├── server/                   # Express backend (TypeScript)
├── shared/                   # Shared schemas/types (Zod)
├── scripts/                  # Utility scripts (image optimizer)
├── tests/                    # Playwright SEO regression tests
├── .github/workflows/        # CI pipelines
└── docs/                     # Documentation (this file)
```

## Key Files

- `.github/workflows/quality.yml` – Playwright and Lighthouse CI workflow.
- `api/index.ts` – Express wrapper for Vercel serverless runtime.
- `server/routes.ts` – REST endpoints (`/api/programs`, `/api/contact`, etc.).
- `client/src/components/SEO.tsx` – Centralized SEO meta component.
- `shared/schema.ts` – Shared Zod schemas for validation.
- `scripts/optimize-images.ts` – Sharp-based build-time WebP conversion.

## Environment Variables

| Name           | Purpose                                         | Required | Default                           |
| -------------- | ----------------------------------------------- | -------- | --------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string (Neon recommended) | ✅       | —                                 |
| `SITE_URL`     | Base URL for Playwright/Lighthouse CI           | ⛔       | `https://langtwo.vercel.app/`     |
| `PROGRAM_SLUG` | Program slug for Playwright program test        | ⛔       | `tokyo-youth`                     |

> Store secrets in Vercel project settings and GitHub repository secrets.

## Deployment Checklist

```text
[ ] Set DATABASE_URL in Vercel (production + preview)
[ ] Push branch to GitHub and ensure CI passes
[ ] Verify Playwright and Lighthouse jobs in Actions
[ ] Run npm run optimize:images before production deploy
[ ] Review analytics/monitoring (Sentry optional)
```

## Testing

```bash
npx playwright install --with-deps   # One-time browser install
SITE_URL=https://langtwo.vercel.app/ npm run test:playwright
```

Lighthouse CI runs automatically through GitHub Actions; local snapshot run:

```bash
npx @lhci/cli autorun --collect.url=https://langtwo.vercel.app/
```

## Outstanding Considerations

- Local storage remains in-memory; wire Drizzle ORM once database ready.
- Replace legacy assets with optimized WebP outputs from `images_opt/`.
- Expand structured data coverage for program pages (Course/FAQ schema).
- Monitor CI secrets to avoid flakey Playwright runs.
