import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { collectDiagnostics, logError } from './lib/diagnostics';

// Initialize Telegram WebApp
const WebApp = (window as any).Telegram?.WebApp;

console.log('Anti-Budget mounting...', { WebApp: WebApp, WebAppReady: WebApp });
console.log('Diagnostics:', collectDiagnostics());

if (WebApp) {
  WebApp.ready();
  WebApp.expand();
} else {
  console.warn('Telegram WebApp not available');
  logError('Telegram WebApp not available');
}

// Global error handler
window.addEventListener('error', (e) => logError(e.error || e.message));
window.addEventListener('unhandledrejection', (e) => logError(e.reason));

// Render app
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Remove static fallback once React mounts
const preRoot = document.getElementById('pre-root');
if (preRoot) preRoot.remove();
