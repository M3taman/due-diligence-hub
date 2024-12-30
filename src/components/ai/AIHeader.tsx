import { Database, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIHeaderProps {
  isLoading?: boolean;
  messageCount: number;
}

export const AIHeader = ({ 
  isLoading,
  messageCount 
}: AIHeaderProps) => {

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">dudil Due Diligence Analyst</h2>
        </div>
        <div className="flex gap-2">
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Messages: 0</span>
        </div>
      </div>
    </>
  );
};