"use client"

import { useState } from "react"
import { parties, partyCategories } from "@/lib/election-data"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function ValueBadge({ value }: { value: string }) {
  const colorMap: Record<string, string> = {
    "בעד": "bg-emerald-50 text-emerald-600",
    "כן": "bg-emerald-50 text-emerald-600",
    "עדיפות גבוהה": "bg-emerald-50 text-emerald-600",
    "נגד": "bg-rose-50 text-rose-600",
    "לא": "bg-rose-50 text-rose-600",
    "לא בסדר יום": "bg-rose-50 text-rose-600",
    "חלקי": "bg-amber-50 text-amber-600",
    "מקומי": "bg-amber-50 text-amber-600",
    "דקרימינליזציה": "bg-amber-50 text-amber-600",
    "עדיפות נמוכה": "bg-amber-50 text-amber-600",
    "איזון": "bg-amber-50 text-amber-600",
    "מעורב": "bg-amber-50 text-amber-600",
    "ימין": "bg-blue-50 text-blue-600",
    "שמאל": "bg-pink-50 text-pink-600",
    "מרכז": "bg-purple-50 text-purple-600",
    "חרדים": "bg-slate-100 text-slate-600",
    "חילוניים": "bg-cyan-50 text-cyan-600",
    "ערבים": "bg-teal-50 text-teal-600",
    "קפיטליסט": "bg-orange-50 text-orange-600",
    "סוציאליסט": "bg-red-50 text-red-600",
    "משילות": "bg-indigo-50 text-indigo-600",
    "דמוקרטיה": "bg-sky-50 text-sky-600",
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

function PartyCard({ party, onClick }: {
  party: typeof parties[0]
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="aspect-square glass-card rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all"
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
        style={{ backgroundColor: party.color }}
      >
        {party.name.charAt(0)}
      </div>
      <div className="text-center px-2">
        <h3 className="font-medium text-[11px] text-foreground truncate w-full">{party.name}</h3>
        <p className="text-[10px] text-muted-foreground truncate w-full">{party.leader}</p>
      </div>
    </button>
  )
}

function PartyDialog({ party, open, onClose }: {
  party: typeof parties[0] | null
  open: boolean
  onClose: () => void
}) {
  if (!party) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm max-h-[85vh] overflow-y-auto glass-card border-0" dir="rtl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{ backgroundColor: party.color }}
            >
              {party.name.charAt(0)}
            </div>
            <div>
              <DialogTitle className="text-sm text-foreground">{party.name}</DialogTitle>
              <DialogDescription className="text-[11px] text-muted-foreground">{party.leader}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          {/* Core Parameters */}
          <div>
            <h4 className="text-[11px] font-semibold text-primary mb-2">
              {partyCategories.core.title}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {partyCategories.core.parameters.map((param) => (
                <div key={param.id} className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground">{param.label}</span>
                  <ValueBadge value={party.values[param.id as keyof typeof party.values] || "-"} />
                </div>
              ))}
            </div>
          </div>

          {/* Daily Parameters */}
          <div>
            <h4 className="text-[11px] font-semibold text-accent mb-2">
              {partyCategories.daily.title}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {partyCategories.daily.parameters.map((param) => (
                <div key={param.id} className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground">{param.label}</span>
                  <ValueBadge value={party.values[param.id as keyof typeof party.values] || "-"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function PartyComparisonGrid() {
  const [selectedParty, setSelectedParty] = useState<typeof parties[0] | null>(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {parties.map((party) => (
          <PartyCard
            key={party.id}
            party={party}
            onClick={() => setSelectedParty(party)}
          />
        ))}
      </div>

      <PartyDialog
        party={selectedParty}
        open={!!selectedParty}
        onClose={() => setSelectedParty(null)}
      />
    </>
  )
}
