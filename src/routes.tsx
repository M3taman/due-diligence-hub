import { createBrowserRouter } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { AutoTrialInit } from "@/components/AutoTrialInit"
import { ProtectedRoute } from "@/components/routing/ProtectedRoute"
import { Suspense, lazy } from "react"

const Dashboard = lazy(() => import("@/pages/Dashboard"))
const Research = lazy(() => import("@/pages/Research"))
const Settings = lazy(() => import("@/pages/Settings"))
const FAQ = lazy(() => import("@/pages/FAQ"))
const Clients = lazy(() => import("@/pages/Clients"))

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AutoTrialInit />
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout>
          <Suspense fallback={<div>Loading Dashboard...</div>}>
            <Dashboard />
          </Suspense>
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/research",
    element: (
      <ProtectedRoute>
        <Layout>
          <Suspense fallback={<div>Loading Research...</div>}>
            <Research />
          </Suspense>
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Layout>
          <Suspense fallback={<div>Loading Settings...</div>}>
            <Settings />
          </Suspense>
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/faq",
    element: (
      <ProtectedRoute>
        <Layout>
          <Suspense fallback={<div>Loading FAQ...</div>}>
            <FAQ />
          </Suspense>
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "/clients",
    element: (
      <ProtectedRoute>
        <Layout>
          <Suspense fallback={<div>Loading Clients...</div>}>
            <Clients />
          </Suspense>
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>
  }
])