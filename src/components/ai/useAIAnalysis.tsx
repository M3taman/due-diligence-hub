import { useState } from "react";
import { Message } from "@/types/ai";
import { useToast } from "@/components/ui/use-toast";
import { useResearchHistory } from "@/hooks/useResearchHistory";
import { supabase } from "@/lib/supabase";
import { handleError } from "@/utils/errorHandling";

export const useAIAnalysis = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { addResearchEntry } = useResearchHistory();

  const calculateComplexity = (text: string): number => {
    const technicalTerms = [
      'EBITDA', 'P/E', 'ROE', 'Beta', 'VaR',
      'margin', 'ratio', 'regulatory', 'compliance',
      'acquisition', 'strategy', 'market'
    ];
    return technicalTerms.reduce((score, term) => 
      text.toLowerCase().includes(term.toLowerCase()) ? score + 1 : score, 0);
  };

  const handleSendMessage = async (query: string) => {
    if (isLoading) return;

    const userMessage = {
      role: 'user' as const,
      content: query,
      timestamp: Date.now(),
      status: 'complete' as const
    };

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, userMessage]);

      const complexity = calculateComplexity(query);
      
      const { data: analysisResponse, error } = await supabase.functions.invoke('analyze', {
        body: { 
          query,
          complexity,
          history: messages.slice(-5)
        }
      });

      if (error) throw error;

      const aiMessage = {
        role: 'assistant' as const,
        content: analysisResponse.content,
        timestamp: Date.now(),
        status: 'complete' as const
      };

      setMessages(prev => [...prev, aiMessage]);
      
      await addResearchEntry({
        query,
        response: analysisResponse.content,
        complexity,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      const errorMessage = handleError(error);
      toast({
        variant: "destructive",
        title: "Analysis Error",
        description: errorMessage
      });

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${errorMessage}`,
          timestamp: Date.now(),
          status: 'error'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    handleSendMessage
  };
};