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
      } mb-6`}
    >
      <div
        className={`rounded-lg px-8 py-6 ${
          message.role === "user"
            ? "bg-primary text-primary-foreground max-w-[40%]"
            : "bg-secondary/50 max-w-[90%] w-full"
        }`}
      >
        {message.role === "assistant" ? (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {renderMarkdown(message.content)}
          </div>
        ) : (
          <p className="text-lg">{message.content}</p>
        )}
      </div>
    </div>
  );
};