import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { AIHeader } from "./AIHeader";
import { AIMessageList } from "./AIMessageList";
import { useToast } from "@/components/ui/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Download, Upload } from "lucide-react";

export const AIAnalyst = () => {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    try {
      if (file.size > 5000000) {
        throw new Error("File size must be less than 5MB");
      }
      
      const content = await file.text();
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
    toast({
      title: "No Analysis",
      description: "Generate an analysis first before downloading.",
    });
    return;
  };

  return (
    <Card className="p-6 h-[calc(100vh-2rem)] flex flex-col">
      <AIHeader />
      <AIMessageList className="flex-1 overflow-auto my-4" />
    </Card>
  );
};