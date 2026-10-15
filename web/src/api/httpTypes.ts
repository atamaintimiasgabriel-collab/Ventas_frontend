export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type ApiResponseType = 'json' | 'text';

export interface ApiRequestOptions extends Omit<RequestInit, 'body' | 'method' | 'signal'> {
  method?: HttpMethod;
  body?: unknown;
  signal?: AbortSignal;
  timeoutMs?: number;
  responseType?: ApiResponseType;
}

interface ApiErrorOptions {
  status?: number;
  traceId?: string;
  isNetworkError?: boolean;
  isTimeout?: boolean;
  cause?: unknown;
}

export class ApiError extends Error {
  readonly status?: number;
  readonly traceId?: string;
  readonly isNetworkError: boolean;
  readonly isTimeout: boolean;

  constructor(message: string, options: ApiErrorOptions = {}) {
    super(message, { cause: options.cause });
    this.name = 'ApiError';
    this.status = options.status;
    this.traceId = options.traceId;
    this.isNetworkError = options.isNetworkError ?? false;
    this.isTimeout = options.isTimeout ?? false;
  }
}
