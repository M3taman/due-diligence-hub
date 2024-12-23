import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

// Clear any existing tokens
localStorage.removeItem('sb-zdmdetvaodkrvbohvjzs-auth-token')

// Create mutable client with proper configuration
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storageKey: 'sb-zdmdetvaodkrvbohvjzs-auth-token',
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'x-application-name': 'due-diligence-os'
    }
  }
})

// Prevent object freezing that causes token update issues
Object.preventExtensions = function(obj) { return obj }

// Handle auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    localStorage.clear()
    window.location.reload()
  }
})

export type SupabaseClient = typeof supabase