"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AdvisorChatInputBarProps } from "@/lib/types/advisor";

export function AdvisorChatInputBar({
  value,
  onChange,
  onSubmit,
  disabled,
  canSubmit,
}: AdvisorChatInputBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-5">
      <form
        onSubmit={onSubmit}
        className="max-w-lg mx-auto glass-card rounded-2xl p-2 flex items-center gap-3"
        dir="rtl"
      >
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="שאלו על מפלגות, מועמדים או נושאים..."
          disabled={disabled}
          className="flex-1 h-auto min-h-0 border-0 bg-transparent px-4 py-3 text-sm shadow-none focus-visible:border-transparent focus-visible:ring-0 md:text-sm"
        />
        <Button
          type="submit"
          disabled={!canSubmit || disabled}
          size="icon"
          variant="ghost"
          className="size-auto shrink-0 rounded-xl p-3 bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-30 disabled:cursor-not-allowed [&_svg]:size-5"
          aria-label="שליחה"
        >
          <Send />
        </Button>
      </form>
    </div>
  );
}
