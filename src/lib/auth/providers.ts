import { supabase } from '@/lib/supabase/client'
import { Provider } from '@supabase/supabase-js'

export type OAuthProvider = 'google' | 'github'

interface ProviderConfig {
  id: Provider
  name: string
  icon: string
}

export const OAUTH_PROVIDERS: Record<OAuthProvider, ProviderConfig> = {
  google: {
    id: 'google',
    name: 'Google',
    icon: 'google'
  },
  github: {
    id: 'github',
    name: 'GitHub',
    icon: 'github'
  }
}

export const signInWithProvider = async (provider: OAuthProvider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: OAUTH_PROVIDERS[provider].id,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error(`${provider} sign in failed:`, error)
    throw error
  }
}

export const handleProviderSignIn = async (provider: OAuthProvider) => {
  try {
    const { data } = await signInWithProvider(provider)
    
    if (data?.user) {
      const trialExpiry = new Date()
      trialExpiry.setDate(trialExpiry.getDate() + 7)

      await supabase.from('profiles').upsert({
        id: data.user.id,
        email: data.user.email,
        avatar_url: data.user.user_metadata.avatar_url,
        role: 'trial',
        trial_expiry: trialExpiry.toISOString(),
        updated_at: new Date().toISOString()
      })
    }

    return data
  } catch (error) {
    console.error('Provider auth failed:', error)
    throw error
  }
}