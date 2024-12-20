import { useCallback } from 'react'

type AnalyticsEvent = {
  name: string
  properties?: Record<string, any>
}

export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    try {
      // Add your analytics implementation here
      console.log('Analytics event:', event)
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }, [])

  const trackPageView = useCallback((path: string) => {
    trackEvent({
      name: 'page_view',
      properties: { path }
    })
  }, [trackEvent])

  const trackError = useCallback((error: Error) => {
    trackEvent({
      name: 'error',
      properties: {
        message: error.message,
        stack: error.stack
      }
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackPageView,
    trackError
  }
}