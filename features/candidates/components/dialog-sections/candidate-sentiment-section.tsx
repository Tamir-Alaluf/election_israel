import { LEADER_SENTIMENT_LABELS } from "@/lib/constants/candidates";

function SentimentBlock({
  label,
  text,
}: {
  label: string;
  text: string | null;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
        {text ?? "—"}
      </p>
    </div>
  );
}

export function LeaderSentimentContent({
  positiveSentiment,
  negativeSentiment,
}: {
  positiveSentiment: string | null;
  negativeSentiment: string | null;
}) {
  return (
    <div className="space-y-4">
      <SentimentBlock
        label={LEADER_SENTIMENT_LABELS.positive}
        text={positiveSentiment}
      />
      <SentimentBlock
        label={LEADER_SENTIMENT_LABELS.negative}
        text={negativeSentiment}
      />
    </div>
  );
}
