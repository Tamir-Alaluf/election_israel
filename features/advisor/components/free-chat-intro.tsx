"use client";

import { Bot } from "lucide-react";

export function FreeChatIntro() {
  return (
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
  );
}
