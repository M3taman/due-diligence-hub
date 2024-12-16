import { Card } from "@/components/ui/card";
import { AIHeader } from "./AIHeader";
import { AIMessageList } from "./AIMessageList";
import { AIAnalysisInput } from "./AIAnalysisInput";
import { useToast } from "@/components/ui/use-toast";
import { useAIAnalysis } from "./useAIAnalysis";

export const AIAnalyst = () => {
  const { messages, isLoading, handleSendMessage } = useAIAnalysis();
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: "Coming Soon",
      description: "File upload functionality will be available soon.",
    });
  };

  const handleDownload = () => {
    if (messages.length === 0) {
      toast({
        title: "No Analysis",
        description: "Generate an analysis first before downloading.",
      });
      return;
    }

    const lastAnalysis = messages[messages.length - 1].content;
    const blob = new Blob([lastAnalysis], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `investment-analysis-${new Date().toISOString()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Your analysis report is being downloaded.",
    });
  };

  return (
    <Card className="p-6 bg-white shadow-lg rounded-xl">
      <AIHeader onUpload={handleUpload} onDownload={handleDownload} />
      <AIMessageList messages={messages} isLoading={isLoading} />
      <AIAnalysisInput onSubmit={handleSendMessage} isLoading={isLoading} />
    </Card>
  );
};