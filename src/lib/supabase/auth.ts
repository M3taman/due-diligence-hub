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

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

    if (error) throw error
    return data
  }

// Enhanced signUpWithRetry with exponential backoff and jitter
// Enhanced signUpWithRetry with exponential backoff and jitter
const signUpWithRetry = async (
  email: string,
  password: string,
  retries = 5,
  delay = 1000,
  maxDelay = 16000
): Promise<any> => {
  console.log(`Attempting to sign up user: ${email}. Retries left: ${retries}`);
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (!data.user) throw new Error('User not returned from signUp');
    console.log(`Sign up successful for user: ${email}`);
    return data.user;
  } catch (error: any) {
    console.error(`Error during signUpWithRetry for ${email}:`, error);
    if (error.status === 429 && retries > 0) {
      const jitter = Math.random() * 1000;
      const newDelay = Math.min(delay * 2, maxDelay) + jitter;
      console.warn(`Rate limit reached. Retrying in ${newDelay}ms... (${retries} retries left)`);
      await new Promise(res => setTimeout(res, newDelay));
      return signUpWithRetry(email, password, retries - 1, Math.min(delay * 2, maxDelay), maxDelay);
    }
    throw error;
  }
};

// Singleton promise to prevent multiple concurrent startTrial calls
let trialPromise: Promise<any> | null = null;

// Consolidated startTrial with improved singleton pattern
export const startTrial = async () => {
  if (trialPromise) {
    console.warn('Trial initiation already in progress.');
    return trialPromise;
  }

  console.log('Starting trial initiation.');
  trialPromise = (async () => {
    try {
      const tempEmail = `${crypto.randomUUID()}@trial.dudil.com`;
      const tempPassword = crypto.randomUUID();
      console.log(`Generated trial credentials - Email: ${tempEmail}`);

      const user = await signUpWithRetry(tempEmail, tempPassword);

      if (user) {
        const trialExpiry = new Date();
        trialExpiry.setDate(trialExpiry.getDate() + 7);
        console.log(`Setting trial expiry for user ${user.id} to ${trialExpiry.toISOString()}`);

        const { error } = await supabase.from('profiles').insert({
          id: user.id,
          email: user.email,
          role: AUTH_ROLES.TRIAL,
          trial_expiry: trialExpiry.toISOString(),
          updated_at: new Date().toISOString()
        });

        if (error) throw error;

        console.log(`Trial successfully started for user ${user.id}`);
      }

      return user;
    } catch (error) {
      console.error('Trial start error:', error);
      throw error;
    } finally {
      trialPromise = null;
      console.log('Trial initiation process completed.');
    }
  })();

  return trialPromise;
};

const signUpWithRetry = async (
  email: string,
  password: string,
  retries = 5,
  delay = 1000,
  maxDelay = 16000
): Promise<any> => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (!data.user) throw new Error('User not returned from signUp');
    return data.user;
  } catch (error: any) {
    if (error.status === 429 && retries > 0) {
      // Add jitter by randomizing the delay
      const jitter = Math.random() * 1000;
      const newDelay = Math.min(delay * 2, maxDelay) + jitter;
      console.warn(`Rate limit reached. Retrying in ${newDelay}ms... (${retries} retries left)`);
      await new Promise(res => setTimeout(res, newDelay));
    console.error('signUpWithRetry error:', error);
    throw error;
  }
};

export const startTrial = async () => {
    console.warn('Trial initiation already in progress.');
    return trialPromise;
  }

  trialPromise = (async () => {

      const user = await signUpWithRetry(tempEmail, tempPassword);

        const trialExpiry = new Date();
        trialExpiry.setDate(trialExpiry.getDate() + 7);

          updated_at: new Date().toISOString()
        });

        if (error) throw error;

        console.log("Using role:", AUTH_ROLES.TRIAL);
      }

      return user;
      throw error;
    } finally {
      trialPromise = null;
    }
  })();

  return trialPromise;
};

    } catch (error) {
      console.error('Trial start error:', error);
          role: AUTH_ROLES.TRIAL,
          trial_expiry: trialExpiry.toISOString(),
        const { error } = await supabase.from('profiles').insert({
          id: user.id,
          email: user.email,
      if (user) {
    try {
      const tempEmail = `${crypto.randomUUID()}@trial.dudil.com`;
      const tempPassword = crypto.randomUUID();
  if (trialPromise) {
// Singleton promise to prevent multiple concurrent startTrial calls
let trialPromise: Promise<any> | null = null;

// Consolidated startTrial with improved singleton pattern
      return signUpWithRetry(email, password, retries - 1, Math.min(delay * 2, maxDelay), maxDelay);
    }