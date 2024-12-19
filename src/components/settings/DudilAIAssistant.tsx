import React, { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { DudilHeader } from "./DudilHeader";
import { DudilMessageList } from "./DudilMessageList";
import { DudilInputForm } from "./DudilInputForm";
import { useDudilAnalysis } from "@/hooks/useDudilAnalysis";
import { useTheme } from "@/components/providers/theme-provider";
import { useToast } from "@/components/ui/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";

export const DudilAIAssistant = () => {
  const { messages, isLoading, error, handleSendMessage } = useDudilAnalysis();
  const { theme } = useTheme();
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  }, [error, toast]);

  const handleSubmit = async (message: string) => {
    try {
      await handleSendMessage(message);
      trackEvent('message_sent', { success: true });
    } catch (err) {
      trackEvent('message_sent', { success: false });
      console.error('Message send failed:', err);
    }
  };

  return (
    <Card className={`p-6 shadow-lg rounded-xl ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <DudilHeader />
      <DudilMessageList 
        messages={messages} 
        isLoading={isLoading} 
        className="min-h-[400px] max-h-[600px]"
      />
      <DudilInputForm 
        onSubmit={handleSubmit} 
        isLoading={isLoading}
        placeholder="Ask about financial analysis..."
        className="mt-4"
      />
    </Card>
  );
};