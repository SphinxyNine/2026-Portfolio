# Professional portfolio

A multi-page personal portfolio built with Next.js, React, TypeScript, Motion, and Lucide icons. The project uses the App Router and exports to static HTML, so the finished site can be hosted on any static provider.

## Routes

- `/` — concise overview and featured work
- `/work/` — complete project collection
- `/work/[slug]/` — generated case study pages
- `/experience/`
- `/skills/`
- `/credentials/`
- `/about/`
- `/contact/`

## Develop and verify

```sh
npm install
npm run dev
npm run check
npm run build
```

The development site opens at `http://localhost:3000`. The production export is written to `out/`.

## Update portfolio content

All editable identity, project, experience, skill, credential, and About content is in `data/portfolio.ts`.

1. Replace `YOUR NAME`, initials, title, contact details, and social links.
2. Confirm the provisional introduction, skills, and About copy.
3. Replace project placeholders with approved descriptions and screenshots.
4. Replace the experience placeholders with verified work history.
5. Add real credentials, or keep the honest empty state.
6. Set `draft: false` once the content has been reviewed.

Do not store confidential details in the data file. A project with `visibility: 'private'` never receives a public case-study route. A `limited` project can have a case study, but only approved content should be added.

## Project images and links

Place approved images in `public/projects/` and set each project's `image` to a root-relative path such as `/projects/project-name.webp`. Add clear `alt` text. Missing images use a controlled placeholder with a reserved aspect ratio.

External links are rendered only when they are valid HTTP(S) URLs. Email links appear only when the email address passes basic validation. A résumé link should point to a real file under `public/` before it is added to the interface.

## Design system

The interface uses Geist Sans and Geist Mono with a dark three-color foundation: Alabaster Grey (`#d8dbe2`), Charcoal Blue (`#373f51`), and Carbon Black (`#1b1b1e`). Translucent glass surfaces keep text clear while allowing the static layered gradient background to remain visible.

The background is rendered entirely with CSS and does not animate. Page transitions, mobile navigation, content reveals, and project-card feedback honor reduced-motion preferences.

The navigation is persistent on desktop and becomes a compact, keyboard-accessible mobile menu below 900px. Icons come from Lucide and are imported individually so unused icons stay out of the bundle.

To add a profile picture, place the image under `public/` and set `profile.photo` in `data/portfolio.ts` to its root-relative path, such as `/profile.webp`. The initials remain as a fallback while that field is empty.
