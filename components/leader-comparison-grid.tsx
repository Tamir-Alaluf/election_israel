"use client"

import { useState } from "react"
import { leaders, leaderParameters } from "@/lib/election-data"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, User } from "lucide-react"

function RatingBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-4 h-2 rounded-full transition-colors",
            i < value ? "bg-primary" : "bg-muted"
          )}
        />
      ))}
    </div>
  )
}

function StatusBadge({ value }: { value: string }) {
  const colorMap: Record<string, string> = {
    "ללא": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "כתבי אישום פעילים": "bg-rose-500/20 text-rose-400 border-rose-500/30",
    "הרשעות קודמות": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  }

  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-xs font-medium rounded-full border",
        colorMap[value] || "bg-muted text-muted-foreground border-border"
      )}
    >
      {value}
    </span>
  )
}

function LeaderCard({ leader, isExpanded, onToggle }: {
  leader: typeof leaders[0]
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all hover:border-border"
      style={{ borderTopColor: leader.color, borderTopWidth: 3 }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-right hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: leader.color }}
          >
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{leader.name}</h3>
            <p className="text-sm text-muted-foreground">{leader.party}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {leaderParameters.map((param) => {
            const value = leader.values[param.id as keyof typeof leader.values]
            
            return (
              <div key={param.id} className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground flex-shrink-0">
                  {param.label}
                </span>
                <div className="flex-shrink-0">
                  {param.type === "rating" && typeof value === "number" && (
                    <RatingBar value={value} />
                  )}
                  {param.type === "scale" && typeof value === "number" && (
                    <RatingBar value={value} />
                  )}
                  {param.type === "status" && typeof value === "string" && (
                    <StatusBadge value={value} />
                  )}
                  {param.type === "text" && typeof value === "string" && (
                    <span className="text-sm font-medium">{value}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function LeaderComparisonGrid() {
  const [expandedLeaders, setExpandedLeaders] = useState<string[]>([leaders[0]?.id || ""])

  const toggleLeader = (leaderId: string) => {
    setExpandedLeaders((prev) =>
      prev.includes(leaderId)
        ? prev.filter((id) => id !== leaderId)
        : [...prev, leaderId]
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {leaders.map((leader) => (
        <LeaderCard
          key={leader.id}
          leader={leader}
          isExpanded={expandedLeaders.includes(leader.id)}
          onToggle={() => toggleLeader(leader.id)}
        />
      ))}
    </div>
  )
}
