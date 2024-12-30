import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { AppProviders } from "@/components/providers/AppProviders";
import { router } from "@/routes";
import { Loading } from '@/components/ui/loading';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@/components/analytics/Analytics';
import { HelmetProvider } from "react-helmet-async";
import Index from './pages/Index';
import FAQ from './pages/FAQ';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import React from 'react';
import TestSupabase from './components/TestSupabase'; // Example component

const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AppProviders>
          <RouterProvider router={router} />
          <div>
            <h1>Welcome to Due Diligence Hub</h1>
            <TestSupabase />
          </div>
        </AppProviders>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;