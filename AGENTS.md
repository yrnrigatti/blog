# Agent Workflow Rules

## Git Branching
- Always create a new branch when starting a new feature.
- Branch format: `feature/<short-kebab-name>`.
- Create the branch from `main` unless the user requests another base.
- If already on a matching feature branch, continue on it.

## Commit Cadence
- Create commits at relevant checkpoints, not only at the end.
- A relevant checkpoint is a coherent, testable unit (for example: one story acceptance criterion, one completed refactor, one isolated bug fix).
- Prefer small, focused commits over large mixed commits.
- Use Conventional Commits format when possible:
  - `feat: ...`
  - `fix: ...`
  - `refactor: ...`
  - `test: ...`
  - `docs: ...`

## Safety
- Do not commit broken code intentionally.
- Before each checkpoint commit, run the smallest relevant validation (tests/lint/build) when feasible.
- Do not rewrite user commits unless explicitly requested.
