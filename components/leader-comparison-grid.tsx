"use client"

import { useState } from "react"
import { leaders, leaderParameters } from "@/lib/election-data"
import { cn } from "@/lib/utils"
import { User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
            "w-2.5 h-1.5 rounded-full",
            i < value ? "bg-primary" : "bg-muted"
          )}
        />
      ))}
    </div>
  )
}

function StatusBadge({ value }: { value: string }) {
  const colorMap: Record<string, string> = {
    "ללא": "bg-emerald-50 text-emerald-600",
    "כתבי אישום פעילים": "bg-rose-50 text-rose-600",
    "הרשעות קודמות": "bg-amber-50 text-amber-600",
  }

  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-[10px] font-medium rounded-full",
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
      className="aspect-square glass-card rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all"
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: leader.color }}
      >
        <User className="w-5 h-5" />
      </div>
      <div className="text-center px-2">
        <h3 className="font-medium text-[11px] text-foreground truncate w-full">{leader.name}</h3>
        <p className="text-[10px] text-muted-foreground truncate w-full">{leader.party}</p>
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
      <DialogContent className="max-w-xs max-h-[85vh] overflow-y-auto glass-card border-0" dir="rtl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: leader.color }}
            >
              <User className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-sm text-foreground">{leader.name}</DialogTitle>
              <DialogDescription className="text-[11px] text-muted-foreground">{leader.party}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2 mt-3">
          {leaderParameters.map((param) => {
            const value = leader.values[param.id as keyof typeof leader.values]
            
            return (
              <div key={param.id} className="flex items-center justify-between gap-3 py-2 border-b border-border/30 last:border-0">
                <span className="text-[11px] text-muted-foreground">
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
                    <span className="text-[11px] font-medium text-foreground">{value}</span>
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
      <div className="grid grid-cols-3 gap-3">
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
