# Zyron Jade Fausto — Portfolio

Next.js App Router, React, TypeScript, Geist, Motion, and Lucide. No new dependencies were added for the redesign. The site exports to static HTML.

## Develop

```sh
npm install
npm run dev
npm run check
npm run build
```

The static output is in `out/`. The existing Sites identity is in `.openai/hosting.json`.

## Structure

The homepage contains a split portrait introduction, focus strip, planned build-log topics, Projects, Tech Stack, Experience, and Certifications. The four working sidebar links scroll to sections and track the reading position. Resources, Blog, Shop, Ask anything, and Typing test are visibly marked as planned instead of linking to empty pages. The avatar returns to the introduction. Existing `/work/`, `/skills/`, `/experience/`, `/credentials/`, `/about/`, and `/contact/` routes remain available with shared content. Project details use `/work/[slug]/`.

- `data/portfolio.ts`: all profile, project, experience, tech-stack, and credential data.
- `components/portfolio-sections.tsx`: content shared by home sections and standalone routes.
- `components/site-shell.tsx`: sidebar, mobile navigation, section tracking, and footer.
- `components/contact-controls.tsx`: clipboard feedback and theme control.
- `lib/theme.ts`: OS preference and local preference persistence.
- `app/globals.css`: solid light/dark tokens and controlled responsive typography.
- `docs/roadmap.md`: approved backlog, content gates, and privacy requirements for future pages and tools.

## Content still to confirm

The supplied avatar is at `public/profile/dazayy.jpeg`; replace it or set `profile.photo` to an empty string for the neutral initials fallback.

The previous résumé is used as a source only and is not part of the public files. Three experience entries and three credentials were transcribed without metrics. Zeta Dev X's current status is intentionally unknown; confirm `current` and any end date, and add newer work history.

The six proposed project records are explicitly provisional. Supply approved descriptions, roles, dates, responsibilities, screenshots, and links before setting `placeholder: false`. Missing actions are hidden. Private projects are excluded from cards and public routes. Screenshot records use `{ src, alt }` and assets belong under `public/projects/`.

Technology entries supported by the résumé or the supplied introduction are shown normally; additional tools needing confirmation are kept in each group's `pending` list. Move these only after verification.

Certification and education dates were verified visually in the résumé: June 2024, March 2023, and August 2022. Credential links and certificate images are not yet supplied.

Keep `profile.resume` empty until an updated, approved PDF is placed in `public/`. The download action stays hidden while empty.

## Appearance and interactions

No gradients, blur, glass effects, or continuous animation. Light mode uses a neutral near-white; dark mode uses Carbon Black. The browser's system theme is used initially, and manual choices persist when local storage is available. Clipboard failure leaves the full email visible with manual-copy guidance. Lucide icons use short hover and keyboard-focus transforms. Reduced-motion preferences disable smooth scrolling, transitions, and decorative movement.

The theme button uses the supplied Magic UI View Transitions approach, adapted to the existing theme store without extra dependencies. It reveals the new theme in a 450ms circle from the button on desktop and mobile. The component in `components/ui/animated-theme-toggler.tsx` also accepts `variant`, `duration`, and `fromCenter`. Reduced motion and browsers without the API use an immediate switch. Rapid clicks are ignored until the active reveal completes, and interrupted transitions clean up their snapshots.
