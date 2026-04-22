import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
      };
    };
  }
}

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

window.Telegram?.WebApp?.ready()
