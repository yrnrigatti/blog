import { faker } from '@faker-js/faker';

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'reader' | 'editor' | 'admin';
  createdAt: string;
};

const trackedUserIds = new Set<string>();

export const userFactory = {
  create(overrides: Partial<User> = {}): User {
    const user: User = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      role: 'reader',
      createdAt: new Date().toISOString(),
      ...overrides,
    };

    trackedUserIds.add(user.id);
    return user;
  },

  listCreatedIds(): string[] {
    return Array.from(trackedUserIds);
  },

  cleanup(): void {
    trackedUserIds.clear();
  },
};
