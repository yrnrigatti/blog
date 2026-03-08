# Story 1.1: Set Up Initial Project from Starter Template

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Developer,  
I want to initialize the project from the approved starter template,  
so that implementation starts from the architecture-approved baseline.

## Acceptance Criteria

1. Given the approved architecture starter decision, when project initialization is executed, then the project is created from `npm create astro@latest` and dependencies install and baseline configuration complete successfully.
2. Given the initialized project baseline, when the first validation run executes, then build and lint checks run successfully in the starter setup and the project is ready for subsequent artifact schema and collection stories.

## Tasks / Subtasks

- [x] Initialize project baseline with Astro starter (AC: 1)
  - [x] Run `npm create astro@latest` in repo root and choose TypeScript-enabled project setup.
  - [x] Install dependencies with `npm install`.
  - [x] Add Node runtime pin to `.nvmrc` with `24`.
- [x] Establish initial static-first project structure (AC: 1, 2)
  - [x] Ensure `src/pages/[locale]/` route base exists for locale-first architecture.
  - [x] Add minimal folders aligned with architecture: `src/content/`, `src/lib/graph/`, `src/config/`, `scripts/validation/`, `tests/`.
  - [x] Add starter placeholder route(s) needed to prove build integrity.
- [x] Configure baseline quality commands (AC: 2)
  - [x] Ensure `package.json` scripts include at least `dev`, `build`, `preview`, `lint`, and `test`.
  - [x] Ensure linting can run without failing on starter defaults.
  - [x] Ensure build command succeeds in local environment.
- [x] Verify baseline readiness for next stories (AC: 2)
  - [x] Run first validation sequence: lint, build, and starter test smoke check.
  - [x] Record setup decisions in README (runtime, commands, project structure assumptions).

### Review Follow-ups (AI)

- [x] [AI-Review][Medium] Root route still serves Astro starter page instead of enforcing locale-first entry (`/{locale}/...`) as defined in architecture compliance. [src/pages/index.astro:1]
- [x] [AI-Review][Medium] Locale values are hardcoded in route file instead of centralized config (`src/config/` remains empty), increasing risk of locale drift in next stories. [src/pages/[locale]/index.astro:3]
- [x] [AI-Review][Medium] Layout references `/favicon.ico`, but this file is not present in repository, causing avoidable 404 requests. [src/layouts/Layout.astro:7]
- [x] [AI-Review][Low] Story completion metadata is contradictory (`Status: in-progress` while completion section still says `ready-for-dev`), reducing traceability quality. [_bmad-output/implementation-artifacts/1-1-set-up-initial-project-from-starter-template.md:124]

## Dev Notes

### Developer Context Section

- This story establishes the mandatory foundation for all subsequent artifact-graph stories. Keep scope to initialization and baseline validation only; do not implement graph logic yet.
- No previous story intelligence exists for Epic 1 (this is the first story).
- No git history is available yet in this workspace (repository not initialized at execution time), so conventions in architecture docs are the source of truth.

### Technical Requirements

- Runtime baseline must be Node.js 24 LTS for consistency with architecture and PRD constraints.
- Starter initialization command is fixed: `npm create astro@latest`.
- Keep architecture static-first and avoid introducing runtime database or dynamic backend services in this story.
- Keep JavaScript footprint minimal and avoid unnecessary client hydration.
- Prepare baseline for later quality gates (schema/link/i18n/SEO/a11y), but do not implement full gates here.

### Architecture Compliance

- Follow locale-first routing contract: `/{locale}/...`.
- Preserve planned bounded structure:
  - `src/content/` for typed artifacts.
  - `src/lib/graph/` as future single authority for relationship logic.
  - `scripts/validation/` for CI/local validation commands.
- Do not create ad hoc graph resolution logic outside `src/lib/graph/`.
- Keep MVP boundaries: no runtime admin surface, no runtime API surface.

### Library and Framework Requirements

- Framework: Astro starter from official CLI (`create astro` flow).
- Package manager commands should align with npm workflow in project docs.
- Node: use v24 Active LTS line.
- Use official Astro upgrade path in future changes (`npx @astrojs/upgrade`) instead of manual dependency drift.

### File Structure Requirements

- Minimum expected output after this story:
  - `package.json`
  - `astro.config.*`
  - `tsconfig.json` (if TypeScript selected)
  - `.nvmrc` with `24`
  - `src/pages/[locale]/` base
  - `src/content/` base directory
  - `src/lib/graph/` base directory
  - `scripts/validation/` base directory
- Keep file naming consistent with architecture conventions:
  - Components `PascalCase`
  - Utility files `kebab-case`
  - Variables/functions `camelCase`

### Testing Requirements

- Minimum checks for this story:
  - `npm run lint` passes.
  - `npm run build` passes.
  - Starter app renders successfully in local preview.
- Testing strategy alignment:
  - Reserve deep integrity testing for future stories (3.x and CI gates).
  - Ensure this baseline does not block future P0 tests for graph integrity, ID immutability, and locale contracts.

### Latest Tech Information

- Node.js v24 (`Krypton`) is Active LTS as of the latest release table update (last updated 2026-02-24 on Node.js releases page).
- Official Astro install docs continue to recommend `npm create astro@latest` for new projects.
- Recent Astro 5.x release notes (for example Astro 5.16, published 2025-11-20) indicate active monthly improvements; starting with latest starter is consistent with project goals.

### Project Structure Notes

- This workspace currently contains planning and test artifacts, but no initialized Astro source tree yet.
- This story should create the first implementation-ready app skeleton while preserving `_bmad-output` artifacts.

### References

- [Source: _bmad-output/planning-artifacts/epics.md - Epic 1, Story 1.1]
- [Source: _bmad-output/planning-artifacts/architecture.md - Starter Template Evaluation, Core Architectural Decisions, Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/prd.md - Additional Requirements, Technical Success, MVP Scope]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md - Platform Strategy, User Journey Flows, Responsive Design & Accessibility]
- [Source: _bmad-output/test-artifacts/test-design-qa.md - Dependencies & Test Blockers, Entry Criteria]
- [Source: _bmad-output/test-artifacts/test-design-architecture.md - Pre-Implementation Critical Path]
- [Source: https://docs.astro.build/en/install-and-setup/]
- [Source: https://astro.build/blog/astro-5160/]
- [Source: https://nodejs.org/en/about/previous-releases]

## Story Completion Status

- Story status set to `done` after applying all code review follow-up fixes.
- Completion note: Initial implementation and all follow-up fixes are complete.

## Dev Agent Record

### Agent Model Used

gpt-5-codex

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/create-story`
- Sprint source: `_bmad-output/implementation-artifacts/sprint-status.yaml`
- Workflow: `_bmad/bmm/workflows/4-implementation/dev-story`
- Commands: `npm create astro@latest`, `npm install`, `npm run lint`, `npm run build`, `npm run test`
- Commands: `npm run test`, `npm run lint`, `npm run build`

### Implementation Plan

- Initialize Astro starter baseline with TypeScript in current repository workspace.
- Pin Node runtime to 24 via `.nvmrc`.
- Establish locale-first route and required architecture folders.
- Add baseline quality scripts for lint and smoke test.
- Validate with lint/build/test and record setup assumptions in README.

### Completion Notes List

- First backlog story auto-selected from sprint status.
- Epic status transition applied (`backlog` -> `in-progress`) because this is first story in epic.
- Story marked `ready-for-dev` in sprint tracking.
- Astro starter scaffold created from `npm create astro@latest` and baseline files moved to repository root.
- Node runtime pin added with `.nvmrc` set to `24`.
- Locale-first route base added at `src/pages/[locale]/index.astro`.
- Architecture baseline directories created: `src/content/`, `src/lib/graph/`, `src/config/`, `scripts/validation/`, `tests/`.
- Baseline quality scripts added in `package.json`: `lint` and `test`.
- Smoke test added at `tests/smoke.test.mjs`.
- Validation completed successfully: `npm run lint`, `npm run build`, `npm run test`.
- ✅ Resolved review finding [Medium]: Root route now enforces locale-first entry by redirecting to `/{defaultLocale}/`.
- ✅ Resolved review finding [Medium]: Locale configuration centralized in `src/config/locales.ts` and reused by locale route generation.
- ✅ Resolved review finding [Medium]: Removed `/favicon.ico` reference from layout to avoid missing asset 404 requests.
- ✅ Resolved review finding [Low]: Story metadata aligned and status moved to `done`.
- ✅ Resolved review finding [Medium]: Locale contract normalized to canonical `pt-br` value in central config.
- ✅ Resolved review finding [Medium]: File list updated to include missing changed file (`public/favicon.ico`).
- ✅ Resolved review finding [Medium]: Senior review section and status metadata synchronized to final review outcome.

### File List

- _bmad-output/implementation-artifacts/1-1-set-up-initial-project-from-starter-template.md
- _bmad-output/implementation-artifacts/sprint-status.yaml
- .gitignore
- .nvmrc
- astro.config.mjs
- package.json
- package-lock.json
- README.md
- tsconfig.json
- public/favicon.svg
- public/favicon.ico
- src/assets/astro.svg
- src/assets/background.svg
- src/components/Welcome.astro
- src/layouts/Layout.astro
- src/pages/index.astro
- src/pages/[locale]/index.astro
- src/content/.gitkeep
- src/lib/graph/.gitkeep
- src/config/.gitkeep
- src/config/locales.ts
- scripts/validation/README.md
- tests/smoke.test.mjs
- .vscode/extensions.json
- .vscode/launch.json

### Change Log

- 2026-03-08: Implemented Story 1.1 baseline initialization, project structure setup, quality scripts, and initial validation checks.
- 2026-03-08: Senior code review executed; issues documented under `Review Follow-ups (AI)` and story moved to `in-progress`.
- 2026-03-08: Addressed code review findings - 4 items resolved (root locale redirect, centralized locale config, favicon cleanup, metadata/status consistency).
- 2026-03-08: Follow-up code review fixes applied - locale canonicalization (`pt-br`), file list traceability correction, and final review/status synchronization to done.

### Senior Developer Review (AI)

Reviewer: Yorran  
Date: 2026-03-08

Outcome: Approved

Findings summary:
- High: 0
- Medium: 0
- Low: 0

AC validation:
- AC1: IMPLEMENTED (Astro baseline exists with dependency install and config files in place).
- AC2: IMPLEMENTED (lint/build/test pass and baseline review follow-ups resolved for this story scope).

Git vs Story discrepancies:
- Repository is not initialized as a Git repository in this workspace, so git-based change traceability could not be validated.

Validation evidence:
- `npm run lint`: pass (0 errors)
- `npm run build`: pass (static routes generated)
- `npm run test`: pass (smoke test)
