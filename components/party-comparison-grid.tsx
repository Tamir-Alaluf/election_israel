"use client"

import { useState } from "react"
import { parties, partyCategories } from "@/lib/election-data"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"

function ValueBadge({ value }: { value: string }) {
  const colorMap: Record<string, string> = {
    // Positive/Pro
    "בעד": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "כן": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "עדיפות גבוהה": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    // Negative/Against
    "נגד": "bg-rose-500/20 text-rose-400 border-rose-500/30",
    "לא": "bg-rose-500/20 text-rose-400 border-rose-500/30",
    "לא בסדר יום": "bg-rose-500/20 text-rose-400 border-rose-500/30",
    // Partial/Mixed
    "חלקי": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "מקומי": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "דקרימינליזציה": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "עדיפות נמוכה": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "איזון": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "מעורב": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    // Neutral types
    "ימין": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "שמאל": "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "מרכז": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "חרדים": "bg-slate-500/20 text-slate-300 border-slate-500/30",
    "חילוניים": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "ערבים": "bg-teal-500/20 text-teal-400 border-teal-500/30",
    "קפיטליסט": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "סוציאליסט": "bg-red-500/20 text-red-400 border-red-500/30",
    "משילות": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    "דמוקרטיה": "bg-sky-500/20 text-sky-400 border-sky-500/30",
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

function PartyCard({ party, isExpanded, onToggle }: {
  party: typeof parties[0]
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all hover:border-border"
      style={{ borderTopColor: party.color, borderTopWidth: 3 }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-right hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: party.color }}
          >
            {party.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{party.name}</h3>
            <p className="text-sm text-muted-foreground">{party.leader}</p>
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
        <div className="px-4 pb-4 space-y-4">
          {/* Core Parameters */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-2">
              {partyCategories.core.title}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {partyCategories.core.parameters.map((param) => (
                <div key={param.id} className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{param.label}</span>
                  <ValueBadge value={party.values[param.id as keyof typeof party.values] || "-"} />
                </div>
              ))}
            </div>
          </div>

          {/* Daily Parameters */}
          <div>
            <h4 className="text-sm font-semibold text-accent mb-2">
              {partyCategories.daily.title}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {partyCategories.daily.parameters.map((param) => (
                <div key={param.id} className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{param.label}</span>
                  <ValueBadge value={party.values[param.id as keyof typeof party.values] || "-"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function PartyComparisonGrid() {
  const [expandedParties, setExpandedParties] = useState<string[]>([parties[0]?.id || ""])

  const toggleParty = (partyId: string) => {
    setExpandedParties((prev) =>
      prev.includes(partyId)
        ? prev.filter((id) => id !== partyId)
        : [...prev, partyId]
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {parties.map((party) => (
        <PartyCard
          key={party.id}
          party={party}
          isExpanded={expandedParties.includes(party.id)}
          onToggle={() => toggleParty(party.id)}
        />
      ))}
    </div>
  )
}
