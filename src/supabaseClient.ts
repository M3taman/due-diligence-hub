import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined in environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase

// Update the fetchVersion function to log the PostgreSQL version
export const fetchVersion = async () => {
  const { data, error } = await supabase.rpc('pg_backend_version')
  if (error) {
    console.error('Error fetching version:', error)
    return null
  }
  console.log('PostgreSQL Version:', data)
  return data
}

// Removed CRUD functions to eliminate redundancy