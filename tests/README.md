# Test Framework Guide

This project uses Playwright for end-to-end testing and Pact + Vitest for consumer contract testing.

## Prerequisites

- Node.js `24.x` (see `.nvmrc`)
- Install dependencies:

```bash
npm install
```

- Copy environment template and update values:

```bash
cp .env.example .env
```

## Running Tests

### Local E2E

```bash
npm run test:e2e
```

### Headed E2E

```bash
npm run test:e2e:headed
```

### Debug E2E

```bash
npm run test:e2e:debug
```

### Consumer Contract Tests

```bash
npm run test:pact:consumer
```

### Pact Broker Flow

```bash
npm run publish:pact
npm run can:i:deploy:consumer
npm run record:consumer:deployment -- --env=dev
```

## Architecture Overview

- `tests/e2e/`: browser-based E2E test specs.
- `tests/support/fixtures/`: test fixture composition and app-level test context.
- `tests/support/fixtures/factories/`: faker-based test data factories with cleanup hooks.
- `tests/support/helpers/`: API, auth, and network helper utilities.
- `tests/contract/consumer/`: Pact consumer contract tests (`.pacttest.ts`).
- `tests/contract/support/`: Pact config, provider states, and helper adapters.

## Best Practices

- Prefer `data-testid` selectors for resilient UI tests.
- Use Given/When/Then naming in test scenarios.
- Seed setup data through APIs or fixtures; avoid UI setup flows.
- Keep tests isolated with factory-generated unique data.
- Keep cleanup deterministic using fixture teardown and factory cleanup.
- Avoid hard waits and prefer event/assertion-based synchronization.

## CI Integration Notes

- Contract CI workflow: `.github/workflows/contract-test-consumer.yml`.
- CI action for breaking-change detection: `.github/actions/detect-breaking-change/action.yml`.
- Pact publishing and deployment safety checks run from repository scripts.
- Keep `PACT_BROKER_BASE_URL` and `PACT_BROKER_TOKEN` configured as CI secrets.

## Knowledge References

- `_bmad/tea/testarch/knowledge/playwright-config.md`
- `_bmad/tea/testarch/knowledge/fixtures-composition.md`
- `_bmad/tea/testarch/knowledge/data-factories.md`
- `_bmad/tea/testarch/knowledge/pact-consumer-framework-setup.md`
