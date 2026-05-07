"use client";

import { Bot, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AdvisorModeSelectorProps = {
  onSelectAiMatching: () => void;
  onSelectFreeChat: () => void;
};

export function AdvisorModeSelector({
  onSelectAiMatching,
  onSelectFreeChat,
}: AdvisorModeSelectorProps) {
  return (
    <div className="w-full max-w-lg mx-auto space-y-4 pt-8 px-2" dir="rtl">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Bot className="w-8 h-8 text-primary" aria-hidden />
        </div>
        <h1 className="text-lg font-semibold text-foreground mb-1">
          יועץ בחירות
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          בחרו איך להתחיל: התאמה מובנית או שיחה חופשית.
        </p>
      </div>

      <Card className="glass-card border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 justify-center sm:justify-start">
            <Bot className="h-5 w-5 text-primary shrink-0" aria-hidden />
            התאמה חכמה
          </CardTitle>
          <CardDescription className="text-center sm:text-start">
            שאלות קצרות לפי שלבים — בלי הקלדה — ואז המלצות על מועמדים מובילים
            והמפלגות שלהם.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            className="w-full rounded-2xl h-11 text-sm font-semibold"
            onClick={onSelectAiMatching}
          >
            התחילו בהתאמה
          </Button>
        </CardContent>
      </Card>

      <Card className="glass-card border-border/60 shadow-sm overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 justify-center sm:justify-start">
            <MessageCircle
              className="h-5 w-5 text-primary shrink-0"
              aria-hidden
            />
            שיחה חופשית
          </CardTitle>
          <CardDescription className="text-center sm:text-start">
            שאלו מה שתרצו על מפלגות, מועמדים או נושאים — בטקסט חופשי.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="secondary"
            className="w-full rounded-2xl h-11 text-sm font-semibold"
            onClick={onSelectFreeChat}
          >
            פתחו שיחה
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
