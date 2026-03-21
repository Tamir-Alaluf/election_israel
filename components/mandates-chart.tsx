"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from "recharts"
import { parties } from "@/lib/election-data"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const baseData = parties.map((party) => ({
  name: party.name,
  mandates: party.mandates,
  color: party.color,
})).sort((a, b) => b.mandates - a.mandates)

export function MandatesChart() {
  const [data, setData] = useState(baseData)

  // Simulate live updates with small random changes
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          mandates: Math.max(
            4,
            Math.min(35, item.mandates + Math.floor(Math.random() * 3) - 1)
          ),
        })).sort((a, b) => b.mandates - a.mandates)
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const chartConfig = data.reduce((acc, party) => {
    acc[party.name] = { label: party.name, color: party.color }
    return acc
  }, {} as Record<string, { label: string; color: string }>)

  return (
    <div className="glass-card rounded-2xl p-5">
      <h2 className="text-base font-semibold text-foreground mb-1 text-center">
        סקר מנדטים
      </h2>
      <p className="text-xs text-muted-foreground mb-4 text-center">
        מתעדכן בזמן אמת
      </p>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="horizontal" 
            margin={{ left: 10, right: 10, top: 20, bottom: 60 }}
          >
            <XAxis 
              type="category"
              dataKey="name"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis 
              type="number" 
              domain={[0, 35]} 
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              width={25}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />
            <Bar
              dataKey="mandates"
              radius={[4, 4, 0, 0]}
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList 
                dataKey="mandates" 
                position="top" 
                fontSize={10}
                fill="hsl(var(--foreground))"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
