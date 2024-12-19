import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Research from "@/pages/Research";
import Settings from "@/pages/Settings";
import FAQ from "@/pages/FAQ";
import Login from "@/pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/research"
        element={
          <ProtectedRoute>
            <Layout>
              <Research />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/faq"
        element={
          <ProtectedRoute>
            <Layout>
              <FAQ />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analysis/:symbol"
        element={
          <ProtectedRoute>
            <Layout>
              <Research />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <div className="flex items-center justify-center h-full">
              <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            </div>
          </Layout>
        }
      />
    </Routes>
  );
};