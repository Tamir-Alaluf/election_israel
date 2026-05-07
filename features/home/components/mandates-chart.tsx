"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/utils";
import type {
  MandatesBlocSummary,
  MandatesChartParty,
} from "@/lib/types/party-comparison";

type MandatesChartProps = {
  data: MandatesChartParty[];
  blocs?: MandatesBlocSummary[];
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

export function MandatesChart({
  data,
  blocs = [],
  lastUpdatedAt,
}: MandatesChartProps) {
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

      <BlocsGauge blocs={blocs} />

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
                  {party.leader}
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

type BlocsGaugeProps = {
  blocs: MandatesBlocSummary[];
};

function BlocsGauge({ blocs }: BlocsGaugeProps) {
  if (blocs.length === 0) return null;

  const chartConfig = blocs.reduce<ChartConfig>((config, bloc) => {
    config[bloc.key] = { label: bloc.label, color: bloc.color };
    return config;
  }, {});

  const pieData = blocs.filter((bloc) => bloc.mandates > 0);

  return (
    <section
      className="mt-6 rounded-xl border border-border/50 bg-muted/30 p-4"
      dir="rtl"
    >
      <h3 className="mb-3 text-center text-sm font-semibold text-foreground">
        מפת הגושים
      </h3>

      <ul className="sr-only">
        {blocs.map((bloc) => (
          <li key={`bloc-sr-${bloc.key}`}>
            {bloc.label}: {bloc.mandates} מנדטים
          </li>
        ))}
      </ul>

      <div className="relative mx-auto w-full max-w-none" aria-hidden="true">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-[2/1.25] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, _name, item) => {
                    const key = item?.payload?.key as string | undefined;
                    const label = key
                      ? chartConfig[key]?.label
                      : (item?.name as React.ReactNode);
                    return (
                      <div className="flex w-full items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                            style={{
                              backgroundColor: item?.payload?.fill as
                                | string
                                | undefined,
                            }}
                            aria-hidden="true"
                          />
                          {label}
                        </span>
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {Number(value).toLocaleString()} מנדטים
                        </span>
                      </div>
                    );
                  }}
                />
              }
            />
            <Pie
              data={pieData}
              dataKey="mandates"
              nameKey="key"
              startAngle={180}
              endAngle={0}
              innerRadius="45%"
              outerRadius="100%"
              cy="92%"
              stroke="var(--background)"
              strokeWidth={2}
              paddingAngle={pieData.length > 1 ? 1 : 0}
              isAnimationActive
              animationDuration={700}
            >
              {pieData.map((bloc) => (
                <Cell key={bloc.key} fill={`var(--color-${bloc.key})`} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-2" aria-hidden="true">
        {blocs.map((bloc) => (
          <BlocTile key={bloc.key} bloc={bloc} />
        ))}
      </ul>
    </section>
  );
}

type BlocTileProps = {
  bloc: MandatesBlocSummary;
};

function BlocTile({ bloc }: BlocTileProps) {
  return (
    <li className="flex flex-col items-start gap-1 rounded-lg border border-border/50 bg-background/60 p-3">
      <div className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full border border-foreground/10"
          style={{ backgroundColor: bloc.color }}
          aria-hidden="true"
        />
        <span className="text-[11px] leading-tight text-muted-foreground sm:text-xs">
          {bloc.label}
        </span>
      </div>
      <span className="text-2xl font-bold leading-none tabular-nums text-foreground sm:text-3xl">
        {bloc.mandates}
      </span>
    </li>
  );
}
