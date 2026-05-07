"use client";

import { useCallback, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  computeAdvisorPartyMatches,
  generateAdvisorNextQuestion,
} from "@/features/advisor/actions";
import { ADVISOR_FIXED_QUESTIONS } from "@/features/advisor/questions";
import type {
  AdvisorAiQuestion,
  AdvisorAxisAnswers,
  AdvisorPartyMatch,
  AdvisorProfile,
} from "@/features/advisor/types";

type QuestionnaireFlowProps = {
  onComplete: (matches: AdvisorPartyMatch[], profile: AdvisorProfile) => void;
};

type Phase = "fixed" | "loadingAi" | "ai" | "loadingMatches";

export function QuestionnaireFlow({ onComplete }: QuestionnaireFlowProps) {
  const [fixedStep, setFixedStep] = useState(0);
  const axisAnswersRef = useRef<AdvisorAxisAnswers | null>(null);
  const [phase, setPhase] = useState<Phase>("fixed");
  const [aiQuestion, setAiQuestion] = useState<AdvisorAiQuestion | null>(null);

  const currentFixed = ADVISOR_FIXED_QUESTIONS[fixedStep];

  const handleFixedAnswer = useCallback(
    (option: string) => {
      const q = ADVISOR_FIXED_QUESTIONS[fixedStep];
      const base: AdvisorAxisAnswers =
        axisAnswersRef.current ?? {
          security: "",
          economy: "",
          harediGov: "",
          arabGov: "",
        };
      const merged: AdvisorAxisAnswers = { ...base, [q.key]: option };
      axisAnswersRef.current = merged;

      if (fixedStep < ADVISOR_FIXED_QUESTIONS.length - 1) {
        setFixedStep((s) => s + 1);
        return;
      }

      setPhase("loadingAi");
      void (async () => {
        const next = await generateAdvisorNextQuestion(merged);
        setAiQuestion(next);
        setPhase("ai");
      })();
    },
    [fixedStep],
  );

  const handleAiAnswer = useCallback(
    (option: string) => {
      const axes = axisAnswersRef.current;
      if (!axes || !aiQuestion) return;
      setPhase("loadingMatches");
      const profile: AdvisorProfile = {
        ...axes,
        aiFollowUpQuestion: aiQuestion.question,
        aiFollowUpAnswer: option,
      };
      void (async () => {
        const matches = await computeAdvisorPartyMatches(profile);
        onComplete(matches, profile);
      })();
    },
    [aiQuestion, onComplete],
  );

  if (phase === "loadingAi" || phase === "loadingMatches") {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4"
        dir="rtl"
      >
        <Loader2
          className="h-10 w-10 animate-spin text-primary"
          aria-hidden
        />
        <p className="text-sm text-muted-foreground">
          {phase === "loadingAi"
            ? "מנסחים שאלה אחרונה מותאמת אישית..."
            : "מחשבים התאמות מפלגות..."}
        </p>
      </div>
    );
  }

  if (phase === "ai" && aiQuestion) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center text-center px-2"
        dir="rtl"
      >
        <p className="text-base font-medium text-foreground mb-6 max-w-sm leading-relaxed">
          {aiQuestion.question}
        </p>
        <div className="flex flex-wrap gap-3 justify-center max-w-sm">
          {aiQuestion.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleAiAnswer(option)}
              className="px-4 py-2 glass-card rounded-full text-sm text-muted-foreground hover:text-foreground hover:shadow-md transition-all"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center text-center px-2"
      dir="rtl"
    >
      <p className="text-xs text-muted-foreground mb-2">
        שאלה {fixedStep + 1} מתוך {ADVISOR_FIXED_QUESTIONS.length}
      </p>
      <p className="text-base font-medium text-foreground mb-6 max-w-sm leading-relaxed">
        {currentFixed.prompt}
      </p>
      <fieldset className="contents">
        <legend className="sr-only">{currentFixed.prompt}</legend>
        <div className="flex flex-wrap gap-3 justify-center max-w-sm">
          {currentFixed.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleFixedAnswer(option)}
              className="px-4 py-2 glass-card rounded-full text-sm text-muted-foreground hover:text-foreground hover:shadow-md transition-all"
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
