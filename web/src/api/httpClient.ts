import { environment } from '../config/environment';
import { ApiError, type ApiRequestOptions } from './httpTypes';

type ErrorPayload = Record<string, unknown>;

function isRecord(value: unknown): value is ErrorPayload {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function validationMessage(errors: unknown): string | undefined {
  if (!isRecord(errors)) return undefined;
  const messages = Object.values(errors)
    .flatMap(value => Array.isArray(value) ? value : [value])
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);
  return messages.length ? messages.join(' ') : undefined;
}

export function buildApiUrl(path: string, baseUrl = environment.apiBaseUrl): string {
  const normalizedBase = baseUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function normalizeApiError(status: number, payload: unknown, fallback: string): ApiError {
  const body = isRecord(payload) ? payload : undefined;
  const message = body
    ? stringValue(body.message)
      ?? stringValue(body.mensaje)
      ?? validationMessage(body.errors)
      ?? stringValue(body.title)
      ?? fallback
    : stringValue(payload) ?? fallback;
  return new ApiError(message, {
    status,
    traceId: body ? stringValue(body.traceId) : undefined,
  });
}

async function parseResponse(response: Response, responseType: ApiRequestOptions['responseType']): Promise<unknown> {
  if (response.status === 204 || response.status === 205) return undefined;
  const text = await response.text();
  if (!text) return undefined;
  const contentType = response.headers.get('content-type') ?? '';
  if (responseType === 'text' || !contentType.includes('json')) return text;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? environment.apiTimeoutMs;
  let timedOut = false;
  const timeoutId = globalThis.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const abortFromCaller = () => controller.abort(options.signal?.reason);
  options.signal?.addEventListener('abort', abortFromCaller, { once: true });

  const headers = new Headers(options.headers);
  headers.set('Accept', options.responseType === 'text' ? 'text/plain' : 'application/json');
  let body: BodyInit | undefined;
  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(buildApiUrl(path), {
      ...options,
      method: options.method ?? 'GET',
      headers,
      body,
      signal: controller.signal,
    });
    const payload = await parseResponse(response, options.responseType);
    if (!response.ok) {
      throw normalizeApiError(response.status, payload, `La API respondió con estado ${response.status}.`);
    }
    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (timedOut) {
      throw new ApiError('La solicitud superó el tiempo de espera.', { isTimeout: true, cause: error });
    }
    if (options.signal?.aborted) throw error;
    throw new ApiError('No fue posible conectar con la API.', { isNetworkError: true, cause: error });
  } finally {
    globalThis.clearTimeout(timeoutId);
    options.signal?.removeEventListener('abort', abortFromCaller);
  }
}

export const httpClient = {
  get<T>(path: string, options: Omit<ApiRequestOptions, 'method' | 'body'> = {}) {
    return apiRequest<T>(path, { ...options, method: 'GET' });
  },
  request: apiRequest,
};
