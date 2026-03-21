"use client"

import { useState } from "react"
import { leaders, leaderParameters } from "@/lib/election-data"
import { cn } from "@/lib/utils"
import { User, ChevronDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

function RatingBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-3 h-2 rounded-full",
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
        "inline-block px-2.5 py-1 text-xs font-medium rounded-full",
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
      className="group relative aspect-square rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-xl"
      style={{ 
        background: `linear-gradient(145deg, ${leader.color}15 0%, ${leader.color}30 100%)`,
      }}
    >
      {/* Accent stripe */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: leader.color }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        {/* Leader icon with gradient */}
        <div className="relative mb-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300"
            style={{ 
              background: `linear-gradient(135deg, ${leader.color} 0%, ${leader.color}cc 100%)`,
            }}
          >
            <User className="w-6 h-6" />
          </div>
        </div>
        
        {/* Leader name */}
        <h3 className="font-bold text-sm text-foreground text-center leading-tight">
          {leader.name}
        </h3>
        
        {/* Party name */}
        <p className="text-xs text-muted-foreground mt-1 text-center">
          {leader.party}
        </p>
        
        {/* Security rating badge */}
        <div 
          className="mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white flex items-center gap-1"
          style={{ backgroundColor: leader.color }}
        >
          <span>ביטחון</span>
          <span>{leader.values.securityBg}/5</span>
        </div>
      </div>
      
      {/* Hover indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-xs text-muted-foreground">לחץ לפרטים</div>
      </div>
    </button>
  )
}

function LeaderDialog({ leader, open, onClose }: {
  leader: typeof leaders[0] | null
  open: boolean
  onClose: () => void
}) {
  const [paramsOpen, setParamsOpen] = useState(true)
  const [bottomLineOpen, setBottomLineOpen] = useState(true)

  if (!leader) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto glass-card border-0" dir="rtl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: leader.color }}
            >
              <User className="w-7 h-7" />
            </div>
            <div>
              <DialogTitle className="text-lg text-foreground">{leader.name}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">{leader.party}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Parameters for Comparison */}
          <Collapsible open={paramsOpen} onOpenChange={setParamsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <span className="font-semibold text-sm text-foreground">פרמטרים להשוואה</span>
              <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", paramsOpen && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="space-y-2">
                {leaderParameters.map((param) => {
                  const value = leader.values[param.id as keyof typeof leader.values]
                  
                  return (
                    <div key={param.id} className="flex items-center justify-between py-2 px-1 border-b border-border/30 last:border-0">
                      <span className="text-sm text-muted-foreground">{param.label}</span>
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
                          <span className="text-sm font-medium text-foreground">{value}</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Bottom Line */}
          <Collapsible open={bottomLineOpen} onOpenChange={setBottomLineOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <span className="font-semibold text-sm text-foreground">שורה תחתונה</span>
              <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", bottomLineOpen && "rotate-180")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-sm text-foreground leading-relaxed">
                  {leader.name} הוא מנהיג מפלגת {leader.party} עם רקע ביטחוני ברמה {leader.values.securityBg}/5 
                  ורקע כלכלי ברמה {leader.values.economicBg}/5. 
                  סגנון החיים שלו {leader.values.lifestyle} 
                  {leader.values.criminal !== "ללא" ? ` ויש לו ${leader.values.criminal}` : " וללא רקע פלילי"}.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function LeaderComparisonGrid() {
  const [selectedLeader, setSelectedLeader] = useState<typeof leaders[0] | null>(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
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
