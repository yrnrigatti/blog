---
stepsCompleted: []
lastStep: ''
lastSaved: ''
workflowType: 'testarch-test-design'
inputDocuments: []
---

# Test Design for QA: blog

**Purpose:** Test execution recipe for QA team. Defines what to test, how to test it, and what QA needs from other teams.

**Date:** 2026-03-08
**Author:** Yorran
**Status:** Draft
**Project:** blog

**Related:** See Architecture doc (test-design-architecture.md) for testability concerns and architectural blockers.

---

## Executive Summary

**Scope:** System-level QA design for core artifact graph, proof path, and quality gates.

**Risk Summary:**

- Total Risks: 8 (4 high-priority score >=6, 3 medium, 1 low)
- Critical Categories: TECH, DATA, SEC, PERF

**Coverage Summary:**

- P0 tests: ~12 (critical integrity + security)
- P1 tests: ~20 (proof path + i18n/SEO contracts)
- P2 tests: ~18 (edge and resilience)
- P3 tests: ~8 (exploratory/observability)
- **Total**: ~58 tests (~3-6 weeks with 1 QA)

---

## Not in Scope

| Item | Reasoning | Mitigation |
| --- | --- | --- |
| **Real-time collaboration flows** | Out of MVP scope | Deferred to post-MVP stories |
| **Runtime database failover testing** | MVP has file-based persistence only | Reassess when runtime DB is introduced |
| **Public API contract load testing** | Public runtime API not in MVP | Validate build-time manifests instead |

---

## Dependencies & Test Blockers

**CRITICAL:** QA cannot proceed without these items from other teams.

### Backend/Architecture Dependencies (Pre-Implementation)

1. **Graph rule engine and diagnostics** - Architecture - Sprint 1
   - Needed for deterministic integrity assertions
   - Blocks P0 coverage if absent

2. **Immutable artifact ID enforcement** - Dev Lead - Sprint 1
   - Needed to validate migration and URL stability
   - Blocks P0/P1 coverage for ID safety

3. **Locale contract + canonical generation** - Architecture/SEO - Sprint 1-2
   - Needed for i18n + SEO regression checks
   - Blocks P1 coverage for locale correctness

### QA Infrastructure Setup (Pre-Implementation)

1. **Test Data Factories** - QA
   - Artifact fixtures for `project`, `adr`, `repo`, `article`
   - Auto-cleanup to preserve parallel safety

2. **Test Environments** - QA/Platform
   - Local build preview environment
   - CI ephemeral environment with artifact fixtures
   - Staging publish preview

**Example factory pattern:**

```typescript
import { test } from '@seontechnologies/playwright-utils/api-request/fixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('artifact fixture smoke @P0', async ({ apiRequest }) => {
  const artifactId = `adr-${faker.string.alphanumeric(8).toLowerCase()}`;

  const { status } = await apiRequest({
    method: 'POST',
    path: '/api/test/seed-artifact',
    body: { artifactId, type: 'adr' },
  });

  expect(status).toBe(201);
});
```

---

## Risk Assessment

### High-Priority Risks (Score >=6)

| Risk ID | Category | Description | Score | QA Test Coverage |
| --- | --- | --- | --- | --- |
| **R-001** | TECH | Graph rule engine missing/incorrect | **9** | Integrity rule engine tests + end-to-end dead-end detection |
| **R-002** | DATA | Mutable artifact ID regression | **6** | Mutation rejection tests + migration path tests |
| **R-003** | PERF | Performance budget drift | **6** | CI budget check validation + Lighthouse threshold tests |
| **R-004** | SEC | Unsanitized content injection | **6** | Security payload fixture tests + render sanitization checks |

### Medium/Low-Priority Risks

| Risk ID | Category | Description | Score | QA Test Coverage |
| --- | --- | --- | --- | --- |
| R-005 | OPS | Missing scheduled audits | 4 | Schedule + report generation validation |
| R-006 | BUS | Proof-path usability friction | 4 | User journey/regression tests |
| R-007 | DATA | Locale mismatch/indexing issues | 3 | Locale pair and hreflang assertions |
| R-008 | OPS | Signal-report lag | 2 | Basic reporting smoke tests |

---

## Entry Criteria

- [ ] Requirements and assumptions aligned across QA/Dev/PM
- [ ] CI preview environment available
- [ ] Artifact fixture generators available
- [ ] Blockers from Dependencies section resolved
- [ ] Proof-path base routes available for test execution

## Exit Criteria

- [ ] All P0 tests passing (100%)
- [ ] All P1 tests passing at >=95% or formally accepted with waivers
- [ ] No open P0/P1 defects for integrity/security/performance gates
- [ ] Coverage on P0/P1 requirements >=80%
- [ ] Coverage considered sufficient by QA + Dev Lead

---

## Test Coverage Plan

**IMPORTANT:** P0/P1/P2/P3 = priority and risk level, not execution timing.

### P0 (Critical)

**Criteria:** Blocks core proof chain + high risk (>=6) + no workaround

| Test ID | Requirement | Test Level | Risk Link | Notes |
| --- | --- | --- | --- | --- |
| **P0-001** | Reject orphan relation on build | Integration | R-001 | Blocking CI behavior |
| **P0-002** | Detect dead-end proof node | E2E | R-001 | Includes terminal exception support |
| **P0-003** | Prevent published ID mutation | Unit | R-002 | Hard fail outside migration mode |
| **P0-004** | Sanitize injected script payload in artifact content | Integration | R-004 | Assert escaped output |
| **P0-005** | Proof path main route loads within quality budget guard | E2E | R-003 | Threshold contract test |

**Total P0:** ~12 tests

---

### P1 (High)

**Criteria:** Important user flows + medium/high risk

| Test ID | Requirement | Test Level | Risk Link | Notes |
| --- | --- | --- | --- | --- |
| **P1-001** | Canonical and hreflang metadata correctness | Integration | R-007 | EN/pt-br both directions |
| **P1-002** | Breadcrumb chain continuity across artifact types | E2E | R-006 | No dead-end UX |
| **P1-003** | Related artifacts panel always shows valid next step | E2E | R-006 | Core credibility flow |
| **P1-004** | ID migration updates relationship references atomically | Integration | R-002 | No dangling references |
| **P1-005** | JS/page weight budget check execution | Integration | R-003 | CI gate behavior |

**Total P1:** ~20 tests

---

### P2 (Medium)

**Criteria:** Secondary flows + low/medium risk + edge cases

| Test ID | Requirement | Test Level | Risk Link | Notes |
| --- | --- | --- | --- | --- |
| **P2-001** | Empty registry states still provide valid navigation | E2E | R-006 | UX fallback |
| **P2-002** | Scheduled integrity audit report format and severity counts | Integration | R-005 | Ops readiness |
| **P2-003** | Search index includes new artifacts after build | Integration | R-006 | Discoverability |

**Total P2:** ~18 tests

---

### P3 (Low)

**Criteria:** Nice-to-have + exploratory + long-running checks

| Test ID | Requirement | Test Level | Risk Link | Notes |
| --- | --- | --- | --- | --- |
| **P3-001** | Exploratory navigation across mixed-language artifacts | E2E | R-008 | Human-in-loop validation |
| **P3-002** | Trend analysis for inbound signal report consistency | Integration | R-008 | Operational reporting |

**Total P3:** ~8 tests

---

## Execution Strategy

**Philosophy:** Run everything in PRs if <15 minutes; defer only expensive or long-running suites.

### Every PR: Playwright tests + integrity checks (~10-15 min)

- Functional E2E and integration suites (P0/P1/P2 functional coverage)
- Schema/link/integrity validations
- Quick performance budget contract checks
- Playwright parallelization target: 100s of tests in ~10-15 minutes

### Nightly: k6 performance tests + heavy quality suites (~30-60 min)

- k6 load/stress checks for proof-path and registry routes
- Full Lighthouse regression matrix
- Extended accessibility scans
- Full locale/link crawl validation

### Weekly: Chaos & long-running validation (~hours)

- Chaos-style resilience drills on validation jobs and publish pipeline recovery
- Deep exploratory proof-path review
- Architecture diagram/text-equivalence manual review
- Reliability trend review of integrity audits

---

## QA Effort Estimate

| Priority | Count | Effort Range | Notes |
| --- | --- | --- | --- |
| P0 | ~12 | ~1-1.5 weeks | Core integrity/security/perf gates |
| P1 | ~20 | ~1-2 weeks | Main proof path and locale flows |
| P2 | ~18 | ~0.5-1.5 weeks | Secondary and ops scenarios |
| P3 | ~8 | ~0.25-0.75 weeks | Exploratory and periodic checks |
| **Total** | ~58 | **~3-6 weeks** | **1 QA engineer full-time** |

Assumptions:

- Includes test design, implementation, debugging, and CI integration.
- Excludes backend/platform feature implementation effort.

---

## Implementation Planning Handoff

| Work Item | Owner | Target Milestone (Optional) | Dependencies/Notes |
| --- | --- | --- | --- |
| Implement graph integrity core test suite | QA + Dev | Sprint 1 | Depends on Story 3.1 baseline |
| Add locale metadata regression suite | QA | Sprint 2 | Depends on Stories 6.1-6.3 |
| Add scheduled audit verification suite | QA + Platform | Sprint 2 | Depends on Story 3.7 |

---

## Tooling & Access

| Tool or Service | Purpose | Access Required | Status |
| --- | --- | --- | --- |
| Playwright + playwright-utils | E2E/integration execution | CI runner + npm install | Ready |
| Lighthouse CI | Performance budget enforcement | CI integration | Pending |
| Link checker / custom graph validator | Relation integrity checks | Repo scripts + CI | Pending |

---

## Interworking & Regression

| Service/Component | Impact | Regression Scope | Validation Steps |
| --- | --- | --- | --- |
| `src/lib/graph/*` | Core relation logic | Unit + integration + E2E dead-end checks | Validate failing fixtures and normal paths |
| Locale/SEO metadata layer | Search/index health | Metadata tests + crawl tests | Validate canonical/hreflang pairs |
| Proof-path UI routes | Credibility journey | E2E full journey tests | Architecture -> ADR -> Repo -> Article |

---

## Appendix A: Code Examples & Tagging

```typescript
import { test } from '@seontechnologies/playwright-utils/api-request/fixtures';
import { expect } from '@playwright/test';

test('@P0 @Integrity orphan artifact is blocked', async ({ apiRequest }) => {
  const { status, body } = await apiRequest({
    method: 'POST',
    path: '/api/test/validate-graph',
    body: { fixture: 'orphan-article' },
  });

  expect(status).toBe(400);
  expect(body.severity).toBe('blocking');
});
```

---

## Appendix B: Knowledge Base References

- `risk-governance.md`
- `probability-impact.md`
- `test-levels-framework.md`
- `test-priorities-matrix.md`
- `test-quality.md`
- `playwright-cli.md`

---

**Generated by:** BMad TEA Agent  
**Workflow:** `_bmad/tea/testarch/test-design`
