import { useState } from "react";
import { Message } from "@/types/ai";
import { useToast } from "@/components/ui/use-toast";
import { useResearchHistory } from "@/hooks/useResearchHistory";
import { supabase } from "@/integrations/supabase/client";
import { handleError } from "@/utils/errorHandling";

export const useDudilAnalysis = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { addResearchEntry } = useResearchHistory();

  const calculateComplexity = (text: string): number => {
    const technicalTerms = [
      'EBITDA', 'P/E', 'ROE', 'Beta', 'VaR', 'DCF',
      'margin', 'ratio', 'regulatory', 'compliance',
      'acquisition', 'strategy', 'market', 'portfolio',
      'diversification', 'liquidity', 'volatility'
    ];
    return technicalTerms.reduce((score, term) => 
      text.toLowerCase().includes(term.toLowerCase()) ? score + 1 : score, 0);
  };

  const handleSendMessage = async (query: string) => {
    if (isLoading) return;

    const userMessage = {
      role: 'user' as const,
      content: query,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-investment', {
        body: { query }
      });

      if (error) throw error;

      const analysis = data.analysis;
      const aiResponse = {
        role: 'assistant' as const,
        content: analysis,
        timestamp: Date.now(),
        charts: data.charts
      };

      setMessages(prev => [...prev, aiResponse]);

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await addResearchEntry.mutateAsync({
          query,
          response: analysis,
          user_id: session.user.id,
          metadata: {
            tokens: analysis.split(' ').length,
            complexity: calculateComplexity(analysis)
          }
        });
      }

      toast({
        title: "Analysis Complete",
        description: "Your investment analysis report has been generated.",
      });
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    handleSendMessage,
  };
};