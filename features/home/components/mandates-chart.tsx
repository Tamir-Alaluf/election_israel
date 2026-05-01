"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { MandatesChartParty } from "@/features/parties/types/party-comparison";

type MandatesChartProps = {
  data: MandatesChartParty[];
  /** When the poll was last updated. Defaults to today. */
  lastUpdatedAt?: Date;
};

function formatHebrewDate(date: Date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

function getInitials(name: string) {
  const cleaned = name.trim();
  if (!cleaned) return "";
  return cleaned.slice(0, 2);
}

export function MandatesChart({ data, lastUpdatedAt }: MandatesChartProps) {
  if (data.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-5">
        <h2 className="text-base font-semibold text-foreground mb-1 text-center">
          סקר מנדטים
        </h2>
        <p className="text-xs text-muted-foreground text-center">
          אין נתוני מנדטים להצגה
        </p>
      </div>
    );
  }

  const maxMandates = Math.max(...data.map((d) => d.mandates));
  const updatedAt = lastUpdatedAt ?? new Date();

  return (
    <div className="glass-card rounded-2xl p-5">
      <h2 className="text-base font-semibold text-foreground mb-1 text-center">
        סקר מנדטים
      </h2>
      <p className="text-xs text-muted-foreground mb-4 text-center">
        חלוקת מנדטים לפי סקרים
      </p>

      <ul className="sr-only">
        {data.map((d) => (
          <li key={`sr-${d.key}`}>
            {d.name}
            {d.leader ? ` בראשות ${d.leader}` : ""}: {d.mandates} מנדטים
          </li>
        ))}
      </ul>

      <TooltipProvider>
        <ol className="flex flex-col gap-2.5" aria-hidden="true">
          {data.map((party, index) => (
            <MandatesChartRow
              key={party.key}
              party={party}
              maxMandates={maxMandates}
              index={index}
            />
          ))}
        </ol>
      </TooltipProvider>

      <p className="mt-4 text-[11px] text-muted-foreground text-end">
        מעודכן ל- {formatHebrewDate(updatedAt)}
      </p>
    </div>
  );
}

type MandatesChartRowProps = {
  party: MandatesChartParty;
  maxMandates: number;
  index: number;
};

function MandatesChartRow({
  party,
  maxMandates,
  index,
}: MandatesChartRowProps) {
  const widthPct = Math.max(2, (party.mandates / maxMandates) * 100);
  const ariaLabel = party.leader
    ? `${party.name} בראשות ${party.leader}: ${party.mandates} מנדטים`
    : `${party.name}: ${party.mandates} מנדטים`;

  return (
    <li>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            tabIndex={0}
            role="img"
            aria-label={ariaLabel}
            className={cn(
              "grid items-center gap-2.5 rounded-md outline-none",
              "grid-cols-[minmax(7rem,10rem)_2.25rem_1fr]",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <div className="text-right text-[11px] sm:text-xs font-medium leading-tight text-foreground/90">
              <span className="block">{party.name}</span>
              {party.leader ? (
                <span className="block text-muted-foreground">
                  בראשות {party.leader}
                </span>
              ) : null}
            </div>

            <div className="relative h-9 w-9 overflow-hidden rounded-md border border-border bg-muted">
              {party.leaderImage ? (
                <Image
                  src={party.leaderImage}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                <span
                  className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-foreground/70"
                  aria-hidden="true"
                >
                  {getInitials(party.leader || party.name)}
                </span>
              )}
            </div>

            <div className="flex h-7 items-center" role="presentation">
              <motion.div
                className="h-full rounded-md"
                style={{ backgroundColor: "var(--primary)" }}
                initial={{ width: 0 }}
                animate={{ width: `${widthPct}%` }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: 0.05 * index,
                }}
              />
              <span className="px-2 text-sm font-semibold tabular-nums text-foreground">
                {party.mandates}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          {ariaLabel}
        </TooltipContent>
      </Tooltip>
    </li>
  );
}
