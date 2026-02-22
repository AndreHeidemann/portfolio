# Portfolio UI

A localized Next.js App Router project showcasing André Nicolas Heidemann's Industry 4.0 resume + portfolio. It uses TypeScript, TailwindCSS v4, stores data in `data/profile.json`, and renders via `data/profile.ts` so reviewers can inspect a single source of truth.

## Run & Develop
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`

## Edit Profile Data
All resume, project, and CTA copy lives in [`data/profile.ts`](data/profile.ts). Update the `profile` object to change:
- `basics` (name, summary, emails, social links, last updated date)
- `projects`, `experiences`, `skills`, `education`, `certifications`, `awards`, `testimonials`
- JSON Resume import is intentionally skipped; the strongly typed file keeps edits explicit.

## Add a New Project
1. Append a new object to `profile.projects` with the strict `Project` interface.
2. Provide `impactScore` (0-100) for sorting and `impactBullets` for quick stats.
3. Optional `repoUrl`/`demoUrl` appear automatically.
4. The `/[locale]/projects` page, filters, and `/[locale]/projects/[slug]` detail view auto-render based on the slug.

## Internationalization
- Routes are prefixed with `/en-US` or `/pt-BR`; `middleware.ts` redirects `/` to the last cookie or default locale.
- Copy is loaded from [`/messages/{locale}.json`](messages) at runtime via `I18nProvider`.
- The language toggle rewrites the current route while persisting `NEXT_LOCALE`.
- Add new keys in both locale JSON files and use `useI18n().t(key)` in components.

## Resume Download / Print
- Click **Download PDF** on the hero or `/[locale]/resume` page to open the localized PDF stored in `public/` (`en-US - ...pdf` or `pt-BR - ...pdf`).
- `/[locale]/resume/print?print=1` remains available if you want the printable HTML route.
- Print-specific CSS lives in `app/globals.css` under `@media print`.

## Deploy to Vercel
1. Set env vars in the Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`)
   - `NEXT_PUBLIC_ENABLE_ANALYTICS` (optional, set to `true` to enable Vercel Analytics)
2. Push to `main`; Vercel builds via `npm run build`.
3. Update DNS for your custom domain and redeploy when editing `profile.ts` or translation files.
