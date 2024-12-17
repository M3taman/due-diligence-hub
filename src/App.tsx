import { AppProviders } from "@/components/providers/AppProviders";
import { AppRoutes } from "@/components/routing/AppRoutes";

const App = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;