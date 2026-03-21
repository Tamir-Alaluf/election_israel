"use client"

import { TrendingUp, Users, MapPin, CheckCircle } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "6,800,000",
    label: "בעלי זכות הצבעה",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MapPin,
    value: "12,000+",
    label: "קלפיות ברחבי הארץ",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: TrendingUp,
    value: "71.5%",
    label: "אחוז הצבעה בבחירות האחרונות",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: CheckCircle,
    value: "35+",
    label: "מפלגות מתמודדות",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function StatsSection() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground hebrew-text mb-4">
            מספרים שחשוב לדעת
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            נתונים מרכזיים על מערכת הבחירות בישראל
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
