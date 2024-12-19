import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AIAnalysisInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
  maxLength?: number;
}

export const AIAnalysisInput = ({ 
  onSubmit, 
  isLoading, 
  maxLength = 200 
}: AIAnalysisInputProps) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!input.trim() || isLoading) return;

    if (input.length > maxLength) {
      setError(`Input must be less than ${maxLength} characters`);
      return;
    }

    try {
      onSubmit(input);
      setInput("");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process analysis request"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter company name or topic for analysis..."
            className="flex-1"
            disabled={isLoading}
            maxLength={maxLength}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim() || Boolean(error)}
            className="w-24"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              'Analyze'
            )}
          </Button>
        </div>
        
        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground text-right">
          {input.length}/{maxLength}
        </div>
      </div>
    </form>
  );
};