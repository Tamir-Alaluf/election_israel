"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Bot, User } from "lucide-react";
import { AdvisorFlow } from "@/features/advisor/components/advisor-flow";
import { AdvisorModeSelector } from "@/features/advisor/components/mode-selector";
import { AdvisorResultScreen } from "@/features/advisor/components/result-screen";
import type {
  AdvisorFinalProfile,
  AdvisorMatchingResult,
  AdvisorMode,
} from "@/features/advisor/types";
import { cn } from "@/lib/utils";

export default function AdvisorPage() {
  const [mode, setMode] = useState<AdvisorMode>("selecting");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [matchingSnapshot, setMatchingSnapshot] = useState<{
    result: AdvisorMatchingResult;
    finalProfile: AdvisorFinalProfile;
  } | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/advisor" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleHandOffToChat = useCallback(
    (text: string) => {
      setMode("free_chat");
      sendMessage({ text });
    },
    [sendMessage],
  );

  const handleStartChatFromResults = useCallback(
    (text: string) => {
      sendMessage({ text });
    },
    [sendMessage],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const selectAiMatching = () => {
    setMatchingSnapshot(null);
    setMode("ai_matching");
  };

  const selectFreeChat = () => {
    setMatchingSnapshot(null);
    setMode("free_chat");
  };

  const showChatInput = mode === "free_chat";
  const showThread = messages.length > 0;

  return (
    <div className="min-h-screen relative flex flex-col">
      <main
        className={cn(
          "flex-1 flex flex-col max-w-lg mx-auto w-full px-5",
          showChatInput ? "pb-28" : "pb-8",
        )}
      >
        {mode === "selecting" ? (
          <AdvisorModeSelector
            onSelectAiMatching={selectAiMatching}
            onSelectFreeChat={selectFreeChat}
          />
        ) : null}

        {mode === "ai_matching" ? (
          <AdvisorFlow
            onMatchingComplete={(result, finalProfile) => {
              setMatchingSnapshot({ result, finalProfile });
            }}
            onHandOffToChat={handleHandOffToChat}
          />
        ) : null}

        {mode === "free_chat" && !showThread ? (
          <div className="flex-1 flex flex-col pt-8" dir="rtl">
            <div className="shrink-0 pb-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-primary" aria-hidden />
              </div>
              <h1 className="text-lg font-semibold text-foreground mb-1">
                שיחה חופשית
              </h1>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                כתבו למטה — שאלות על מפלגות, מועמדים או נושאים.
              </p>
            </div>
          </div>
        ) : null}

        {mode === "free_chat" && showThread ? (
          <div className="flex-1 flex flex-col pt-6">
            {matchingSnapshot ? (
              <div className="mb-6 shrink-0">
                <AdvisorResultScreen
                  compact
                  result={matchingSnapshot.result}
                  finalProfile={matchingSnapshot.finalProfile}
                  onStartChat={handleStartChatFromResults}
                />
              </div>
            ) : null}

            <div className="flex-1 space-y-4">
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
          </div>
        ) : null}
      </main>

      {showChatInput ? (
        <div className="fixed bottom-0 left-0 right-0 p-5">
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto glass-card rounded-2xl p-2 flex items-center gap-3"
            dir="rtl"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="שאלו על מפלגות, מועמדים או נושאים..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="שליחה"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
