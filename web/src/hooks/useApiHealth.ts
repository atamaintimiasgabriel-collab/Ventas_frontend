import { useCallback, useEffect, useRef, useState } from 'react';
import { healthService } from '../services/healthService';

export type ApiHealthStatus = 'loading' | 'online' | 'not-ready' | 'offline';

export function useApiHealth() {
  const [status, setStatus] = useState<ApiHealthStatus>('loading');
  const activeController = useRef<AbortController | null>(null);

  const checkHealth = useCallback(async () => {
    activeController.current?.abort();
    const controller = new AbortController();
    activeController.current = controller;
    try {
      await healthService.check(controller.signal);
      try {
        await healthService.checkReady(controller.signal);
        setStatus('online');
      } catch {
        if (!controller.signal.aborted) setStatus('not-ready');
      }
    } catch {
      if (!controller.signal.aborted) setStatus('offline');
    }
  }, []);

  const retry = useCallback(async () => {
    setStatus('loading');
    await checkHealth();
  }, [checkHealth]);

  useEffect(() => {
    const startId = globalThis.setTimeout(() => void checkHealth(), 0);
    return () => {
      globalThis.clearTimeout(startId);
      activeController.current?.abort();
    };
  }, [checkHealth]);

  return { status, retry };
}
