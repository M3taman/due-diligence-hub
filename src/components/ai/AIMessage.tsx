import { Message } from "@/types/ai";
import { renderMarkdown } from "@/utils/aiUtils";

interface AIMessageProps {
  message: Message;
}

export const AIMessage = ({ message }: AIMessageProps) => {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`rounded-lg px-6 py-4 max-w-[85%] ${
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary"
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