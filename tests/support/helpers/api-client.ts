import { request, type APIRequestContext } from '@playwright/test';

export const createApiClient = async (): Promise<APIRequestContext> => {
  const baseURL = process.env.API_URL ?? process.env.BASE_URL ?? 'http://localhost:4321';
  return request.newContext({ baseURL });
};
