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

The homepage contains Introduction, Projects, Tech Stack, Experience, and Certifications. The four sidebar links scroll to sections and track the reading position. The avatar returns to the introduction. Existing `/work/`, `/skills/`, `/experience/`, `/credentials/`, `/about/`, and `/contact/` routes remain available with shared content. Project details use `/work/[slug]/`.

- `data/portfolio.ts`: all profile, project, experience, tech-stack, and credential data.
- `components/portfolio-sections.tsx`: content shared by home sections and standalone routes.
- `components/site-shell.tsx`: sidebar, mobile navigation, section tracking, and footer.
- `components/contact-controls.tsx`: clipboard feedback and theme control.
- `lib/theme.ts`: OS preference and local preference persistence.
- `app/globals.css`: solid light/dark tokens and controlled responsive typography.

## Content still to confirm

The supplied avatar is at `public/profile/dazayy.jpeg`; replace it or set `profile.photo` to an empty string for the neutral initials fallback.

The previous résumé is used as a source only and is not part of the public files. Three experience entries and three credentials were transcribed without metrics. Zeta Dev X's current status is intentionally unknown; confirm `current` and any end date, and add newer work history.

The six proposed project records are explicitly provisional. Supply approved descriptions, roles, dates, responsibilities, screenshots, and links before setting `placeholder: false`. Missing actions are hidden. Private projects are excluded from cards and public routes. Screenshot records use `{ src, alt }` and assets belong under `public/projects/`.

Technology entries supported by the résumé or the supplied introduction are shown normally; additional tools needing confirmation are kept in each group's `pending` list. Move these only after verification.

Certification and education dates were verified visually in the résumé: June 2024, March 2023, and August 2022. Credential links and certificate images are not yet supplied.

Keep `profile.resume` empty until an updated, approved PDF is placed in `public/`. The download action stays hidden while empty.

## Appearance and interactions

No gradients, blur, glass effects, or continuous animation. Light mode uses a neutral near-white; dark mode uses Carbon Black. The browser's system theme is used initially, and manual choices persist when local storage is available. Clipboard failure leaves the full email visible with manual-copy guidance. Reduced-motion preferences disable smooth scrolling and transitions.
