"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdvisorPage() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/advisor" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const suggestions = [
    "מה חשוב לי בנושא ביטחון?",
    "איזו מפלגה תומכת בנישואין אזרחיים?",
    "מי נגד גיוס חרדים?",
  ];

  return (
    <div className="min-h-screen relative flex flex-col">
      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-5 pb-28">
        {/* Welcome state */}
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-foreground">
              שלום! אני היועץ הפוליטי שלך
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs mb-8">
              ספרו לי על הערכים שחשובים לכם, ואעזור לכם למצוא התאמה.
            </p>

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-3 justify-center max-w-sm">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage({ text: suggestion })}
                  className="px-4 py-2 glass-card rounded-full text-sm text-muted-foreground hover:text-foreground hover:shadow-md transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="flex-1 space-y-4 py-6">
            {messages.map((message) => (
              <div
                key={message.id}
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

            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input bar */}
      <div className="fixed bottom-0 left-0 right-0 p-5">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto glass-card rounded-2xl p-2 flex items-center gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="שאלו על מפלגות, מנהיגים או נושאים..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
