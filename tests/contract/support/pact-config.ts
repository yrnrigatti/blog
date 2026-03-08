import { PactV4 } from '@pact-foundation/pact';
import path from 'node:path';

export const createPact = (overrides?: { consumer?: string; provider?: string }): PactV4 =>
  new PactV4({
    dir: path.resolve(process.cwd(), 'pacts'),
    consumer: overrides?.consumer ?? 'blog-web',
    provider: overrides?.provider ?? 'blog-api',
    logLevel: 'warn',
  });
