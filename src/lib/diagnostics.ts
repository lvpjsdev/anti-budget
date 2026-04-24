// Diagnostics utility for Telegram Mini Apps
// Collects environment info and logs for debugging

export interface Diagnostics {
  timestamp: number;
  userAgent: string;
  url: string;
  telegramAvailable: boolean;
  telegramVersion?: string;
  indexedDBavailable: boolean;
  serviceWorkerActive: boolean;
  assetsLoaded: boolean;
  ReactMounted: boolean;
  errors: Array<{ ts: number; msg: string; stack?: string }>;
}

const DIAGNOSTICS_KEY = 'anti-budget-diags';

export function collectDiagnostics(): Diagnostics {
  const diag: Diagnostics = {
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    telegramAvailable: typeof (window as any).Telegram !== 'undefined' && !!((window as any).Telegram?.WebApp),
    telegramVersion: typeof (window as any).Telegram !== 'undefined' ? ((window as any).Telegram?.WebApp as any)?.version : undefined,
    indexedDBavailable: typeof indexedDB !== 'undefined',
    serviceWorkerActive: false,
    assetsLoaded: document.querySelectorAll('script[src*="assets/"], link[rel="stylesheet"][href*="assets/"]').length > 0,
    ReactMounted: document.getElementById('root')?.children?.length > 0,
    errors: [],
  };

  // Check service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      diag.serviceWorkerActive = regs.length > 0;
    });
  }

  // Capture any previous errors
  diag.errors = getPrevErrors();

  return diag;
}

function getPrevErrors(): Array<{ ts: number; msg: string; stack?: string }> {
  const storage = localStorage.getItem(DIAGNOSTICS_KEY);
  if (storage) {
    try {
      const parsed = JSON.parse(storage);
      return parsed.errors || [];
    } catch {
      return [];
    }
  }
  return [];
}

export function logError(error: Error | string): void {
  const errors = getPrevErrors();
  errors.push({
    ts: Date.now(),
    msg: typeof error === 'string' ? error : error.message,
    stack: typeof error === 'string' ? undefined : error.stack,
  });
  localStorage.setItem(DIAGNOSTICS_KEY, JSON.stringify({ errors }));
}

export function clearDiagnostics(): void {
  localStorage.removeItem(DIAGNOSTICS_KEY);
}

export function getDiagnosticsReport(): string {
  const diag = collectDiagnostics();
  const prevErrors = getPrevErrors();
  return JSON.stringify({ ...diag, previousErrors: prevErrors }, null, 2);
}

// Auto-log on mount
if (typeof window !== 'undefined') {
  console.log('[Diagnostics] Collected:', collectDiagnostics());
}
