import React, { useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Message } from "@/types/ai";
import { DudilMessage } from "./DudilMessage";
import { format } from 'date-fns';
import { Virtuoso } from 'react-virtuoso';

interface DudilMessageListProps {
  messages: Message[];
  isLoading: boolean;
  className?: string;
  error?: string;
}

export const DudilMessageList = ({ 
  messages, 
  isLoading, 
  className = "",
  error 
}: DudilMessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const messagesByDate = messages.reduce((groups, message) => {
    const date = format(new Date(message.timestamp), 'MMMM d, yyyy');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-destructive">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <ScrollArea className={`${className} h-[600px] pr-4`} ref={scrollRef}>
      {Object.entries(messagesByDate).map(([date, dateMessages]) => (
        <div key={date} className="space-y-4">
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm py-2 text-xs text-muted-foreground">
            {date}
          </div>
          {dateMessages.map((msg, idx) => (
            <DudilMessage key={`${date}-${idx}`} message={msg} />
          ))}
        </div>
      ))}
      
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <p>No messages yet</p>
          <p className="text-sm">Start a conversation to begin analysis</p>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground p-4">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Analyzing data...</span>
        </div>
      )}
    </ScrollArea>
  );
};