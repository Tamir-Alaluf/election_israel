"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { leaders, leaderParameters } from "@/lib/election-data"
import { cn } from "@/lib/utils"
import { ChevronDown, Search } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

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
      className="aspect-square glass-card rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
    >
      <div
        className="relative w-14 h-14 rounded-full overflow-hidden flex items-center justify-center"
      >
        <Image
          src={leader.image}
          alt={`${leader.name} icon`}
          width={56}
          height={56}
          className="object-cover"
        />
      </div>
      <div className="text-center px-3">
        <h3 className="font-semibold text-sm text-foreground">{leader.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{leader.party}</p>
      </div>
    </button>
  )
}

function LeaderDialog({ leader, open, onClose }: {
  leader: typeof leaders[0] | null
  open: boolean
  onClose: () => void
}) {
  const [paramsOpen, setParamsOpen] = useState(false)
  const [bottomLineOpen, setBottomLineOpen] = useState(true)

  if (!leader) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto glass-card border-0" dir="rtl">
        <DialogHeader>
          <div className="flex flex-col items-center gap-3 text-center">
            <div
              className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center"
            >
              <Image
                src={leader.image}
                alt={`${leader.name} icon`}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <DialogTitle className="text-lg text-foreground">{leader.name}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">{leader.party}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Collapsible open={bottomLineOpen} onOpenChange={setBottomLineOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <span className="font-semibold text-sm text-foreground">תיאור קצר</span>
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
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function LeaderComparisonGrid() {
  const [selectedLeader, setSelectedLeader] = useState<typeof leaders[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [partyFilter, setPartyFilter] = useState<string>("all")
  const [criminalFilter, setCriminalFilter] = useState<string>("all")
  const [lifestyleFilter, setLifestyleFilter] = useState<string>("all")
  const [securityBgFilter, setSecurityBgFilter] = useState<string>("all")

  // Get unique values for filters
  const uniqueParties = useMemo(() => [...new Set(leaders.map(l => l.party))], [])
  const uniqueLifestyles = useMemo(() => [...new Set(leaders.map(l => l.values.lifestyle))], [])
  const uniqueCriminal = useMemo(() => [...new Set(leaders.map(l => l.values.criminal))], [])

  const filteredLeaders = useMemo(() => {
    return leaders.filter((leader) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (
          !leader.name.toLowerCase().includes(query) &&
          !leader.party.toLowerCase().includes(query)
        ) {
          return false
        }
      }
      // Party filter
      if (partyFilter !== "all" && leader.party !== partyFilter) {
        return false
      }
      // Criminal filter
      if (criminalFilter !== "all" && leader.values.criminal !== criminalFilter) {
        return false
      }
      // Lifestyle filter
      if (lifestyleFilter !== "all" && leader.values.lifestyle !== lifestyleFilter) {
        return false
      }
      // Security background filter (high = 4-5, medium = 2-3, low = 1)
      if (securityBgFilter !== "all") {
        const bg = leader.values.securityBg
        if (securityBgFilter === "high" && bg < 4) return false
        if (securityBgFilter === "medium" && (bg < 2 || bg > 3)) return false
        if (securityBgFilter === "low" && bg > 1) return false
      }
      return true
    })
  }, [searchQuery, partyFilter, criminalFilter, lifestyleFilter, securityBgFilter])

  return (
    <>
      {/* Filters */}
      <div className="space-y-3 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="חיפוש לפי שם מנהיג או מפלגה..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 glass-card border-0"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="grid grid-cols-2 gap-2">
          <Select value={partyFilter} onValueChange={setPartyFilter}>
            <SelectTrigger className="glass-card border-0 text-sm">
              <SelectValue placeholder="מפלגה" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל המפלגות</SelectItem>
              {uniqueParties.map((party) => (
                <SelectItem key={party} value={party}>{party}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={securityBgFilter} onValueChange={setSecurityBgFilter}>
            <SelectTrigger className="glass-card border-0 text-sm">
              <SelectValue placeholder="רקע ביטחוני" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל הרמות</SelectItem>
              <SelectItem value="high">גבוה (4-5)</SelectItem>
              <SelectItem value="medium">בינוני (2-3)</SelectItem>
              <SelectItem value="low">נמוך (1)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={criminalFilter} onValueChange={setCriminalFilter}>
            <SelectTrigger className="glass-card border-0 text-sm">
              <SelectValue placeholder="מצב פלילי" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">הכל</SelectItem>
              {uniqueCriminal.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={lifestyleFilter} onValueChange={setLifestyleFilter}>
            <SelectTrigger className="glass-card border-0 text-sm">
              <SelectValue placeholder="סגנון חיים" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">הכל</SelectItem>
              {uniqueLifestyles.map((lifestyle) => (
                <SelectItem key={lifestyle} value={lifestyle}>{lifestyle}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground">
          {filteredLeaders.length} מנהיגים
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredLeaders.map((leader) => (
          <LeaderCard
            key={leader.id}
            leader={leader}
            onClick={() => setSelectedLeader(leader)}
          />
        ))}
      </div>

      {filteredLeaders.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          לא נמצאו מנהיגים התואמים את הסינון
        </div>
      )}

      <LeaderDialog
        leader={selectedLeader}
        open={!!selectedLeader}
        onClose={() => setSelectedLeader(null)}
      />
    </>
  )
}
