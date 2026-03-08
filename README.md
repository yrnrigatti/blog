# Blog Project Baseline

## Runtime

- Node.js: `24` (pinned in `.nvmrc`)
- Package manager: `npm`
- Framework: `Astro` created from `npm create astro@latest` (basics template, TypeScript enabled)

## Commands

- `npm install`: install dependencies
- `npm run dev`: run local development server
- `npm run build`: build static output
- `npm run preview`: preview build locally
- `npm run lint`: run baseline static checks (`astro check`)
- `npm run test`: run baseline smoke tests

## Initial Structure Assumptions

- Locale-first routing is established under `src/pages/[locale]/`.
- Architecture-aligned directories are pre-created:
  - `src/content/`
  - `src/lib/graph/`
  - `src/config/`
  - `scripts/validation/`
  - `tests/`
- This story only establishes project baseline and validation readiness.
- Graph rules, schema constraints, and integrity engines are implemented in later stories.
