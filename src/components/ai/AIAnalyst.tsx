import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { AIHeader } from "./AIHeader";
import { AIMessageList } from "./AIMessageList";
import { AIAnalysisInput } from "./AIAnalysisInput";
import { useToast } from "@/components/ui/use-toast";
import { useAIAnalysis } from "./useAIAnalysis";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Download, Upload } from "lucide-react";

export const AIAnalyst = () => {
  const { messages, isLoading, handleSendMessage } = useAIAnalysis();
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    try {
      if (file.size > 5000000) {
        throw new Error("File size must be less than 5MB");
      }
      
      const content = await file.text();
      await handleSendMessage(content);
      trackEvent('file_upload_success');
    } catch (error) {
      setUploadError(error.message);
      trackEvent('file_upload_error', { error: error.message });
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message
      });
    }
  };

  const handleDownload = () => {
    if (messages.length === 0) {
      toast({
        title: "No Analysis",
        description: "Generate an analysis first before downloading.",
      });
      return;
    }

    try {
      const lastAnalysis = messages[messages.length - 1].content;
      const blob = new Blob([lastAnalysis], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analysis-${new Date().toISOString()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      trackEvent('analysis_download_success');
    } catch (error) {
      trackEvent('analysis_download_error', { error: error.message });
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Failed to download analysis."
      });
    }
  };

  return (
    <Card className="p-6 h-[calc(100vh-2rem)] flex flex-col">
      <AIHeader 
        onUpload={handleUpload}
        onDownload={handleDownload}
        isLoading={isLoading}
        messageCount={messages.length}
      />
      <AIMessageList 
        messages={messages}
        isLoading={isLoading}
        className="flex-1 overflow-auto my-4"
      />
      <AIAnalysisInput
        onSubmit={handleSendMessage}
        isLoading={isLoading}
        maxLength={500}
      />
    </Card>
  );
};