// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zdmdetvaodkrvbohvjzs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbWRldHZhb2RrcnZib2h2anpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNTY2NzIsImV4cCI6MjA0OTgzMjY3Mn0.RGBuiyUvLmY_zS72jtVemLyQ9U55gvcFFGP1hNLZkb0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);