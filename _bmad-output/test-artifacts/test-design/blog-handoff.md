---
title: 'TEA Test Design -> BMAD Handoff Document'
version: '1.0'
workflowType: 'testarch-test-design-handoff'
inputDocuments:
  - _bmad-output/test-artifacts/test-design-architecture.md
  - _bmad-output/test-artifacts/test-design-qa.md
sourceWorkflow: 'testarch-test-design'
generatedBy: 'TEA Master Test Architect'
generatedAt: '2026-03-08T00:00:00Z'
projectName: 'blog'
---

# TEA -> BMAD Integration Handoff

## Purpose

This document bridges TEA test design outputs with BMAD epic/story decomposition.

## TEA Artifacts Inventory

| Artifact | Path | BMAD Integration Point |
| --- | --- | --- |
| Test Design (Architecture) | `_bmad-output/test-artifacts/test-design-architecture.md` | Architecture/Dev quality constraints and pre-implementation blockers |
| Test Design (QA) | `_bmad-output/test-artifacts/test-design-qa.md` | Story acceptance criteria and test execution planning |
| Risk Assessment | Embedded in both docs | Epic risk classification and sequencing |

## Epic-Level Integration Guidance

### Risk References

- **R-001 (Score 9, TECH):** Map to Epic 3 stories (3.1, 3.2, 3.3, 3.5) as release-blocking quality gate work.
- **R-002 (Score 6, DATA):** Map to Story 1.2 and 3.6 to lock ID stability and migration behavior.
- **R-003 (Score 6, PERF):** Map to Stories 1.8, 3.5, and 6.8 for automated budget gating.
- **R-004 (Score 6, SEC):** Map to Story 1.3 + content validation stories as mandatory sanitization baseline.

### Quality Gates

- No epic closes while R-001 remains open.
- Epic acceptance requires P0 pass rate 100% and P1 pass rate >=95%.
- Any story touching relation logic must pass dead-end/orphan regression suite.

## Story-Level Integration Guidance

### P0/P1 Test Scenarios -> Story Acceptance Criteria

- Story **3.1** must include acceptance criteria for orphan, dead-end, and missing relation blocking behavior.
- Story **1.2** must include acceptance criteria for immutable published IDs and explicit migration path.
- Story **2.9** must include full proof-path E2E continuity and recovery-state behavior.
- Stories **6.1-6.3** must include canonical/hreflang bidirectional assertions.

### Data-TestId Requirements

- Proof-path navigation controls should expose stable `data-testid` for route transitions.
- Related-artifact panel needs deterministic selectors for mandatory next-step actions.
- Integrity diagnostics UI (if present) should expose severity/status selectors.

## Risk-to-Story Mapping

| Risk ID | Category | P*I | Recommended Story/Epic | Test Level |
| --- | --- | --- | --- | --- |
| R-001 | TECH | 3*3=9 | Epic 3 / Stories 3.1, 3.2, 3.3, 3.5 | Unit + Integration + E2E |
| R-002 | DATA | 2*3=6 | Epic 1 Story 1.2 + Epic 3 Story 3.6 | Unit + Integration |
| R-003 | PERF | 3*2=6 | Epic 1 Story 1.8 + Epic 6 Story 6.8 | Integration |
| R-004 | SEC | 2*3=6 | Epic 1 Story 1.3 + quality gate stories | Unit + Integration |
| R-007 | DATA | 1*3=3 | Epic 6 Stories 6.1-6.3 | Integration + E2E |

## Recommended BMAD -> TEA Workflow Sequence

1. TEA Test Design (completed)
2. BMAD Create Epics & Stories (consume this handoff)
3. TEA ATDD for P0 scenarios per selected stories
4. BMAD implementation cycle
5. TEA automate/trace to verify coverage and release readiness

## Phase Transition Quality Gates

| From Phase | To Phase | Gate Criteria |
| --- | --- | --- |
| Test Design | Epic/Story Creation | All high risks (>=6) mapped to epic/story work |
| Epic/Story Creation | ATDD | P0/P1 scenarios converted into acceptance criteria |
| ATDD | Implementation | Failing acceptance tests generated for priority scenarios |
| Implementation | Test Automation | Integrity and proof-path suites passing |
| Test Automation | Release | No open blocking risks, coverage target >=80% for P0/P1 requirements |
