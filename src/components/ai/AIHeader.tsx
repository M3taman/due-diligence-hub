import { Database, FileText, RefreshCw, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface AIHeaderProps {
  onUpload: (file: File) => Promise<void>;
  onDownload: () => void;
  isLoading?: boolean;
  messageCount: number;
}

export const AIHeader = ({ 
  onUpload, 
  onDownload, 
  isLoading,
  messageCount 
}: AIHeaderProps) => {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await onUpload(file);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">dudil Due Diligence Analyst</h2>
          {isLoading && <RefreshCw className="h-4 w-4 animate-spin ml-2" />}
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".txt,.csv,.json,.md"
            onChange={handleFileUpload}
          />
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isLoading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Data
          </Button>
          <Button 
            variant="outline" 
            onClick={onDownload}
            disabled={isLoading || messageCount === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Messages: {messageCount}</span>
        </div>
        {isLoading && (
          <div className="flex-1">
            <Progress value={undefined} className="h-1" />
          </div>
        )}
      </div>
    </>
  );
};