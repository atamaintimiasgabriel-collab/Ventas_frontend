import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiRequest, buildApiUrl, normalizeApiError } from './httpClient';
import { ApiError } from './httpTypes';
import { healthService } from '../services/healthService';

afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); });

describe('HTTP infrastructure', () => {
  it('builds normalized API URLs', () => {
    expect(buildApiUrl('/health', 'https://localhost:7249/')).toBe('https://localhost:7249/health');
    expect(buildApiUrl('health/ready', 'https://localhost:7249')).toBe('https://localhost:7249/health/ready');
  });

  it('calls health and reads JSON', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ status: 'Healthy' }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    }));
    await expect(healthService.check()).resolves.toEqual({ status: 'Healthy' });
    expect(fetchMock).toHaveBeenCalledWith('https://localhost:7249/health', expect.objectContaining({ method: 'GET' }));
  });

  it('calls readiness', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }));
    await expect(healthService.checkReady()).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith('https://localhost:7249/health/ready', expect.any(Object));
  });

  it('normalizes HTTP JSON errors and preserves traceId', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(
      JSON.stringify({ status: 409, message: 'Conflicto controlado', traceId: 'trace-123' }),
      { status: 409, headers: { 'Content-Type': 'application/json' } },
    ));
    const error = await apiRequest('/health').catch(value => value as ApiError);
    expect(error).toMatchObject({ message: 'Conflicto controlado', status: 409, traceId: 'trace-123' });
  });

  it('normalizes mensaje and DataAnnotations variants', () => {
    expect(normalizeApiError(401, { mensaje: 'No autorizado' }, 'Fallback'))
      .toMatchObject({ status: 401, message: 'No autorizado' });
    expect(normalizeApiError(400, {
      title: 'Validation failed', errors: { Nombre: ['Nombre obligatorio.'], Precio: ['Precio inválido.'] }, traceId: 'validation-trace',
    }, 'Fallback')).toMatchObject({
      status: 400, message: 'Nombre obligatorio. Precio inválido.', traceId: 'validation-trace',
    });
  });

  it('classifies network errors', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));
    const error = await apiRequest('/health').catch(value => value as ApiError);
    expect(error).toMatchObject({ isNetworkError: true, isTimeout: false });
  });

  it('classifies timeouts', async () => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, 'fetch').mockImplementation((_input, init) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    }));
    const request = apiRequest('/health', { timeoutMs: 25 });
    const assertion = expect(request).rejects.toMatchObject({ isTimeout: true });
    await vi.advanceTimersByTimeAsync(25);
    await assertion;
  });

  it('supports caller cancellation', async () => {
    const controller = new AbortController();
    vi.spyOn(globalThis, 'fetch').mockImplementation((_input, init) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    }));
    const request = apiRequest('/health', { signal: controller.signal });
    controller.abort();
    await expect(request).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('accepts a successful response without body', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 204 }));
    await expect(apiRequest('/health')).resolves.toBeUndefined();
  });
});
