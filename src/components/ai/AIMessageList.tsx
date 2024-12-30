import { useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";

interface AIMessageListProps {
  className?: string;
}

export const AIMessageList = ({ 
  className = ""
}: AIMessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollArea className={`pr-4 mb-4 ${className}`} ref={scrollRef}>
      <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
        <MessageSquare className="h-8 w-8 mb-2" />
        <p>No messages to display</p>
      </div>
    </ScrollArea>
  );
};