export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const validateAuth = async (supabase: any, jwt: string | null) => {
  if (!jwt) {
    throw new Error('Auth token not provided');
  }
  
  const { error, data } = await supabase.auth.getUser(jwt);
  if (error || !data.user) {
    throw new Error('Invalid token or user not authenticated');
  }
  
  return data.user;
};