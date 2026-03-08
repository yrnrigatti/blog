let apiUrl = process.env.API_URL ?? 'http://localhost:4321';

export const setApiUrl = (url: string): void => {
  apiUrl = url;
};

export type HealthResponse = {
  status: string;
};

export const getHealth = async (): Promise<HealthResponse> => {
  const response = await fetch(`${apiUrl}/api/health`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Health request failed with status ${response.status}`);
  }

  return (await response.json()) as HealthResponse;
};
