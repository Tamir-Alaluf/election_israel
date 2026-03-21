"use client"

import { useState } from "react"
import { parties, partyCategories } from "@/lib/election-data"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
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
    "חרדים": "bg-slate-200 text-slate-700",
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
        "inline-block px-2.5 py-1 text-xs font-medium rounded-full",
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
      className="group relative aspect-square rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-xl"
      style={{ 
        background: `linear-gradient(145deg, ${party.color}15 0%, ${party.color}30 100%)`,
      }}
    >
      {/* Accent stripe */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: party.color }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        {/* Party initial with gradient ring */}
        <div className="relative mb-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300"
            style={{ 
              background: `linear-gradient(135deg, ${party.color} 0%, ${party.color}cc 100%)`,
            }}
          >
            {party.name.charAt(0)}
          </div>
        </div>
        
        {/* Party name */}
        <h3 className="font-bold text-sm text-foreground text-center leading-tight">
          {party.name}
        </h3>
        
        {/* Leader name */}
        <p className="text-xs text-muted-foreground mt-1 text-center">
          {party.leader}
        </p>
        
        {/* Mandates badge */}
        {party.mandates && (
          <div 
            className="mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: party.color }}
          >
            {party.mandates} מנדטים
          </div>
        )}
      </div>
      
      {/* Hover indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-xs text-muted-foreground">לחץ לפרטים</div>
      </div>
    </button>
  )
}

function PartyDialog({ party, open, onClose }: {
  party: typeof parties[0] | null
  open: boolean
  onClose: () => void
}) {
  const [paramsOpen, setParamsOpen] = useState(true)
  const [bottomLineOpen, setBottomLineOpen] = useState(true)

  if (!party) return null

  // Combine all parameters for the comparison section
  const allParams = [
    ...partyCategories.core.parameters,
    ...partyCategories.daily.parameters,
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto glass-card border-0" dir="rtl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: party.color }}
            >
              {party.name.charAt(0)}
            </div>
            <div>
              <DialogTitle className="text-lg text-foreground">{party.name}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">{party.leader}</DialogDescription>
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
                {allParams.map((param) => (
                  <div key={param.id} className="flex items-center justify-between py-2 px-1 border-b border-border/30 last:border-0">
                    <span className="text-sm text-muted-foreground">{param.label}</span>
                    <ValueBadge value={party.values[param.id as keyof typeof party.values] || "-"} />
                  </div>
                ))}
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
                  {party.name} היא מפלגת {party.values.type} עם עמדה {party.values.security} בביטחון ו{party.values.economy} בכלכלה. 
                  המפלגה {party.values.harediGov === "כן" ? "תומכת" : party.values.harediGov === "לא" ? "מתנגדת" : "תומכת באופן חלקי"} בשילוב חרדים בממשלה 
                  ו{party.values.arabGov === "כן" ? "תומכת" : party.values.arabGov === "לא" ? "מתנגדת" : "תומכת באופן חלקי"} בשילוב ערבים.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function PartyComparisonGrid() {
  const [selectedParty, setSelectedParty] = useState<typeof parties[0] | null>(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
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
