import { httpClient } from '../api/httpClient';

export type HealthResponse = Record<string, unknown> | string | undefined;

export const healthService = {
  check(signal?: AbortSignal) {
    return httpClient.get<HealthResponse>('/health', { signal });
  },
  checkReady(signal?: AbortSignal) {
    return httpClient.get<HealthResponse>('/health/ready', { signal });
  },
};
