import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, validateAuth } from "./auth.ts";
import { isRateLimited } from "./rateLimiting.ts";
import { fetchMarketData, generateCharts } from "./marketData.ts";
import { querySchema, generateAnalysis } from "./analysis.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const user = await validateAuth(
      supabase,
      req.headers.get('Authorization')?.split(' ')[1] ?? ''
    );

    if (isRateLimited(user.id)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { query } = await req.json();
    querySchema.parse({ query });

    const marketData = await fetchMarketData(query);
    const analysis = await generateAnalysis(query, user.id);

    return new Response(
      JSON.stringify({ analysis, marketData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});