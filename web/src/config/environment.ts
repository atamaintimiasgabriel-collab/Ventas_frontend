const DEFAULT_DEVELOPMENT_API_URL = 'https://localhost:7249';

function normalizeBaseUrl(value: string): string {
  const url = new URL(value);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('VITE_API_BASE_URL debe usar http o https.');
  }
  return url.toString().replace(/\/$/, '');
}

function resolveApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  if (configuredUrl) return normalizeBaseUrl(configuredUrl);
  if (import.meta.env.DEV || import.meta.env.MODE === 'test') return DEFAULT_DEVELOPMENT_API_URL;
  throw new Error('VITE_API_BASE_URL es obligatoria fuera de desarrollo.');
}

export const environment = Object.freeze({
  apiBaseUrl: resolveApiBaseUrl(),
  apiTimeoutMs: 10_000,
});
