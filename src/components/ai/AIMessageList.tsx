import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw } from "lucide-react";
import { Message } from "@/types/ai";
import { AIMessage } from "./AIMessage";

interface AIMessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const AIMessageList = ({ messages, isLoading }: AIMessageListProps) => {
  return (
    <ScrollArea className="h-[600px] pr-4 mb-4">
      <div className="space-y-6">
        {messages.map((msg, idx) => (
          <AIMessage key={idx} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Processing analysis...</span>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};