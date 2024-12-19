type AnalyticsEvent = {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  try {
    // Initialize analytics providers
    if (import.meta.env.VITE_GA_ID) {
      window.gtag?.('config', import.meta.env.VITE_GA_ID);
    }

    if (import.meta.env.VITE_MIXPANEL_ID) {
      window.mixpanel?.init(import.meta.env.VITE_MIXPANEL_ID);
    }
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
  }
};

export const trackEvent = (event: AnalyticsEvent) => {
  try {
    // Google Analytics
    window.gtag?.('event', event.name, {
      ...event.properties,
      timestamp: event.timestamp || Date.now()
    });

    // Mixpanel
    window.mixpanel?.track(event.name, {
      ...event.properties,
      timestamp: event.timestamp || Date.now()
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

export const trackPageView = (path: string) => {
  trackEvent({
    name: 'page_view',
    properties: { path }
  });
};

export const trackError = (error: Error) => {
  trackEvent({
    name: 'error',
    properties: {
      message: error.message,
      stack: error.stack
    }
  });
};