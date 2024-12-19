import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { initAnalytics } from '@/utils/analytics';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="dudil-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);