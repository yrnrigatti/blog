import type { Page } from '@playwright/test';

export const loginAs = async (page: Page, token: string): Promise<void> => {
  await page.context().addCookies([
    {
      name: 'session-token',
      value: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    },
  ]);
};
