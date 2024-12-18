import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw } from "lucide-react";
import { Message } from "@/types/ai";
import { DudilMessage } from "./DudilMessage";

interface DudilMessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const DudilMessageList = ({ messages, isLoading }: DudilMessageListProps) => {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {messages.map((msg, idx) => (
          <DudilMessage key={idx} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Analyzing data...</span>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};