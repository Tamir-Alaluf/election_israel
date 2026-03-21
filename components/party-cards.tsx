"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample parties data (fictional for demonstration)
const parties = [
  {
    letter: "א",
    name: "מפלגת העתיד",
    leader: "ראש המפלגה",
    seats: "25-28",
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500/30",
  },
  {
    letter: "ב",
    name: "התקווה החדשה",
    leader: "ראש המפלגה",
    seats: "22-25",
    color: "from-orange-500 to-red-500",
    borderColor: "border-orange-500/30",
  },
  {
    letter: "ג",
    name: "האיחוד הדמוקרטי",
    leader: "ראש המפלגה",
    seats: "18-21",
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/30",
  },
  {
    letter: "ד",
    name: "קואליציה לשינוי",
    leader: "ראש המפלגה",
    seats: "15-18",
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/30",
  },
  {
    letter: "ה",
    name: "מפלגת האזרחים",
    leader: "ראש המפלגה",
    seats: "12-15",
    color: "from-amber-500 to-yellow-500",
    borderColor: "border-amber-500/30",
  },
  {
    letter: "ו",
    name: "הבית הירוק",
    leader: "ראש המפלגה",
    seats: "8-11",
    color: "from-green-500 to-lime-500",
    borderColor: "border-green-500/30",
  },
]

export function PartyCards() {
  return (
    <section id="parties" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground hebrew-text mb-4">
            הכר את המפלגות
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            המפלגות המובילות בסקרים האחרונים
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parties.map((party, index) => (
            <div
              key={index}
              className={`glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 border ${party.borderColor} group cursor-pointer`}
            >
              {/* Party Letter Badge */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${party.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-3xl font-black text-white">{party.letter}</span>
              </div>

              {/* Party Info */}
              <h3 className="text-xl font-bold text-foreground mb-2">{party.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{party.leader}</p>

              {/* Predicted Seats */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">מנדטים צפויים</div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${party.color} bg-clip-text text-transparent`}>
                    {party.seats}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-full">
            הצג את כל המפלגות
          </Button>
        </div>
      </div>
    </section>
  )
}
