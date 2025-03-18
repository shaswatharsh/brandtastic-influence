
import { cn } from "@/lib/utils";
import { Message } from "@/contexts/MessageContext";

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList = ({ messages, messagesEndRef }: MessageListProps) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "me" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2",
                message.sender === "me"
                  ? "bg-brand text-white rounded-tr-none"
                  : "bg-secondary rounded-tl-none"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <p 
                className={cn(
                  "text-xs mt-1",
                  message.sender === "me" ? "text-brand-foreground/70" : "text-muted-foreground"
                )}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
