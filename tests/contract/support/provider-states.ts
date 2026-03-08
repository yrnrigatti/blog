export type ProviderStateInput = {
  name: string;
  params: Record<string, unknown>;
};

export const blogHealthState = (): ProviderStateInput => ({
  name: 'API health endpoint is available',
  params: { service: 'blog-api' },
});
