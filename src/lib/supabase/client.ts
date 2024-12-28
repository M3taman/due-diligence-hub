import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: window.localStorage,
    storageKey: 'sb-zdmdetvaodkrvbohvjzs-auth-token',
    detectSessionInUrl: false
  }
})

// Clear legacy tokens
const clearTokens = () => {
  localStorage.removeItem('sb-zdmdetvaodkrvbohvjzs-auth-token')
  localStorage.removeItem('supabase-auth-token')
  localStorage.removeItem('dudil-auth-token')
}

// clearTokens() // Commented out to avoid clearing tokens on initialization

// Prevent object freezing
Object.preventExtensions = function(obj) { return obj }

// Handle auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
    clearTokens()
    window.location.reload()
  }
  if (event === 'JWT_REFRESH_FAILED') { // Handle JWT refresh failures
    clearTokens()
    window.location.href = '/login' // Redirect to login page
  }
  // Debug session
  console.log('Auth event:', event)
  console.log('Session:', session)
})

// Handle authentication rate limits
export const resetAuth = async () => {
  clearTokens()
  await supabase.auth.signOut()
  window.location.reload()
}

// Type exports
export type SupabaseClient = typeof supabase

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}