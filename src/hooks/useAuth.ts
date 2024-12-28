import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase, resetAuth } from '@/lib/supabase/client'
import { AUTH_ROLES } from '@/lib/auth/constants'
import type { UserRole, AuthState } from '@/lib/auth/types'

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
    isTrial: false
  })

  useEffect(() => {
    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, trial_expiry')
            .eq('id', session.user.id)
            .single()

          const isTrial = profile?.role === AUTH_ROLES.TRIAL && 
            profile?.trial_expiry && 
            new Date(profile.trial_expiry) > new Date()

          setState({
            user: {
              id: session.user.id,
              email: session.user.email!,
              role: profile?.role || AUTH_ROLES.GUEST,
              trialExpiry: profile?.trial_expiry
            },
            loading: false,
            isAuthenticated: true,
            isTrial
          })
        }
      } catch (error) {
        console.error('Auth setup failed:', error)
        setState(prev => ({ ...prev, loading: false }))
      }
    }

    setupAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setState({
            user: null,
            loading: false,
            isAuthenticated: false,
            isTrial: false
          })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const startTrial = async () => {
    try {
      const trialExpiry = new Date()
      trialExpiry.setDate(trialExpiry.getDate() + 7)

      const { data: profile, error } = await supabase
        .from('profiles')
        .update({
          role: AUTH_ROLES.TRIAL,
          trial_expiry: trialExpiry.toISOString()
        })
        .eq('id', state.user?.id)
        .single()

      if (error) throw error

      setState(prev => ({
        ...prev,
        user: {
          ...prev.user!,
          role: AUTH_ROLES.TRIAL,
          trialExpiry: trialExpiry.toISOString()
        },
        isTrial: true
      }))
    } catch (error: any) {
      if (error.status === 429) {
        console.error('Rate limit exceeded while starting trial:', error);
        // Optionally notify the user or implement additional retry logic
      } else {
        console.error('Failed to start trial:', error);
      }
      throw error;
    }
  }

  return {
    ...state,
    startTrial
  }
}