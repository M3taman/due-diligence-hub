import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://zdmdetvaodkrvbohvjzs.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbWRldHZhb2RrcnZib2h2anpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNTY2NzIsImV4cCI6MjA0OTgzMjY3Mn0.RGBuiyUvLmY_zS72jtVemLyQ9U55gvcFFGP1hNLZkb0";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  db: {
    schema: 'public'
  }
});

export const getServiceSupabase = () => {
  const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_SERVICE_KEY) {
    throw new Error('Missing service role key');
  }
  return createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

export type SupabaseClient = typeof supabase;