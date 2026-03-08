import { MatchersV3, type V3MockServer } from '@pact-foundation/pact';
import { describe, expect, it } from 'vitest';
import { createPact } from '../support/pact-config';
import { createProviderState, setJsonContent } from '../support/consumer-helpers';
import { blogHealthState } from '../support/provider-states';
import { getHealth, setApiUrl } from '../../../src/lib/api/health-client';

const pact = createPact();
const { like, string } = MatchersV3;

describe('Blog API consumer contract', () => {
  it('fetches health status from provider', async () => {
    const [stateName, stateParams] = createProviderState(blogHealthState());

    await pact
      .addInteraction()
      .given(stateName, stateParams as any)
      .uponReceiving('a request for service health')
      .withRequest(
        'GET',
        '/api/health',
        setJsonContent({
          headers: { Accept: 'application/json' },
        }) as any,
      )
      .willRespondWith(
        200,
        setJsonContent({
          body: like({
            status: string('ok'),
          }),
        }) as any,
      )
      .executeTest(async (mockServer: V3MockServer) => {
        setApiUrl(mockServer.url);
        const result = await getHealth();
        expect(result.status).toBe('ok');
      });
  });
});
