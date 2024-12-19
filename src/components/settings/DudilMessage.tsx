import React from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { Message } from "@/types/ai";
import { renderMarkdown } from "@/utils/aiUtils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from 'date-fns';

interface DudilMessageProps {
  message: Message;
}

export const DudilMessage = ({ message }: DudilMessageProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast({ description: "Message copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex group ${
      message.role === "user" ? "justify-end" : "justify-start"
    }`}>
      <div className={`relative rounded-lg px-4 py-2 max-w-[80%] ${
        message.role === "user"
          ? "bg-primary text-primary-foreground"
          : "bg-muted"
      }`}>
        <div className="flex items-start gap-2">
          <div className="flex-1">
            {message.status === 'pending' ? (
              <div className="flex items-center gap-2">
                <div className="animate-pulse">Generating response...</div>
              </div>
            ) : message.status === 'error' ? (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>Error: {message.content}</span>
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                {message.role === "assistant" 
                  ? renderMarkdown(message.content)
                  : message.content
                }
              </div>
            )}
          </div>
          {message.role === "assistant" && message.status === 'complete' && (
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </div>
      </div>
    </div>
  );
};