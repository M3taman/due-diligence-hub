import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const userRequests = rateLimit.get(userId) || [];
  
  // Clean up old requests
  const recentRequests = userRequests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return true;
  }
  
  recentRequests.push(now);
  rateLimit.set(userId, recentRequests);
  return false;
}

const querySchema = z.object({
  query: z.string().min(2).max(200),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      req.headers.get('Authorization')?.split(' ')[1] ?? ''
    )

    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    if (isRateLimited(user.id)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { query } = await req.json()
    
    try {
      querySchema.parse({ query })
    } catch (validationError) {
      return new Response(
        JSON.stringify({ error: 'Invalid query format' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Mock analysis response for development
    const analysis = `## Analysis for ${query}
    
    ### Company Overview
    - Industry: Technology
    - Founded: 2020
    - Status: Private
    
    ### Financial Assessment
    - Revenue Growth: 25% YoY
    - Profit Margin: 15%
    
    ### Market Position
    - Market Share: 12%
    - Competitive Standing: Strong
    
    ### Risk Analysis
    - Overall Risk Level: Moderate
    - Key Risks: Market competition, regulatory changes
    
    ### Growth Potential
    - Expansion Plans: International markets
    - Innovation: Strong R&D pipeline`

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})