import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";

interface DudilInputFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export const DudilInputForm = ({ onSubmit, isLoading }: DudilInputFormProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter company name or investment topic for analysis..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze"
          )}
        </Button>
      </div>
    </form>
  );
};