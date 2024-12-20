import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function Analytics() {
  const location = useLocation()

  useEffect(() => {
    // Track page views
    try {
      window.gtag?.('config', import.meta.env.VITE_GA_ID, {
        page_path: location.pathname
      })
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }, [location])

  return null
}