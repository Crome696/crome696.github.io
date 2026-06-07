# Project Instructions

## Required Skills And Memory

- Always use `personal:chat-language` for this repository. Chat with the user in German and keep repository artifacts, code, commits, release notes, and documentation in English unless the user explicitly asks otherwise.
- For agent instruction work, use `personal:agents-md`.
- For README work, use `personal:readme-updater`.
- For changelog work, use `personal:changelog-keepachangelog-update`.
- At the start of each substantive request, verify that the local MemPalace installation is reachable. Prefer MCP tools when available; otherwise use `python -m mempalace.cli status`.
- Before implementation or project decisions, retrieve relevant MemPalace context with concise search terms. If MemPalace is unavailable, state that briefly and continue from repository evidence.

## Project Shape

- This is a private Vite, React, and TypeScript portfolio app for the public identity `Crome696`.
- The app is configured as a GitHub Pages user site at `https://crome696.github.io/` with `base: "/"`.
- The main application routes live in `src/App.tsx`.
- Portfolio profile, projects, stack items, and navigation live in `src/data/content.ts`.
- Project images live in `src/assets/` and render through `src/components/ProjectImageFrame.tsx`.
- `public/404.html` stores deep-link redirects in session storage so GitHub Pages can serve React Router routes.

## Local Commands

- Install dependencies with `npm install`; CI uses `npm ci`.
- Run the dev server with `npm run dev`. Vite is configured for `0.0.0.0:5713` with `strictPort: true`.
- Run type checking with `npm run typecheck`.
- Run linting with `npm run lint`.
- Run the production build with `npm run build`.
- Preview the production build with `npm run preview`.

## Development Guidelines

- Keep user-facing copy and portfolio facts centralized in `src/data/content.ts` unless a component owns the text structurally.
- When adding a project image, import it from `src/assets/`, provide an accessible `alt`, and pass it through the `image` field consumed by `ProjectImageFrame`.
- Preserve the current visual system: dark portfolio shell, restrained accent colors, JetBrains Mono for technical labels, and responsive layouts defined in `src/styles.css`.
- Use `lucide-react` icons when an icon is needed and the package already contains a suitable symbol.
- Keep GitHub Pages routing in mind when changing paths, `BrowserRouter` basename handling, `vite.config.ts`, or `public/404.html`.
- Do not add secrets, private contact data, or unverifiable project claims to portfolio content.

## Deployment

- Pushes to `master` trigger `.github/workflows/deploy.yml`.
- The workflow runs on Ubuntu, uses Node 24, installs dependencies with `npm ci`, runs `npm run build`, uploads `dist/`, and deploys through GitHub Pages Actions.
- Do not change `base: "/"` unless the repository stops deploying as a GitHub Pages user site root.

## Verification

- For documentation-only changes, at minimum re-read the edited Markdown and verify referenced paths and commands exist.
- For code or content changes, run `npm run typecheck`, `npm run lint`, and `npm run build` before handing work back.
- If a command cannot be run, report the reason and the residual risk clearly.
