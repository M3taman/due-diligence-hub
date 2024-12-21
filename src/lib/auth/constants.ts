export const AUTH_CONFIG = {
  TRIAL_DURATION: 7 * 24 * 60 * 60 * 1000,
  ROUTES: {
    PUBLIC: ['/', '/about', '/login', '/signup'],
    TRIAL: ['/dashboard', '/research'],
    PROTECTED: ['/premium', '/analysis']
  },
  FEATURES: {
    TRIAL: ['basic-analysis', 'research-view'],
    PREMIUM: ['advanced-analysis', 'export', 'team-access']
  }
} as const