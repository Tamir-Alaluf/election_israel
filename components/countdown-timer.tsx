"use client"

import { useEffect, useState } from "react"
import { Calendar } from "lucide-react"

// Election date - set to a future date
const ELECTION_DATE = new Date("2026-09-01T07:00:00")

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const difference = ELECTION_DATE.getTime() - new Date().getTime()
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass rounded-2xl p-4 md:p-6 text-center min-w-[80px] md:min-w-[120px]">
      <div className="text-4xl md:text-6xl font-black text-foreground tabular-nums">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-sm md:text-base text-muted-foreground mt-2">{label}</div>
    </div>
  )
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calculateTimeLeft())
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section id="countdown" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-6">
            <Calendar className="w-4 h-4 text-accent" />
            <span>א׳ בספטמבר 2026</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground hebrew-text">
            ספירה לאחור ליום הבחירות
          </h2>
        </div>

        <div className="flex justify-center items-center gap-3 md:gap-6 flex-wrap">
          <TimeBox value={timeLeft.seconds} label="שניות" />
          <div className="text-4xl md:text-6xl font-bold text-primary">:</div>
          <TimeBox value={timeLeft.minutes} label="דקות" />
          <div className="text-4xl md:text-6xl font-bold text-primary">:</div>
          <TimeBox value={timeLeft.hours} label="שעות" />
          <div className="text-4xl md:text-6xl font-bold text-primary">:</div>
          <TimeBox value={timeLeft.days} label="ימים" />
        </div>

        <p className="text-center text-muted-foreground mt-8 max-w-xl mx-auto">
          הקלפיות יהיו פתוחות מהשעה 07:00 ועד 22:00. 
          אל תשכחו תעודת זהות!
        </p>
      </div>
    </section>
  )
}
