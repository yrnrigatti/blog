import { test as base, expect, mergeTests } from '@playwright/test';
import { createSeededData, type SeededData } from './custom-fixtures';

type AppFixtures = {
  seededData: SeededData;
};

const appTest = base.extend<AppFixtures>({
  seededData: async ({}, use) => {
    const seededData = createSeededData();
    await use(seededData);
    seededData.cleanup();
  },
});

export const test = mergeTests(appTest);
export { expect };
