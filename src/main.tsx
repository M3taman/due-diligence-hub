import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { initAnalytics } from '@/utils/analytics';
import App from './App';
import './index.css';

// Initialize analytics in production
if (import.meta.env.PROD) {
  initAnalytics();
}

// Register service worker
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);