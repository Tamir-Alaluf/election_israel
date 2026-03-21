"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { PageHeader } from "@/components/page-header"
import { Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdvisorPage() {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/advisor" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const suggestions = [
    "מה חשוב לי בנושא ביטחון?",
    "איזו מפלגה תומכת בנישואין אזרחיים?",
    "מי נגד גיוס חרדים?",
  ]

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Soft blob background */}
      <div className="blob-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <PageHeader />

      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 pb-24">
        {/* Welcome state */}
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-sm font-medium mb-1 text-foreground">שלום! אני היועץ הפוליטי שלך</h2>
            <p className="text-[11px] text-muted-foreground max-w-xs mb-6">
              ספרו לי על הערכים שחשובים לכם, ואעזור לכם למצוא התאמה.
            </p>
            
            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 justify-center max-w-sm">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage({ text: suggestion })}
                  className="px-3 py-1.5 glass-card rounded-full text-[11px] text-muted-foreground hover:text-foreground hover:shadow-sm transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="flex-1 space-y-3 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === "user" ? "bg-primary" : "bg-muted"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="w-3 h-3 text-primary-foreground" />
                  ) : (
                    <Bot className="w-3 h-3 text-muted-foreground" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-3 py-2 max-w-[80%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "glass-card"
                  )}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <p key={index} className="whitespace-pre-wrap text-[11px] leading-relaxed">
                          {part.text}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                  <Bot className="w-3 h-3 text-muted-foreground" />
                </div>
                <div className="rounded-2xl px-3 py-2 glass-card">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0.1s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto glass-card rounded-2xl p-1.5 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="שאלו על מפלגות, מנהיגים או נושאים..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 bg-transparent text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
