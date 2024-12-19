import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DudilInputFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
  maxLength?: number;
  placeholder?: string;
  className?: string;
}

export const DudilInputForm = ({ 
  onSubmit, 
  isLoading, 
  maxLength = 200,
  placeholder = "Enter company name or investment topic for analysis...",
  className = ""
}: DudilInputFormProps) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!input.trim() || isLoading) return;

    if (input.length > maxLength) {
      setError(`Input must be less than ${maxLength} characters`);
      return;
    }

    try {
      await onSubmit(input);
      setInput("");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again."
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > maxLength) {
      setError(`Input must be less than ${maxLength} characters`);
    } else {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`mt-4 ${className}`}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={placeholder}
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
              <Send className="h-4 w-4" />
            )}
            <span className="ml-2">Send</span>
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