import { useState, useCallback, useEffect, useContext } from 'react'
import { SidebarContext } from '@/contexts/sidebar'
import { useMediaQuery } from '@/hooks/use-media-query'

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev)
  }, [])

  // Auto collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true)
    }
  }, [isMobile])

  const value = {
    isCollapsed,
    toggleSidebar,
  }

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

// Helper hook for components
export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider')
  }
  return context
}