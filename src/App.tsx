import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { AppProviders } from "@/components/providers/AppProviders";
import { AppRoutes } from "@/components/routing/AppRoutes";
import { Loading } from '@/components/ui/loading';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@/components/analytics/Analytics';

const App = () => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <Suspense fallback={<Loading />}>
          <AppRoutes />
          <Toaster />
          <Analytics />
        </Suspense>
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;