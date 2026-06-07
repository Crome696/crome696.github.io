# Crome696 Gitfolio

A polished multi-page GitHub Pages portfolio for the public identity `Crome696`.
It presents selected projects, a professional profile, and stack focus areas through a Vite, React, and TypeScript single-page app.

The production site is configured for the GitHub Pages user-site root at `https://crome696.github.io/`.

## Features

- Responsive portfolio shell with home, projects, project detail, profile, and stack routes.
- Centralized profile and project content in `src/data/content.ts`.
- Reusable project image rendering through `ProjectImageFrame`.
- Self-hosted Inter and JetBrains Mono fonts through Fontsource.
- GitHub Pages SPA redirect support through `public/404.html`.
- GitHub Pages Actions deployment from `master`.

## Stack

- Vite 8
- React 19
- TypeScript 6
- React Router 7
- Lucide React
- Fontsource
- ESLint 10 with TypeScript ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

The Vite server is configured in `vite.config.ts` to listen on `0.0.0.0:5713` with `strictPort: true`.

## Scripts

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

- `npm run dev` starts Vite for local development.
- `npm run typecheck` runs TypeScript without emitting files.
- `npm run lint` runs ESLint across the repository.
- `npm run build` runs type checking and creates the production build in `dist/`.
- `npm run preview` serves the built app with the same configured host and port.

## Project Structure

```text
.
|-- .github/workflows/deploy.yml
|-- public/404.html
|-- src/App.tsx
|-- src/components/ProjectImageFrame.tsx
|-- src/data/content.ts
|-- src/styles.css
|-- vite.config.ts
`-- package.json
```

- `src/App.tsx` defines routes, layout components, cards, pages, navigation, and the footer.
- `src/data/content.ts` is the main source for profile, project, stack, and navigation data.
- `src/components/ProjectImageFrame.tsx` provides image framing and empty-image fallback rendering for projects.
- `src/styles.css` contains the visual system, responsive layout, and route/page styling.
- `public/404.html` redirects GitHub Pages deep links back into the SPA.
- `.github/workflows/deploy.yml` builds and deploys `dist/` through GitHub Pages Actions.

## Editing Portfolio Content

Most portfolio updates should start in `src/data/content.ts`.

To add or update a project image, place the file in `src/assets/`, import it in `src/data/content.ts`, and assign it to a project:

```ts
import projectImage from "../assets/project-image.png";

{
  title: "Project Name",
  image: {
    src: projectImage,
    alt: "Project interface preview",
  },
}
```

Optional image fields include `fit`, `aspectRatio`, and `objectPosition`.

## Quality Gates

Run these before handing off code or content changes:

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`.

The workflow:

1. Checks out the repository.
2. Sets up Node 24 with npm caching.
3. Installs dependencies with `npm ci`.
4. Builds the app with `npm run build`.
5. Uploads `dist/` as a GitHub Pages artifact.
6. Deploys with `actions/deploy-pages`.

The app uses `base: "/"` in `vite.config.ts` because it is deployed as a GitHub Pages user site root.

## Agent Guidance

Repository-specific agent instructions live in `AGENTS.md`.

## Changelog

See `CHANGELOG.md` for notable project changes.

## License

TBD (owner needed). No repository license file is currently present.
