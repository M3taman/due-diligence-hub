import { createBrowserRouter } from "react-router-dom"
import { Layout } from "@/components/Layout"
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
    element: <Layout />
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <Layout>
            <Dashboard />
          </Layout>
        </Suspense>
      </ProtectedRoute>
    )
  },
  {
    path: "/research",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading Research...</div>}>
          <Layout>
            <Research />
          </Layout>
        </Suspense>
      </ProtectedRoute>
    )
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading Settings...</div>}>
          <Layout>
            <Settings />
          </Layout>
        </Suspense>
      </ProtectedRoute>
    )
  },
  {
    path: "/faq",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading FAQ...</div>}>
          <Layout>
            <FAQ />
          </Layout>
        </Suspense>
      </ProtectedRoute>
    )
  },
  {
    path: "/clients",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading Clients...</div>}>
          <Layout>
            <Clients />
          </Layout>
        </Suspense>
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>
  }
])