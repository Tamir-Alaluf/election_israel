"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AdvisorFlow } from "@/features/advisor/components/advisor-flow";
import { AdvisorModeSelector } from "@/features/advisor/components/mode-selector";
import { AdvisorResultScreen } from "@/features/advisor/components/result-screen";
import { AdvisorChatInputBar } from "@/features/advisor/components/chat-input-bar";
import { AdvisorChatThread } from "@/features/advisor/components/chat-thread";
import { FreeChatIntro } from "@/features/advisor/components/free-chat-intro";
import type {
  AdvisorMode,
} from "@/lib/types/advisor";
import type { AdvisorMatchingSnapshot } from "@/lib/types/advisor";
import { cn } from "@/lib/utils/utils";

export function AdvisorView() {
  const [mode, setMode] = useState<AdvisorMode>("selecting");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [matchingSnapshot, setMatchingSnapshot] =
    useState<AdvisorMatchingSnapshot | null>(null);

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
        {/* mode selector */}
        {mode === "selecting" ? (
          <AdvisorModeSelector
            onSelectAiMatching={selectAiMatching}
            onSelectFreeChat={selectFreeChat}
          />
        ) : null}

        {/* ai matching */}
        {mode === "ai_matching" ? (
          <AdvisorFlow
            onMatchingComplete={(result, finalProfile) => {
              setMatchingSnapshot({ result, finalProfile });
            }}
            onHandOffToChat={handleHandOffToChat}
          />
        ) : null}

        {/* free chat intro */}
        {mode === "free_chat" && !showThread ? <FreeChatIntro /> : null}

        {/* free chat thread & result screen */}
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

            <AdvisorChatThread
              messages={messages}
              isLoading={isLoading}
              endRef={messagesEndRef}
            />
          </div>
        ) : null}
      </main>

      {/* chat input bar */}
      {showChatInput ? (
        <AdvisorChatInputBar
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          disabled={isLoading}
          canSubmit={input.trim().length > 0}
        />
      ) : null}
    </div>
  );
}
