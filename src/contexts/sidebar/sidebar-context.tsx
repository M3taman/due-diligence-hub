import { createContext, useContext } from 'react'
import type { SidebarContextType } from './sidebar-types'

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export * from './sidebar-context'
export * from './sidebar-types'