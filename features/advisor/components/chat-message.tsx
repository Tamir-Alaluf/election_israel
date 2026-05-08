"use client";

import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import type { AdvisorChatMessageProps } from "@/lib/types/advisor";

export function AdvisorChatMessage({ message }: AdvisorChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        message.role === "user" ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          message.role === "user" ? "bg-primary" : "bg-muted",
        )}
      >
        {message.role === "user" ? (
          <User className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Bot className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
      <div
        className={cn(
          "rounded-2xl px-4 py-3 max-w-[80%]",
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "glass-card",
        )}
      >
        {message.parts.map((part, index) => {
          if (part.type === "text") {
            return (
              <p
                key={index}
                className="whitespace-pre-wrap text-sm leading-relaxed"
              >
                {part.text}
              </p>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
