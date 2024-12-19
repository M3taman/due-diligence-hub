import { useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw, MessageSquare } from "lucide-react";
import { Message } from "@/types/ai";
import { AIMessage } from "./AIMessage";
import { format } from 'date-fns';

interface AIMessageListProps {
  messages: Message[];
  isLoading: boolean;
  className?: string;
}

export const AIMessageList = ({ 
  messages, 
  isLoading,
  className = ""
}: AIMessageListProps) => {
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

  return (
    <ScrollArea className={`pr-4 mb-4 ${className}`} ref={scrollRef}>
      {messages.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
          <MessageSquare className="h-8 w-8 mb-2" />
          <p>No messages yet</p>
          <p className="text-sm">Start your analysis by entering a query</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(messagesByDate).map(([date, dateMessages]) => (
            <div key={date}>
              <div className="sticky top-0 bg-background/95 backdrop-blur-sm py-2 text-xs text-muted-foreground">
                {date}
              </div>
              <div className="space-y-4">
                {dateMessages.map((msg, idx) => (
                  <AIMessage key={`${date}-${idx}`} message={msg} />
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground p-4 bg-muted/50 rounded-lg">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Processing analysis...</span>
            </div>
          )}
        </div>
      )}
    </ScrollArea>
  );
};