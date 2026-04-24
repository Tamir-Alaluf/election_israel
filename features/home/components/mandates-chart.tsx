"use client";

import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts";
import type { MandatesChartParty } from "@/lib/data/party-comparison";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

function wrapHebrewLabel(value: string) {
  const parts = value.split(" ");
  if (parts.length <= 1) return [value];
  if (parts.length === 2) return parts;
  return [parts.slice(0, -1).join(" "), parts.at(-1) ?? ""];
}

type MandatesChartProps = {
  data: MandatesChartParty[];
};

export function MandatesChart({ data }: MandatesChartProps) {
  const chartConfig = data.reduce(
    (acc, party) => {
      acc[party.key] = { label: party.name, color: party.color };
      return acc;
    },
    {} as Record<string, { label: string; color: string }>,
  );

  if (data.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-5">
        <h2 className="text-base font-semibold text-foreground mb-1 text-center">
          סקר מנדטים
        </h2>
        <p className="text-xs text-muted-foreground text-center">אין נתוני מנדטים להצגה</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-5">
      <h2 className="text-base font-semibold text-foreground mb-1 text-center">
        סקר מנדטים
      </h2>
      <p className="text-xs text-muted-foreground mb-4 text-center">
        חלוקת מנדטים לפי סקרים
      </p>
      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <BarChart
          data={data}
          margin={{ left: 8, right: 8, top: 16, bottom: 55 }}
        >
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            interval={0}
            height={44}
            tickMargin={10}
            tick={({ x, y, payload }) => {
              const lines = wrapHebrewLabel(String(payload.value));
              return (
                <text
                  x={x}
                  y={y + 14}
                  textAnchor="middle"
                  fontSize={11}
                  fill="hsl(var(--muted-foreground))"
                >
                  {lines.slice(0, 2).map((line, idx) => (
                    <tspan key={idx} x={x} dy={idx === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
              );
            }}
          />
          <YAxis
            domain={[0, 35]}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            width={28}
          />
          <ChartTooltip
            content={<ChartTooltipContent nameKey="key" labelKey="name" />}
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
          />
          <Bar dataKey="mandates" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.key} fill={d.color} />
            ))}
            <LabelList
              dataKey="mandates"
              position="top"
              fontSize={10}
              fill="hsl(var(--foreground))"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
