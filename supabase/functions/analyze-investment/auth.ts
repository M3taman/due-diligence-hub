export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const validateAuth = async (supabase: any, jwt: string | null) => {
  try {
    if (!jwt) {
      throw new Error('Auth token not provided');
    }
    
    const { error, data } = await supabase.auth.getUser(jwt);
    if (error || !data.user) {
      throw new Error('Invalid token or user not authenticated');
    }
    
    return data.user;
  } catch (error: any) {
    if (error.status === 429) {
      console.error('Rate limit exceeded while validating auth:', error);
      // Optionally notify or handle differently
    }
    throw error;
  }
};