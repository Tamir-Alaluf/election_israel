"use client"

import { IdCard, MapPin, Clock, CheckSquare, AlertCircle } from "lucide-react"

const steps = [
  {
    icon: IdCard,
    title: "הביאו תעודת זהות",
    description: "חובה להציג תעודת זהות תקפה (גם פג תוקף מתאים) או דרכון ישראלי בתוקף",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MapPin,
    title: "מצאו את הקלפי שלכם",
    description: "בדקו באתר ועדת הבחירות המרכזית או בהודעה שקיבלתם בדואר את מיקום הקלפי",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Clock,
    title: "הגיעו בזמן",
    description: "הקלפיות פתוחות מ-07:00 עד 22:00. מומלץ להימנע משעות העומס",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: CheckSquare,
    title: "הצביעו",
    description: "היכנסו לפרגוד, בחרו פתק עם אות המפלגה שלכם, הכניסו למעטפה והפילו לקלפי",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

const tips = [
  "אפשר להצביע גם עם תעודת זהות שפג תוקפה",
  "אין צורך בהודעה על מיקום הקלפי - אפשר לבדוק באתר",
  "מותר לקחת יום חופש מהעבודה ביום הבחירות",
  "אסור לצלם את הפתק או את הפעולה בתא",
]

export function VoteGuide() {
  return (
    <section id="guide" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground hebrew-text mb-4">
            איך להצביע?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            מדריך פשוט בארבעה צעדים
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 relative group hover:scale-105 transition-transform duration-300"
            >
              {/* Step Number */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>

              <div className={`w-14 h-14 rounded-xl ${step.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <step.icon className={`w-7 h-7 ${step.color}`} />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground">טיפים חשובים</h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
