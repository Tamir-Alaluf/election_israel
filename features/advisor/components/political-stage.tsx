"use client";

import type { AdvisorPoliticalStageProps } from "@/lib/types/advisor";

export function AdvisorPoliticalStage({
  roundIndex,
  maxRounds,
  step,
  question,
  onSelectOption,
}: AdvisorPoliticalStageProps) {
  return (
    <>
      {/* question & options selector */}
      <div
        className="flex-1 flex flex-col items-center justify-center text-center px-2"
        dir="rtl"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
          <p className="text-xs text-muted-foreground">
            שאלה {step + 1} מתוך 5
          </p>
          <span className="text-[10px] font-semibold rounded-full bg-primary/10 text-primary px-2 py-0.5 tabular-nums">
            סבב {roundIndex + 1}/{maxRounds}
          </span>
        </div>
        {/* question */}
        <p className="text-base font-medium text-foreground mb-6 max-w-sm leading-relaxed">
          {question.question}
        </p>
        {/* options */}
        <fieldset className="contents">
          <legend className="sr-only">{question.question}</legend>
          <div className="flex flex-wrap gap-3 justify-center max-w-sm">
            {question.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onSelectOption(option)}
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
