import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icons } from "./ui/icons"
import { useToast } from "./ui/use-toast"
import { startTrial } from "@/lib/supabase/auth"
import { AUTH_CONFIG } from "@/lib/auth/constants"
import { supabase } from './client'
import { AUTH_ROLES } from "@/lib/auth/constants"

type UserRole = 'admin' | 'user' | 'trial';

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ 
    email, 
    password 
  })
  
  if (error) throw error
  return data
}

export const signUpWithEmail = async (email: string, password: string) => {
  const { data: { user }, error } = await supabase.auth.signUp({ 
    email, 
    password 
  })

  if (error) throw error

  /*
  if (user) {
    const trialExpiry = new Date()
    trialExpiry.setDate(trialExpiry.getDate() + 7)

    await supabase.from('profiles').insert({
      id: user.id,
      email: user.email,
      role: AUTH_ROLES.TRIAL,
      trial_expiry: trialExpiry.toISOString(),
      updated_at: new Date().toISOString()
    })
  }
  */

  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}

export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw error
}

export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

export const updateUserProfile = async (userId: string, updates: {
  full_name?: string
  avatar_url?: string
  role?: UserRole
  trial_expiry?: string
}) => {
  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)

  if (error) throw error
}

export function AutoTrialInit() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initTrial = async () => {
      setIsSubmitting(true);
      try {
        await startTrial()
        navigate(AUTH_CONFIG.ROUTES.TRIAL[0])
      } catch (error: any) {
        setError(error.message || 'Trial initialization failed.');
        console.error('Trial init error:', error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to start trial. Please refresh the page."
        })
      } finally {
        setIsSubmitting(false);
        setIsLoading(false)
      }
    }

    if (!hasInitialized) {
      setHasInitialized(true);
      initTrial();
    }
  }, [navigate, toast, hasInitialized])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return null
}