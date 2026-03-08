---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/brainstorming/brainstorming-session-2026-03-07-132650.md
workflowType: 'architecture'
project_name: 'blog'
user_name: 'Yorran'
date: '2026-03-08 00:47:32'
lastStep: 8
status: 'complete'
completedAt: '2026-03-08 01:25:53'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The product defines 41 functional requirements centered on a graph-based documentation platform. Architecturally, the core implication is a domain model with stable artifact identities and enforced bidirectional relationships across Project, Article, ADR, and Repo. The system must support guided proof-path navigation, non-dead-end pages, artifact index/detail views, and maintainable editorial workflows that preserve relationship integrity during updates. Localization and machine-consumable outputs are also first-class capabilities, requiring structured metadata and link consistency from MVP foundations onward.

**Non-Functional Requirements:**
24 non-functional requirements drive architecture constraints. Performance requires static-first delivery, limited client-side JavaScript, and fast rendering for core proof-path pages. Security requires authenticated admin actions, sanitized publishing inputs, HTTPS-only delivery, and non-indexed admin surfaces. Scalability and integration require stable identifiers/URLs and backward-compatible machine outputs. Accessibility mandates WCAG 2.2 AA for core journeys, with semantic structure and keyboard operability. Reliability requires automated broken-link detection and resilient content availability during publishing operations.

**Scale & Complexity:**
This project is medium complexity: not infrastructure-heavy, but structurally demanding due to strict artifact traceability, editorial integrity guarantees, and quality constraints (SEO, i18n, accessibility, performance) applied simultaneously.

- Primary domain: Web-based engineering documentation platform
- Complexity level: Medium
- Estimated architectural components: 8-9

### Technical Constraints & Dependencies

- Static-first / MPA + selective hydration direction strongly constrains frontend architecture and rendering strategy.
- Core entities (Project, Article, ADR, Repo) require stable IDs and deterministic relationship handling.
- SEO baseline is mandatory in MVP: semantic HTML, canonical tags, hreflang, XML sitemap.
- Localization requires explicit cross-language artifact linking between EN and pt-BR variants.
- Publishing flow depends on validation mechanisms for missing/broken/orphan links.
- Future integration outputs (RSS/JSON/API) require schema stability and compatibility planning from early design.

### Cross-Cutting Concerns Identified

- Artifact relationship integrity and bidirectional navigation consistency
- SEO and discoverability architecture across all page types
- Internationalization and localized artifact linking
- Accessibility compliance (WCAG 2.2 AA) in navigation and content structures
- Performance budget governance (page weight, hydration limits, render speed)
- Publishing governance and automated quality checks (link validation, consistency checks)
- Evolvability for phased expansion without breaking existing artifact graph
- Artifact schema evolvability and forward compatibility

## Starter Template Evaluation

### Primary Technology Domain

Static-first engineering documentation platform based on project requirements analysis.

### Starter Options Considered

1. Astro (official `create astro` starter)
- Strong match for static-first architecture and islands-based selective hydration.
- Native fit for content-heavy platforms with typed content collections, schema validation, and structured metadata suitable for artifact graphs.
- Built-in i18n routing support aligns with EN/pt-BR artifact linking requirements.
- Low operational complexity for solo-maintained publishing workflows.

2. Next.js (`create-next-app`)
- Excellent ecosystem and full-stack capability.
- Better fit for app-heavy/dynamic products; may add unnecessary complexity for current MVP scope.
- Viable fallback if future roadmap prioritizes highly dynamic server features earlier.

3. Eleventy
- Very lightweight static-site generator with strong performance profile.
- Requires more custom architectural assembly for typed artifact graph, localization linkage, and editorial governance workflows.

### Selected Starter: Astro (`create astro`)

**Rationale for Selection:**
Astro best satisfies the project's MVP constraints: static-first delivery, low JS by default, strong content model ergonomics, and progressive enhancement via islands. It minimizes infrastructure overhead while supporting future growth into richer artifact types and machine-consumable outputs.

### Technology Tradeoffs

**Pros**
- Static-first by default
- Minimal client-side JavaScript
- Strong content modeling
- Excellent performance profile
- Simple operational model for solo maintenance

**Cons**
- Smaller ecosystem compared to Next.js
- Some advanced dynamic patterns require integrations
- Fewer full-stack capabilities out-of-the-box

**Initialization Command:**

```bash
npm create astro@latest
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
Node-based toolchain with optional TypeScript configuration during setup; well aligned with typed artifact metadata strategy.

**Styling Solution:**
Flexible choice at setup time (no forced styling lock-in), allowing architecture-first decisions without premature design-system coupling.

**Build Tooling:**
Vite-powered build pipeline with static-first output and modern bundling defaults.

**Testing Framework:**
No heavy testing framework imposed by default, keeping MVP lean and allowing targeted test architecture decisions later.

**Code Organization:**
File-based routing combined with content collections enables deterministic mapping between artifact entities (Project, Article, ADR, Repo) and generated routes.

**Development Experience:**
Fast local dev workflow, straightforward CLI initialization, and an integrations path (`astro add`) for incremental capability growth.

**Note:** Project initialization using this starter should be treated as the first implementation story, establishing the base project structure, content model foundation, and development workflow.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Runtime baseline: Node.js 24 LTS
- Content persistence model: file-based content collections (no runtime database in MVP)
- Artifact identity strategy: deterministic stable IDs in frontmatter for all entities
- Localization linkage model: explicit cross-language linking between EN and pt-BR artifact variants
- Deployment model: static hosting with CI-driven publish pipeline

**Important Decisions (Shape Architecture):**
- Validation strategy: schema-first validation for content entities at build time
- API surface strategy: build-time generated feeds/manifests instead of runtime API in MVP
- Security model: no public admin runtime surface; content changes via repository workflow
- Frontend interaction model: islands-only hydration with strict JS budget

**Deferred Decisions (Post-MVP):**
- Runtime database adoption for dynamic querying
- End-user authentication/authorization layer
- Real-time communication features
- Public JSON/API with versioned contract beyond MVP feeds

### Data Architecture

- **Primary storage:** Markdown/MDX content files managed in-repo.
- **Entity modeling:** `Project`, `Article`, `ADR`, `Repo` as typed collections.
- **Identity model:** stable `id` field per artifact; relationship fields store IDs (not only URLs).
- **Validation:** schema validation at build time for required fields and relationship integrity.
- **Migration approach:** content schema versioning in frontmatter (`schemaVersion`) with migration scripts when fields evolve.
- **Caching strategy:** CDN edge caching for static assets/pages; no application-level cache layer in MVP.

### Authentication & Security

- **Authentication method (MVP):** no end-user auth required for public reading flows.
- **Authoring security:** repository-based controlled writes (branch/PR workflow).
- **Authorization pattern:** maintainer-controlled merge/deploy permissions.
- **Input security:** sanitize/validate frontmatter and rendered content during build checks.
- **Transport security:** HTTPS-only hosting and strict security headers at CDN/host level.
- **Admin surface:** no public admin panel in MVP (reduces attack surface).

### API & Communication Patterns

- **Primary pattern:** static route generation via Astro.
- **Machine outputs (MVP):** RSS + structured build-time outputs (e.g., JSON manifests) generated from content graph.
- **Error handling standard:** build must fail on schema/link integrity violations for critical entities.
- **Rate limiting:** not applicable in MVP (no public runtime API).
- **Service communication:** not applicable in MVP monolithic static publishing model.

### Frontend Architecture

- **Rendering model:** static-first pages with selective island hydration.
- **State management:** local component state only; avoid global client store in MVP.
- **Routing strategy:** file-based routing + deterministic mapping from artifact entities to URLs.
- **Performance strategy:** minimal client JS, lazy hydration only where interaction is necessary.
- **Bundle optimization:** strict dependency discipline and per-page hydration boundaries.

### Infrastructure & Deployment

- **Hosting strategy:** static hosting platform with global CDN delivery.
- **CI/CD approach:** Git-based pipeline: validate -> build -> deploy.
- **Environment configuration:** minimal environment variables; no server secrets exposed to client bundles.
- **Monitoring/logging:** build/deploy logs + uptime checks + broken-link validation reports.
- **Scaling strategy:** horizontal CDN scaling through static asset distribution; no runtime compute scaling in MVP.

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialize Astro project with Node 24 LTS baseline
2. Define typed content collections and artifact schemas
3. Implement stable IDs + relationship fields + integrity validators
4. Implement i18n routes and EN/pt-BR artifact linkage
5. Build core navigation/proof path pages from content graph
6. Add CI checks (schema, links, accessibility/SEO gates) and deploy static hosting

**Cross-Component Dependencies:**
- Stable IDs + schema validation underpin link integrity, proof-path navigation, and machine outputs.
- i18n linkage depends on consistent artifact identity strategy.
- CI quality gates depend on deterministic content model and route generation.
- Performance and accessibility targets depend on islands discipline and static-first rendering boundaries.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
12 areas where AI agents could make different choices and create incompatible outputs.

### Naming Patterns

**Database Naming Conventions:**
- MVP has no runtime database.
- If persistence is introduced later, use:
  - table names: `snake_case` plural (`artifact_links`)
  - columns: `snake_case` (`artifact_id`, `created_at`)
  - foreign keys: `<entity>_id`
  - indexes: `idx_<table>_<column>`

**API Naming Conventions:**
- Runtime API is deferred in MVP.
- For build-time JSON outputs:
  - file names: kebab-case (`artifact-manifest.json`)
  - top-level keys: `camelCase`
  - collection keys: plural nouns (`projects`, `articles`)
- Future REST endpoints must be plural (`/projects`, `/articles/:id`).

**Code Naming Conventions:**
- Components: `PascalCase` (`ArtifactCard.astro`)
- Utility/service files: `kebab-case` (`link-integrity.ts`, `build-proof-path.ts`)
- Variables/functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Content IDs: lowercase kebab-case (`proj-blog-platform`, `adr-001-proof-path`)
- Artifact IDs are immutable after publication and must never be regenerated automatically.

### Structure Patterns

**Project Organization:**
- `src/content/<collection>/` for artifact content.
- `src/pages/` for route entrypoints only.
- `src/components/` for reusable view blocks.
- `src/lib/` for domain logic, validators, graph utilities.
- `src/lib/graph/` for artifact graph core logic:
  - `build-artifact-graph.ts`
  - `resolve-relationships.ts`
  - `validate-bidirectional-links.ts`
- `src/config/` for typed config and constants.
- `scripts/` for build-time checks and migrations.

**File Structure Patterns:**
- Co-locate schema definitions under `src/content.config.ts` plus `src/lib/schemas/` when needed.
- Keep all link-validation tooling under `scripts/validation/`.
- Store static assets in `public/` with deterministic paths.
- Keep architecture docs under `_bmad-output/planning-artifacts/`.

### Format Patterns

**API Response Formats:**
- MVP machine outputs are static JSON documents with:
  - `schemaVersion`
  - `generatedAt` (ISO-8601 UTC)
  - `data`
  - `meta` (optional)
- Validation issues use a normalized shape in CI logs:
  - `{ code, message, artifactId, path, severity }`
- Severity levels:
  - `info` (report only)
  - `warning` (log + CI notice)
  - `blocking` (break build)

**Data Exchange Formats:**
- JSON fields: `camelCase`
- Dates: ISO-8601 UTC strings (`2026-03-08T03:00:00Z`)
- Booleans: `true/false`
- Nullability: explicit `null` only when semantically meaningful
- Relationship fields: arrays of stable IDs, never display labels as source of truth

### Communication Patterns

**Event System Patterns:**
- No runtime event bus in MVP.
- Build lifecycle events (internal scripts/logs) use:
  - naming: `<domain>.<action>` (`link.check.failed`)
  - payload: `{ eventName, timestamp, context, metrics }`

**State Management Patterns:**
- Prefer static props and local island state only.
- No global client store in MVP.
- Shared derived state should be computed at build time where possible.
- Any client state must have explicit hydration boundary justification.

### Process Patterns

**Error Handling Patterns:**
- Fail-fast in CI for schema violations, broken critical links, missing required relations.
- Use `info` / `warning` / `blocking` severity consistently.
- User-facing pages must degrade gracefully for missing optional related artifacts.

**Loading State Patterns:**
- Static-first pages should not show client loading states by default.
- Islands with async behavior must use standardized states:
  - `idle`, `loading`, `success`, `error`
- Skeletons/spinners only for genuinely deferred client interactions.

### Enforcement Guidelines

**All AI Agents MUST:**
- Use stable artifact IDs as canonical references across all collections.
- Enforce schema validation before merge/deploy.
- Maintain bidirectional relationships (or fail CI when required links are missing).
- Follow prescribed naming/structure conventions exactly.
- Keep client-side JS minimal and justify every hydrated island.

**Pattern Enforcement:**
- Automated checks in CI: schema, link integrity, i18n pairing, SEO metadata presence.
- Pattern violations documented in validation reports generated in pipeline.
- Pattern updates require explicit architecture document update before implementation.

### Pattern Examples

**Good Examples:**
- `Article.relatedAdrIds: ["adr-001-proof-path"]`
- `Project.relatedRepoIds: ["repo-blog-platform"]`
- `generatedAt: "2026-03-08T03:00:00Z"`
- Component file: `ProofPathTimeline.astro`
- Utility file: `validate-artifact-links.ts`

**Anti-Patterns:**
- Linking by title instead of stable ID (`"Proof Path ADR"` instead of `"adr-001-proof-path"`)
- Mixed naming styles in same layer (`snake_case` + `camelCase` sem regra)
- Global client store introduced for content that is fully static
- Non-deterministic route generation from mutable labels/slugs only
- CI allowing publish with orphan artifacts in required relationships
- Storing derived relationship labels instead of stable references (`relatedProjectTitle` instead of `projectId`)

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
blog/
├── README.md
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── .editorconfig
├── .gitignore
├── .nvmrc
├── .env.example
├── src/
│   ├── content.config.ts
│   ├── pages/
│   │   ├── [locale]/
│   │   │   ├── index.astro
│   │   │   ├── proof.astro
│   │   │   ├── architecture/
│   │   │   │   ├── index.astro
│   │   │   │   └── [version].astro
│   │   │   ├── projects/
│   │   │   │   ├── index.astro
│   │   │   │   └── [slug].astro
│   │   │   ├── articles/
│   │   │   │   ├── index.astro
│   │   │   │   └── [slug].astro
│   │   │   ├── decisions/
│   │   │   │   ├── index.astro
│   │   │   │   └── [id].astro
│   │   │   ├── repos/
│   │   │   │   ├── index.astro
│   │   │   │   └── [slug].astro
│   │   │   └── build-log/
│   │   │       └── index.astro
│   │   ├── rss.xml.ts
│   │   ├── artifacts.json.ts
│   │   └── manifests/
│   │       └── artifact-graph.json.ts
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   │   ├── ProofPathNav.astro
│   │   │   └── RelatedArtifacts.astro
│   │   ├── artifact/
│   │   ├── adr/
│   │   └── islands/
│   │       ├── SearchArtifacts.tsx
│   │       └── DiagramViewer.tsx
│   ├── content/
│   │   ├── projects/
│   │   ├── articles/
│   │   ├── adrs/
│   │   ├── repos/
│   │   ├── architectures/
│   │   └── build-logs/
│   ├── lib/
│   │   ├── graph/
│   │   │   ├── build-artifact-graph.ts
│   │   │   ├── resolve-relationships.ts
│   │   │   └── validate-bidirectional-links.ts
│   │   ├── schemas/
│   │   │   ├── common.ts
│   │   │   ├── project.ts
│   │   │   ├── article.ts
│   │   │   ├── adr.ts
│   │   │   ├── repo.ts
│   │   │   └── architecture.ts
│   │   ├── content/
│   │   ├── i18n/
│   │   ├── seo/
│   │   ├── proof/
│   │   ├── validation/
│   │   └── types/
│   ├── config/
│   │   ├── routes.ts
│   │   ├── locales.ts
│   │   ├── artifact-relations.ts
│   │   └── quality-gates.ts
│   └── styles/
│       └── global.css
├── public/
│   ├── images/
│   └── diagrams/
├── scripts/
│   ├── validation/
│   ├── migrations/
│   └── reports/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│       ├── proof-path.spec.ts
│       ├── navigation-integrity.spec.ts
│       └── artifact-graph-consistency.spec.ts
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
└── _bmad-output/
    └── planning-artifacts/
        └── architecture.md
```

### Architectural Boundaries

**API Boundaries:**
- No public runtime API in MVP.
- Machine-consumable build outputs only (`rss.xml`, `artifacts.json`, `manifests/artifact-graph.json`).
- Validation boundary in CI blocks publish on schema/link/i18n failures.

**Component Boundaries:**
- `pages/` compose routes.
- `components/` render reusable UI blocks.
- `components/islands/` is the only hydration boundary.
- Any component in `components/islands/` must document:
  - why hydration is required
  - hydration strategy used
  - non-JS fallback behavior (when applicable)

**Service Boundaries:**
- `lib/graph/` is the single source of truth for artifact relationships and integrity checks.
- No page/component may implement ad-hoc relationship resolution outside `lib/graph`.
- `lib/validation/` centralizes reusable quality checks.
- `scripts/validation/` orchestrates CI enforcement.

**Data Boundaries:**
- `content/` is canonical source.
- Generated feeds/manifests are derived outputs only.
- Relationship fields always reference stable IDs (never labels).

### MVP vs Post-MVP Routes

**MVP Routes:**
- `/[locale]/`
- `/[locale]/proof`
- `/[locale]/architecture`
- `/[locale]/projects`
- `/[locale]/projects/[slug]`
- `/[locale]/articles`
- `/[locale]/articles/[slug]`
- `/[locale]/decisions`
- `/[locale]/decisions/[id]`

**Post-MVP / Growth Routes:**
- `/[locale]/build-log`
- `/[locale]/architecture/[version]`
- `/[locale]/repos`
- `/[locale]/repos/[slug]`
- `/artifacts.json`
- `/manifests/artifact-graph.json`

### Requirements to Structure Mapping

**Feature/FR Mapping:**
- Artifact graph integrity (FR0-FR8, FR30-FR33, FR40):
  - `src/content.config.ts`, `src/lib/graph/*`, `src/lib/validation/*`, `scripts/validation/*`
- Discovery and proof-path (FR14-FR19, FR37-FR38):
  - `src/pages/[locale]/proof.astro`, `src/components/navigation/ProofPathNav.astro`, `RelatedArtifacts.astro`
- Evidence & credibility (FR20-FR23):
  - `src/content/architectures/*`, `src/content/adrs/*`, `src/lib/proof/*`, `src/pages/[locale]/proof.astro`
- Localization/SEO/accessibility (FR24-FR29, FR39):
  - `src/pages/[locale]/*`, `src/config/locales.ts`, `src/lib/i18n/*`, `src/lib/seo/*`
- Machine outputs (FR34-FR36):
  - `src/pages/rss.xml.ts`, `src/pages/artifacts.json.ts`, `src/pages/manifests/artifact-graph.json.ts`

### Integration Points

**Internal Communication:**
- Pages consume typed loaders + graph resolvers from `lib/`.
- Validators run both local and in CI.

**External Integrations:**
- Static hosting/CDN via deploy workflow.
- Optional integrations isolated from core graph logic.

**Data Flow:**
1. Author updates `src/content/*`
2. Schema + relationship validators run
3. Graph resolves in `lib/graph`
4. Routes + machine outputs generated
5. CI gates enforce publish quality

### File Organization Patterns

**Configuration Files:**
- Toolchain configs at root.
- Policy constants in `src/config/*`.
- Domain logic in `src/lib/*`.

**Test Organization:**
- Unit: graph/validation/i18n utilities
- Integration: content build + routes
- E2E: proof-path, navigation integrity, graph consistency

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All core decisions are compatible: Astro static-first architecture, file-based content model, stable artifact IDs, and CI-gated validation strategy reinforce each other without contradictions. No version-level conflict was identified between runtime baseline (Node 24 LTS), framework direction, and implementation constraints.

**Pattern Consistency:**
Naming, structure, format, communication, and process patterns are internally consistent and aligned with the architectural decisions. Rules around ID immutability, bidirectional relationship enforcement, and minimal hydration directly support artifact-graph integrity and performance requirements.

**Structure Alignment:**
The project structure supports all defined boundaries. The `lib/graph` source-of-truth rule, validation orchestration in `scripts/validation`, and locale-based route structure provide clear implementation contracts for multiple AI agents.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
Core capabilities from PRD and brainstorming outputs are represented: artifact graph foundation, proof-path navigation, ADR-centric credibility flows, i18n support, and machine-consumable outputs.

**Functional Requirements Coverage:**
All functional requirement groups (FR0-FR40) are architecturally covered through explicit mappings to content model, routing, validation, and output generation layers.

**Non-Functional Requirements Coverage:**
NFR coverage is coherent:
- Performance: static-first pages + strict hydration boundary
- Security: no public admin runtime surface + CI content validation
- Scalability: stable IDs and schema evolution path
- Accessibility: semantic-first structure + route/layout consistency
- Reliability: fail-fast validation and broken-link/orphan checks
- Integration: RSS/JSON build outputs with version metadata strategy

### Implementation Readiness Validation ✅

**Decision Completeness:**
Critical and important decisions are documented with clear rationale and implementation impact. Deferred decisions are explicitly marked to prevent scope drift.

**Structure Completeness:**
Directory tree, boundaries, integration points, and MVP vs Post-MVP route scopes are defined in implementation-ready detail.

**Pattern Completeness:**
Patterns cover key conflict zones for multi-agent execution: naming, file organization, format contracts, graph resolution ownership, validation severities, and CI enforcement.

### Gap Analysis Results

**Critical Gaps:**
- None identified.

**Important Gaps:**
- Define exact allowed locale list (`en`, `pt-br`) as an enforced runtime/config contract in `src/config/locales.ts`.
- Specify canonical ID format regex in schema helpers to guarantee strict validation consistency.
- Add explicit documentation template for `components/islands/*` hydration justification blocks.

**Nice-to-Have Gaps:**
- Add a small architecture glossary to standardize terms (`artifact`, `evidence`, `proof path`, `relationship`).
- Add sample content fixtures for each collection to accelerate first implementation stories.

### Validation Issues Addressed

- i18n route duplication risk resolved by locale-first route structure (`/[locale]/...`).
- Runtime API ambiguity reduced by naming machine outputs as build artifacts (`artifacts.json`, `manifests/*`).
- Graph integrity ownership clarified by enforcing `lib/graph` as exclusive relationship-resolution layer.
- Scope clarity improved by separating MVP routes from Post-MVP growth routes.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Strong alignment between product goals and architecture style (static-first + artifact graph)
- Clear multi-agent consistency contracts
- Explicit quality-gate strategy for integrity, SEO, and i18n
- Good separation of MVP scope vs growth scope

**Areas for Future Enhancement:**
- Formalize schema migration playbooks for future artifact types
- Expand machine-output versioning policy
- Add deeper observability for content quality trends over time

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented.
- Use `lib/graph` as the only relationship resolution source.
- Enforce validation patterns and severity rules in CI.
- Respect MVP scope boundaries before implementing growth routes.

**First Implementation Priority:**
Initialize the Astro project using `npm create astro@latest`, then establish typed collections + stable ID schemas before building routes.
