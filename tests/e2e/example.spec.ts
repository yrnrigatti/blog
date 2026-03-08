import { test, expect } from '../support/fixtures/index';
import { mockJson } from '../support/helpers/network';

test('Given locale home page, when loading and calling api, then renders and returns mocked health', async ({ page }) => {
  await mockJson(page, '**/api/health', { status: 'ok' });

  await page.goto('/en/');

  await expect(page.getByTestId('home-root')).toBeVisible();

  const healthStatus = await page.evaluate(async () => {
    const response = await fetch('/api/health');
    const body = await response.json();
    return body.status;
  });

  expect(healthStatus).toBe('ok');
});
