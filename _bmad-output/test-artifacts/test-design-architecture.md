---
stepsCompleted: []
lastStep: ''
lastSaved: ''
workflowType: 'testarch-test-design'
inputDocuments: []
---

# Test Design for Architecture: blog

**Purpose:** Architectural concerns, testability gaps, and NFR requirements for review by Architecture/Dev teams. Serves as a contract between QA and Engineering on what must be addressed before test development begins.

**Date:** 2026-03-08
**Author:** Yorran
**Status:** Architecture Review Pending
**Project:** blog
**PRD Reference:** _bmad-output/planning-artifacts/prd.md
**ADR Reference:** _bmad-output/planning-artifacts/architecture.md

---

## Executive Summary

**Scope:** System-level testability and risk design for the static-first artifact graph platform (Astro + content collections + proof path).

**Business Context** (from PRD):

- **Revenue/Impact:** Product credibility and technical inbound opportunities depend on trustworthy artifact traceability.
- **Problem:** Technical claims are hard to validate without connected evidence.
- **GA Launch:** MVP phase (no fixed date specified).

**Architecture** (from architecture.md):

- **Key Decision 1:** Static-first Astro architecture with selective hydration.
- **Key Decision 2:** Stable artifact IDs and bidirectional relationship model.
- **Key Decision 3:** CI quality gates for schema, link integrity, i18n, SEO, and accessibility.

**Expected Scale** (from PRD/NFR):

- 10x artifact growth target without degradation in navigation/index performance.

**Risk Summary:**

- **Total risks**: 8
- **High-priority (>=6)**: 4 risks requiring immediate mitigation
- **Test effort**: ~70-130 scenarios (~3-6 weeks for 1 QA, ~2-4 weeks for 2 QAs)

---

## Quick Guide

### 🚨 BLOCKERS - Team Must Decide (Can't Proceed Without)

**Pre-Implementation Critical Path**

1. **B-001: Artifact Graph Enforcement Layer** - Implement centralized graph rule engine and blocking CI gate for orphan/missing/dead-end links (owner: Architecture + Platform).
2. **B-002: Immutable Artifact ID Policy** - Enforce immutable IDs for published artifacts with migration workflow for any exceptional rename (owner: Architecture + Dev Lead).
3. **B-003: Locale Pairing Contract** - Define strict EN/pt-br pairing rules and canonical/hreflang generation contract (owner: Architecture + SEO owner).

**What we need from team:** Complete these 3 items pre-implementation or trustworthy automated coverage is blocked.

---

### ⚠️ HIGH PRIORITY - Team Should Validate (We Provide Recommendation, You Approve)

1. **R-001: Link Integrity Regression** - Approve CI-as-gate policy (blocking severity) before first production publish.
2. **R-003: Performance Budget Drift** - Approve automated bundle/page-weight guardrails in PR checks.
3. **R-004: Security Input Risk** - Approve mandatory content sanitization + dangerous markup policy.

**What we need from team:** Review and approve recommendations for implementation sequencing.

---

### 📋 INFO ONLY - Solutions Provided (Review, No Decisions Needed)

1. **Test strategy**: Pyramid centered on unit/integration for graph logic + selective E2E for proof path.
2. **Tiered CI/CD**: PR for functional/integrity checks, nightly for heavy audits.
3. **Coverage**: 70-130 scenarios prioritized P0-P3.
4. **Quality gates**: P0 pass 100%, P1 >=95%, no open high-risk blockers.

---

## For Architects and Devs - Open Topics

### Risk Assessment

**Total risks identified**: 8 (4 high-priority score >=6, 3 medium, 1 low)

#### High-Priority Risks (Score >=6) - IMMEDIATE ATTENTION

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation | Owner | Timeline |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **R-001** | **TECH** | Graph relation engine missing or non-authoritative causes dead-end proof paths | 3 | 3 | **9** | Implement central resolver + CI blocking checks (Stories 3.1-3.3) | Architecture | Sprint 1 |
| **R-002** | **DATA** | Mutable artifact IDs break canonical URLs and relation pointers | 2 | 3 | **6** | Enforce immutable IDs + migration protocol (Stories 1.2, 3.6) | Dev Lead | Sprint 1 |
| **R-003** | **PERF** | JS/page weight and LCP budgets drift without automation | 3 | 2 | **6** | Add Lighthouse/build budget thresholds in CI | Platform | Sprint 1-2 |
| **R-004** | **SEC** | Unsanitized artifact content introduces XSS/injection vectors | 2 | 3 | **6** | Sanitize markdown/rendered HTML and add security tests | Security + Dev | Sprint 1 |

#### Medium-Priority Risks (Score 3-5)

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-005 | OPS | Missing scheduled integrity audits allows stale broken links | 2 | 2 | 4 | Add scheduled audit job + report (Story 3.7) | Platform |
| R-006 | BUS | Weak proof-path UX reduces credibility conversion | 2 | 2 | 4 | Validate journey and recovery states (Story 2.9) | Product + UX |
| R-007 | DATA | Incomplete EN/pt-br pairing causes duplicate/incorrect indexing | 1 | 3 | 3 | Enforce locale pairing checks (Stories 6.1-6.3) | SEO + Dev |

#### Low-Priority Risks (Score 1-2)

| Risk ID | Category | Description | Probability | Impact | Score | Action |
| --- | --- | --- | --- | --- | --- | --- |
| R-008 | OPS | Non-critical reporting lag for inbound signal summaries | 1 | 2 | 2 | Monitor |

#### Risk Category Legend

- **TECH**: Technical/architecture
- **SEC**: Security
- **PERF**: Performance
- **DATA**: Data integrity
- **BUS**: Business impact
- **OPS**: Operational

---

### Testability Concerns and Architectural Gaps

**ACTIONABLE CONCERNS - Architecture Team Must Address**

#### 1. Blockers to Fast Feedback (WHAT WE NEED FROM ARCHITECTURE)

| Concern | Impact | What Architecture Must Provide | Owner | Timeline |
| --- | --- | --- | --- | --- |
| **No canonical graph validation API/module** | Cannot deterministically assert relation integrity | Single `lib/graph` authority + rule engine with typed diagnostics | Architecture | Sprint 1 |
| **No immutable ID enforcement policy** | Tests and links become brittle after edits | ID immutability guard + explicit migration command | Dev Lead | Sprint 1 |
| **No locale contract enforcement** | i18n tests cannot assert deterministic pairing | Locale registry + canonical/hreflang generation contract | Architecture + SEO | Sprint 1 |

#### 2. Architectural Improvements Needed (WHAT SHOULD BE CHANGED)

1. **Validation severity model in code**
   - **Current problem**: Severity rules are documented but not yet executable.
   - **Required change**: Implement shared severity schema and CI adapter.
   - **Impact if not fixed**: Inconsistent release gates.
   - **Owner**: Platform
   - **Timeline**: Sprint 1

2. **Quality telemetry hooks for proof path**
   - **Current problem**: No structured event stream for dead-end attempts.
   - **Required change**: Add lightweight event capture for proof navigation outcomes.
   - **Impact if not fixed**: Harder incident triage and prioritization.
   - **Owner**: Dev
   - **Timeline**: Sprint 2

---

### Testability Assessment Summary

#### What Works Well

- Astro static-first direction reduces runtime flakiness and supports stable deterministic checks.
- Architecture already defines `lib/graph` as relationship authority.
- PRD/NFR quality targets are measurable and testable.

#### Accepted Trade-offs (No Action Required)

- No runtime database in MVP is acceptable; content-collection testing is sufficient.
- No real-time systems in MVP reduces chaos/perf test complexity at this phase.

---

### Risk Mitigation Plans (High-Priority Risks >=6)

#### R-001: Graph relation engine missing/fragmented (Score: 9) - CRITICAL

**Mitigation Strategy:**

1. Implement graph rule engine for orphan, missing, and dead-end detection.
2. Enforce blocking CI gate for severity `blocking`.
3. Add regression tests for terminal exceptions and false-positive prevention.

**Owner:** Architecture + Platform  
**Timeline:** Sprint 1  
**Status:** Planned  
**Verification:** CI fails when introducing orphan/dead-end artifacts.

---

#### R-002: Mutable artifact IDs break references (Score: 6) - HIGH

**Mitigation Strategy:**

1. Lock published IDs by default.
2. Add migration command that updates relation graph and redirects atomically.
3. Add tests for ID-change rejection and migration success path.

**Owner:** Dev Lead  
**Timeline:** Sprint 1  
**Status:** Planned  
**Verification:** Attempted ID mutation fails unless migration mode is explicitly used.

---

#### R-003: Performance budget drift (Score: 6) - HIGH

**Mitigation Strategy:**

1. Add budget checks for JS gzipped size and page weight in PR CI.
2. Add Lighthouse threshold checks for proof-path routes.
3. Add regression alerts for trend degradation.

**Owner:** Platform  
**Timeline:** Sprint 1-2  
**Status:** Planned  
**Verification:** PR blocked when budgets are exceeded.

---

#### R-004: Unsanitized content security risk (Score: 6) - HIGH

**Mitigation Strategy:**

1. Add strict markdown/HTML sanitization policy.
2. Add security unit tests for scripted payloads.
3. Add CI scanning for unsafe patterns in content artifacts.

**Owner:** Security + Dev  
**Timeline:** Sprint 1  
**Status:** Planned  
**Verification:** Sanitization tests and security checks pass for known malicious fixtures.

---

### Assumptions and Dependencies

#### Assumptions

1. Core artifact routes remain pre-rendered (static-first) in MVP.
2. Published artifact IDs are immutable and treated as canonical references.
3. EN/pt-br locale pairing remains mandatory for canonical/hreflang consistency.

#### Dependencies

1. CI pipeline baseline from Story 1.8 - Required by Sprint 1
2. Graph rule engine from Story 3.1 - Required by Sprint 1
3. Locale contract implementation from Stories 6.1-6.3 - Required by Sprint 2

#### Risks to Plan

- **Risk**: Delayed CI setup slows all validation work.
  - **Impact**: High-risk regressions can pass unnoticed.
  - **Contingency**: Run local pre-publish integrity command as temporary gate.

---

**End of Architecture Document**
