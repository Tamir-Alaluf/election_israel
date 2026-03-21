"use client"

import { useState } from "react"
import { leaders, leaderParameters } from "@/lib/election-data"
import { cn } from "@/lib/utils"
import { User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function RatingBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-3 h-1.5 rounded-full",
            i < value ? "bg-primary" : "bg-muted"
          )}
        />
      ))}
    </div>
  )
}

function StatusBadge({ value }: { value: string }) {
  const colorMap: Record<string, string> = {
    "ללא": "bg-emerald-100 text-emerald-700",
    "כתבי אישום פעילים": "bg-rose-100 text-rose-700",
    "הרשעות קודמות": "bg-amber-100 text-amber-700",
  }

  return (
    <span
      className={cn(
        "inline-block px-1.5 py-0.5 text-[10px] font-medium rounded",
        colorMap[value] || "bg-muted text-muted-foreground"
      )}
    >
      {value}
    </span>
  )
}

function LeaderCard({ leader, onClick }: {
  leader: typeof leaders[0]
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full p-3 rounded-lg border border-border bg-card hover:border-accent/30 hover:shadow-sm transition-all text-right"
    >
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: leader.color }}
        >
          <User className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{leader.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{leader.party}</p>
        </div>
      </div>
    </button>
  )
}

function LeaderDialog({ leader, open, onClose }: {
  leader: typeof leaders[0] | null
  open: boolean
  onClose: () => void
}) {
  if (!leader) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm max-h-[85vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: leader.color }}
            >
              <User className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-base">{leader.name}</DialogTitle>
              <p className="text-xs text-muted-foreground">{leader.party}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2 mt-2">
          {leaderParameters.map((param) => {
            const value = leader.values[param.id as keyof typeof leader.values]
            
            return (
              <div key={param.id} className="flex items-center justify-between gap-3 py-1.5 border-b border-border/50 last:border-0">
                <span className="text-xs text-muted-foreground">
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
                    <span className="text-xs font-medium">{value}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function LeaderComparisonGrid() {
  const [selectedLeader, setSelectedLeader] = useState<typeof leaders[0] | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {leaders.map((leader) => (
          <LeaderCard
            key={leader.id}
            leader={leader}
            onClick={() => setSelectedLeader(leader)}
          />
        ))}
      </div>

      <LeaderDialog
        leader={selectedLeader}
        open={!!selectedLeader}
        onClose={() => setSelectedLeader(null)}
      />
    </>
  )
}
