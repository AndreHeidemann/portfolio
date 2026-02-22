# Repository Guidelines

## Project Structure & Module Organization
The App Router lives in `app/`; `app/(site)` contains the main routes (`page.tsx`, `contact`, `projects`, `resume`) while `layout.tsx` wires global providers and `globals.css`. Shared UI lives in `components/`—feature sections such as `hero.tsx` sit at the root, and low-level primitives stay in `components/ui` (generated via Shadcn, imported as `@/components/ui`). Client hooks go in `hooks/` (`use-mobile`, `use-toast`), and `lib/` stores helpers (`lib/utils.ts`, `cn`) plus content sources (`lib/data.ts`, `lib/i18n.tsx`). Static assets remain in `public/`, with occasional override styles in `styles/`.

## Build, Test, and Development Commands
- `npm run dev`: Next.js dev server on :3000 with hot reload.
- `npm run build`: Type-check + create the production bundle; run before every PR.
- `npm run start`: Serve the optimized build locally for Vercel parity.
- `npm run lint`: ESLint + Next rules; treat a clean run as the minimum automated test.

## Coding Style & Naming Conventions
Use strict TypeScript (`tsconfig.json`) and the `@/*` path alias. Components export PascalCase identifiers, hooks start with `use`, and files remain kebab-case (`project-card.tsx`). Default to server components; add `'use client'` only where interactivity or browser APIs demand it. Tailwind drives layout and theming—compose conditional classes through `cn` and follow the prevailing two-space indentation.

## Testing Guidelines
Automated tests are not yet configured, so document manual QA from `npm run dev` and `npm run start`, covering multiple viewports and both themes. When adding tests, favor React Testing Library + Vitest or Jest, colocate files as `Component.test.tsx`, and expose an `npm test` script for reuse. Always verify the language toggle, theme toggle, and routable project pages because they share providers.

## Commit & Pull Request Guidelines
Write concise, imperative commit subjects (example: `feat: add CTA metrics block`) and keep diffs focused. PR descriptions must include summary, linked issue, screenshots or GIFs for UI changes (light/dark + mobile/desktop), and a checklist of commands run (`npm run lint`, `npm run build`). Call out edits to shared content (`lib/data.ts`, translations, `public/` assets) so reviewers can double-check copy.

## Localization, Theming & Content Tips
Update copy in `lib/data.ts` and translation keys in `lib/i18n.tsx`; keep keys stable and avoid hard-coded strings inside components. Color tokens and radii live in `app/globals.css`, so adjust CSS variables there rather than inline Tailwind hex values to preserve light/dark parity. When introducing new sections, reuse the providers defined in `app/layout.tsx` so the language and theme toggles keep working.
