import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from './client'
import { Loading } from '@/components/ui/loading'
import type { SupabaseContextType } from './types'

interface SupabaseProviderProps {
  children: ReactNode
}

const SupabaseContext = createContext<SupabaseContextType>({
  session: null,
  loading: true,
})

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window === 'undefined') return

    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession }, error: sessionError } = 
          await supabase.auth.getSession()
        
        if (sessionError) throw sessionError
        setSession(initialSession)

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event: string, session: Session | null) => {
            setSession(session)
          }
        )

        return () => subscription.unsubscribe()
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to initialize auth'))
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  if (error) {
    throw error // ErrorBoundary will catch this
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading size="lg" />
      </div>
    )
  }

  return (
    <SupabaseContext.Provider value={{ session, loading }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}