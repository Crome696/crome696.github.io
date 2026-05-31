# Crome696 Gitfolio

A polished multi-page GitHub Pages portfolio for the public identity `Crome696`.

## Stack

- Vite
- React
- TypeScript
- React Router
- Lucide icons
- Self-hosted fonts via Fontsource

## Development

```bash
npm install
npm run dev
```

The app is configured for the GitHub Pages user site root at `https://crome696.github.io/`.

## Quality Gates

```bash
npm run typecheck
npm run lint
npm run build
```

## Project Images

Project cards render through `ProjectImageFrame`. To add a real image, place it in `src/assets/`, import it in `src/data/content.ts`, and add it to the project:

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

## Deploy

Pushes to `master` run `.github/workflows/deploy.yml`, build the app, and deploy `dist/` through GitHub Pages Actions.
