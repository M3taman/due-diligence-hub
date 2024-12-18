import { Database, FileText, RefreshCw, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface AIHeaderProps {
  onUpload: () => void;
  onDownload: () => void;
}

export const AIHeader = ({ onUpload, onDownload }: AIHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">dudil Due Diligence Analyst</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Data
          </Button>
          <Button variant="outline" onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>Comprehensive Analysis</span>
        </div>
        <div className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          <span>Multi-source Intelligence</span>
        </div>
      </div>
    </>
  );
};