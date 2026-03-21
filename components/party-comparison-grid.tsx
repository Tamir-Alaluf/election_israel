"use client"

import { useState } from "react"
import { parties, partyCategories } from "@/lib/election-data"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function ValueBadge({ value }: { value: string }) {
  const colorMap: Record<string, string> = {
    "בעד": "bg-emerald-100 text-emerald-700",
    "כן": "bg-emerald-100 text-emerald-700",
    "עדיפות גבוהה": "bg-emerald-100 text-emerald-700",
    "נגד": "bg-rose-100 text-rose-700",
    "לא": "bg-rose-100 text-rose-700",
    "לא בסדר יום": "bg-rose-100 text-rose-700",
    "חלקי": "bg-amber-100 text-amber-700",
    "מקומי": "bg-amber-100 text-amber-700",
    "דקרימינליזציה": "bg-amber-100 text-amber-700",
    "עדיפות נמוכה": "bg-amber-100 text-amber-700",
    "איזון": "bg-amber-100 text-amber-700",
    "מעורב": "bg-amber-100 text-amber-700",
    "ימין": "bg-blue-100 text-blue-700",
    "שמאל": "bg-pink-100 text-pink-700",
    "מרכז": "bg-purple-100 text-purple-700",
    "חרדים": "bg-slate-100 text-slate-700",
    "חילוניים": "bg-cyan-100 text-cyan-700",
    "ערבים": "bg-teal-100 text-teal-700",
    "קפיטליסט": "bg-orange-100 text-orange-700",
    "סוציאליסט": "bg-red-100 text-red-700",
    "משילות": "bg-indigo-100 text-indigo-700",
    "דמוקרטיה": "bg-sky-100 text-sky-700",
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

function PartyCard({ party, onClick }: {
  party: typeof parties[0]
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full p-3 rounded-lg border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all text-right"
    >
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
          style={{ backgroundColor: party.color }}
        >
          {party.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{party.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{party.leader}</p>
        </div>
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
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
              style={{ backgroundColor: party.color }}
            >
              {party.name.charAt(0)}
            </div>
            <div>
              <DialogTitle className="text-base">{party.name}</DialogTitle>
              <p className="text-xs text-muted-foreground">{party.leader}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Core Parameters */}
          <div>
            <h4 className="text-xs font-semibold text-primary mb-2">
              {partyCategories.core.title}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {partyCategories.core.parameters.map((param) => (
                <div key={param.id} className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-muted-foreground">{param.label}</span>
                  <ValueBadge value={party.values[param.id as keyof typeof party.values] || "-"} />
                </div>
              ))}
            </div>
          </div>

          {/* Daily Parameters */}
          <div>
            <h4 className="text-xs font-semibold text-accent mb-2">
              {partyCategories.daily.title}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {partyCategories.daily.parameters.map((param) => (
                <div key={param.id} className="flex flex-col gap-0.5">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
