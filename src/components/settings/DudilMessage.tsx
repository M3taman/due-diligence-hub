import { Message } from "@/types/ai";
import { renderMarkdown } from "@/utils/aiUtils";

interface DudilMessageProps {
  message: Message;
}

export const DudilMessage = ({ message }: DudilMessageProps) => {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`rounded-lg px-4 py-2 max-w-[80%] ${
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        {message.role === "assistant" 
          ? renderMarkdown(message.content)
          : message.content
        }
      </div>
    </div>
  );
};