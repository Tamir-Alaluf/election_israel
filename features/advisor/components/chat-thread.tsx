"use client";

import { Bot } from "lucide-react";
import { AdvisorChatMessage } from "@/features/advisor/components/chat-message";
import type { AdvisorChatThreadProps } from "@/lib/types/advisor";

export function AdvisorChatThread({
  messages,
  isLoading,
  endRef,
}: AdvisorChatThreadProps) {
  return (
    <div className="flex-1 space-y-4">
      {messages.map((message) => (
        <AdvisorChatMessage key={message.id} message={message} />
      ))}

      {isLoading && messages[messages.length - 1]?.role === "user" && (
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <Bot className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="rounded-2xl px-4 py-3 glass-card">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0.1s]" />
              <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0.2s]" />
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}
