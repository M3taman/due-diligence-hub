export type UserRole = 'guest' | 'trial' | 'authenticated' | 'admin'

export interface AuthUser {
  id: string
  role: UserRole
  email: string
  trialExpiry?: string
}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  isAuthenticated: boolean
  isTrial: boolean
}