import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading size="lg" text="Loading..." />
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
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}