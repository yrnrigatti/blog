import type { APIRequestContext } from '@playwright/test';
import { userFactory, type User } from './factories/user-factory';

export type SeededData = {
  seedUser: (request: APIRequestContext, overrides?: Partial<User>) => Promise<User>;
  cleanup: () => void;
};

export const createSeededData = (): SeededData => ({
  async seedUser(request: APIRequestContext, overrides: Partial<User> = {}): Promise<User> {
    const user = userFactory.create(overrides);

    // Seed through API when endpoint exists. Ignore failures for local scaffold mode.
    await request.post('/api/users', { data: user }).catch(() => undefined);

    return user;
  },

  cleanup(): void {
    userFactory.cleanup();
  },
});
