"use client";

import { useCallback, useState } from "react";
import {
  ADVISOR_PROFILE_QUESTIONS,
  type AdvisorProfileQuestionKey,
} from "@/lib/constants/advisor";
import type { AdvisorProfileBase } from "@/lib/types/advisor";
import type { AdvisorProfileStageProps } from "@/lib/types/advisor";

export function AdvisorProfileStage({ onComplete }: AdvisorProfileStageProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<AdvisorProfileBase>>({});

  const q = ADVISOR_PROFILE_QUESTIONS[step];

  const handleOption = useCallback(
    (option: string) => {
      const key = q.key as AdvisorProfileQuestionKey;
      const merged = {
        ...answers,
        [key]: option,
      } as Partial<AdvisorProfileBase>;

      if (step < ADVISOR_PROFILE_QUESTIONS.length - 1) {
        setAnswers(merged);
        setStep((s) => s + 1);
        return;
      }

      onComplete({
        ageRange: merged.ageRange!,
        religiosity: merged.religiosity!,
        region: merged.region!,
        lifeStage: merged.lifeStage!,
      });
    },
    [answers, onComplete, q.key, step],
  );

  return (
    <>
      {/* question & options selector */}
      <div
        className="flex-1 flex flex-col items-center justify-center text-center px-2"
        dir="rtl"
      >
        <p className="text-xs text-muted-foreground mb-2">
          שאלה {step + 1} מתוך {ADVISOR_PROFILE_QUESTIONS.length} — היכרות
        </p>
        {/* question */}
        <p className="text-base font-medium text-foreground mb-6 max-w-sm leading-relaxed">
          {q.prompt}
        </p>
        <fieldset className="contents">
          <legend className="sr-only">{q.prompt}</legend>
          {/* options */}
          <div className="flex flex-wrap gap-3 justify-center max-w-sm">
            {q.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOption(option)}
                className="px-4 py-2 glass-card rounded-full text-sm text-muted-foreground hover:text-foreground hover:shadow-md transition-all"
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
    </>
  );
}
