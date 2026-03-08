import type { Page, Route } from '@playwright/test';

export const mockJson = async (page: Page, url: string, payload: unknown, status = 200): Promise<void> => {
  await page.route(url, async (route: Route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(payload),
    });
  });
};
