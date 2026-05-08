"use client";

import { useCallback, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Bot } from "lucide-react";
import {
  computeAdvisorMatching,
  generateAdvisorPoliticalBatch,
} from "@/lib/utils/advisor-actions";
import { AdvisorPoliticalStage } from "@/features/advisor/components/political-stage";
import { AdvisorProfileStage } from "@/features/advisor/components/profile-stage";
import { AdvisorResultScreen } from "@/features/advisor/components/result-screen";
import type {
  AdvisorFinalProfile,
  AdvisorPoliticalQA,
  AdvisorProfileBase,
} from "@/lib/types/advisor";
import { ADVISOR_MAX_ROUNDS } from "@/lib/constants/advisor";
import type {
  AdvisorFlowProps,
  AdvisorFlowStage,
} from "@/lib/types/advisor";
import { Button } from "@/components/ui/button";

export function AdvisorFlow({
  onMatchingComplete,
  onHandOffToChat,
}: AdvisorFlowProps) {
  const [profileBase, setProfileBase] = useState<AdvisorProfileBase | null>(
    null,
  );
  const [rounds, setRounds] = useState<AdvisorPoliticalQA[]>([]);
  const roundsRef = useRef<AdvisorPoliticalQA[]>([]);
  const [stage, setStage] = useState<AdvisorFlowStage>({ kind: "profile" });

  const loadBatch = useCallback(
    async (
      base: AdvisorProfileBase,
      roundIndex: number,
      prior: AdvisorPoliticalQA[],
    ) => {
      setStage({ kind: "loadingBatch", roundIndex });
      const questions = await generateAdvisorPoliticalBatch(
        base,
        prior,
        roundIndex,
      );
      setStage({
        kind: "political",
        roundIndex,
        questions,
        step: 0,
      });
    },
    [],
  );

  const handleProfileComplete = useCallback(
    (base: AdvisorProfileBase) => {
      setProfileBase(base);
      setRounds([]);
      roundsRef.current = [];
      void loadBatch(base, 0, []);
    },
    [loadBatch],
  );

  const runMatching = useCallback(
    async (final: AdvisorFinalProfile) => {
      setStage({ kind: "loadingResult" });
      const data = await computeAdvisorMatching(final);
      setStage({ kind: "result", data });
      onMatchingComplete?.(data, final);
    },
    [onMatchingComplete],
  );

  const handlePoliticalOption = useCallback(
    (option: string) => {
      if (stage.kind !== "political") return;
      const { roundIndex, questions, step } = stage;
      const q = questions[step];
      const qa: AdvisorPoliticalQA = {
        question: q.question,
        options: q.options,
        answer: option,
      };
      const nextRounds = [...roundsRef.current, qa];
      roundsRef.current = nextRounds;
      setRounds(nextRounds);

      if (step < questions.length - 1) {
        setStage({
          kind: "political",
          roundIndex,
          questions,
          step: step + 1,
        });
        return;
      }

      if (!profileBase) return;

      if (roundIndex >= ADVISOR_MAX_ROUNDS - 1) {
        void runMatching({
          ...profileBase,
          rounds: nextRounds,
        });
        return;
      }

      setStage({ kind: "betweenRounds", completedRoundIndex: roundIndex });
    },
    [profileBase, runMatching, stage],
  );

  const handleFinishMatching = useCallback(() => {
    if (!profileBase) return;
    void runMatching({
      ...profileBase,
      rounds: roundsRef.current,
    });
  }, [profileBase, runMatching]);

  /** Loads the next batch of 5 questions. */
  const handleAnotherFive = useCallback(() => {
    if (!profileBase) return;
    if (stage.kind !== "betweenRounds") return;
    const nextRound = stage.completedRoundIndex + 1;
    void loadBatch(profileBase, nextRound, roundsRef.current);
  }, [loadBatch, profileBase, stage]);

  return (
    <>
      {/* intro */}
      <div className="shrink-0 pt-8 pb-4 text-center" dir="rtl">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Bot className="w-8 h-8 text-primary" aria-hidden />
        </div>
        <h1 className="text-lg font-semibold text-foreground mb-1">
          התאמה חכמה
        </h1>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          {stage.kind === "profile"
            ? "כמה שאלות היכרות — ואז שאלות מדיניות מותאמות אישית."
            : stage.kind === "result"
              ? "הנה סיכום והמלצות — אפשר להמשיך בשיחה חופשית."
              : "ענו בלחיצה על אחת האפשרויות בכל שלב."}
        </p>
      </div>

      {/* profile stage */}
      {stage.kind === "profile" ? (
        <AdvisorProfileStage onComplete={handleProfileComplete} />
      ) : null}

      {/* loading batch */}
      {stage.kind === "loadingBatch" || stage.kind === "loadingResult" ? (
        <div
          className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4 min-h-[200px]"
          dir="rtl"
        >
          <Loader2
            className="h-10 w-10 animate-spin text-primary"
            aria-hidden
          />
          <p className="text-sm text-muted-foreground">
            {stage.kind === "loadingBatch"
              ? "מכינים את סבב השאלות..."
              : "מחשבים התאמות..."}
          </p>
        </div>
      ) : null}

      {/* political stage */}
      {stage.kind === "political" ? (
        <AdvisorPoliticalStage
          roundIndex={stage.roundIndex}
          maxRounds={ADVISOR_MAX_ROUNDS}
          step={stage.step}
          question={stage.questions[stage.step]}
          onSelectOption={handlePoliticalOption}
        />
      ) : null}

      {/* between rounds */}
      {stage.kind === "betweenRounds" && profileBase ? (
        <div
          className="flex-1 flex flex-col items-center justify-center gap-4 px-4 text-center max-w-sm mx-auto"
          dir="rtl"
        >
          <p className="text-sm font-medium text-foreground leading-relaxed">
            סיימתם סבב של 5 שאלות. רוצים תוצאות עכשיו או עוד 5 שאלות ממוקדות?
          </p>
          <div className="flex flex-col w-full gap-3">
            <Button
              type="button"
              className="w-full rounded-2xl h-11 text-sm font-semibold"
              onClick={handleFinishMatching}
            >
              סיימו את ההתאמה
            </Button>
            {stage.completedRoundIndex < ADVISOR_MAX_ROUNDS - 1 ? (
              <Button
                type="button"
                variant="secondary"
                className="w-full rounded-2xl h-11 text-sm font-semibold"
                onClick={handleAnotherFive}
              >
                המשיכו עוד 5 שאלות
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* result screen */}
      {stage.kind === "result" && profileBase ? (
        <div className="flex-1 flex flex-col py-4">
          <AdvisorResultScreen
            result={stage.data}
            finalProfile={{ ...profileBase, rounds }}
            onStartChat={(text) => {
              onHandOffToChat?.(text);
            }}
          />
        </div>
      ) : null}
    </>
  );
}
