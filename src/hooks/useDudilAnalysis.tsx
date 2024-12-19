import { useState, useCallback, useEffect } from "react";
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

  const handleSendMessage = useCallback(async (query: string) => {
    if (isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: query,
      timestamp: Date.now(),
      status: 'complete'
    };

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, userMessage]);

      const complexity = calculateComplexity(query);
      
      const { data: analysisData, error } = await supabase.functions.invoke('dudil-analyze', {
        body: {
          query,
          complexity,
          context: messages.slice(-5),
          timestamp: new Date().toISOString()
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        role: 'assistant',
        content: analysisData.response,
        timestamp: Date.now(),
        status: 'complete',
        metadata: {
          complexity,
          sources: analysisData.sources,
          confidence: analysisData.confidence
        }
      };

      setMessages(prev => [...prev, aiMessage]);

      await addResearchEntry({
        query,
        response: analysisData.response,
        complexity,
        sources: analysisData.sources,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      const errorMessage = handleError(error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: errorMessage
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${errorMessage}`,
        timestamp: Date.now(),
        status: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, addResearchEntry, toast]);

  useEffect(() => {
    const channel = supabase
      .channel('dudil_updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'analysis_history' },
        (payload) => {
          if (payload.new && payload.new.response) {
            const newMessage: Message = {
              role: 'assistant',
              content: payload.new.response,
              timestamp: Date.now(),
              status: 'complete',
              metadata: payload.new.metadata
            };
            setMessages(prev => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    messages,
    isLoading,
    handleSendMessage
  };
};