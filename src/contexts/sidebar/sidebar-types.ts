import { type ReactNode } from 'react'

/**
 * Sidebar configuration options
 */
export interface SidebarConfig {
  defaultCollapsed?: boolean
  mobileBreakpoint?: number
  persistState?: boolean
}

/**
 * Context type definitions
 */
export interface SidebarContextType {
  isCollapsed: boolean
  toggleSidebar: () => void
  isMobile: boolean
  setCollapsed: (collapsed: boolean) => void
}

/**
 * Provider type definitions
 */
export interface SidebarProviderProps {
  children: ReactNode
  config?: SidebarConfig
}