import { useState, useEffect, useCallback } from "react";
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

  useEffect(() => {
    const channel = supabase
      .channel('research_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'research_history'
        },
        (payload: any) => {
          if (payload.new && payload.new.response) {
            const newMessage: Message = {
              role: 'assistant',
              content: typeof payload.new.response === 'string' 
                ? payload.new.response 
                : JSON.stringify(payload.new.response),
              timestamp: new Date().getTime(),
              status: 'complete'
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

  const handleSendMessage = useCallback(async (content: string) => {
    if (isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date().getTime(),
      status: 'complete'
    };

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, userMessage]);

      const { data, error } = await supabase.functions.invoke('analyze-query', {
        body: { content, messageHistory: messages.slice(-5) }
      });

      if (error) throw error;

      const aiResponse: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().getTime(),
        status: 'complete'
      };

      setMessages(prev => [...prev, aiResponse]);

      await addResearchEntry({
        query: content,
        response: data.response,
        timestamp: new Date().toISOString(),
        metadata: data.metadata
      });

    } catch (error) {
      const errorMessage = handleError(error);
      toast({
        variant: "destructive",
        title: "Analysis Error",
        description: errorMessage
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${errorMessage}`,
        timestamp: new Date().getTime(),
        status: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, toast, addResearchEntry]);

  return {
    messages,
    isLoading,
    handleSendMessage
  };
};