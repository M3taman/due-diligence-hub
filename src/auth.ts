// filepath: /d/due-diligence-hub/src/auth.ts
import { debounce } from 'lodash';
import { supabase } from '@/lib/supabase/client';

const debouncedStartTrial = debounce(async () => {
  try {
    const { user, error } = await supabase.auth.signUp({ email: 'user@example.com', password: 'password' });
    if (error) throw error;
    // Handle successful sign-up
  } catch (error) {
    // Handle error
    console.error('Trial init error:', error);
  }
}, 1000); // 1-second debounce

export async function startTrial() {
  debouncedStartTrial();
}