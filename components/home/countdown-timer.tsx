"use client"

import { useState, useEffect } from "react"

// Election date - September 1, 2026
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
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">זמן עד הבחירות</p>
          <div className="grid grid-cols-4 gap-3">
            {[0, 0, 0, 0].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-full aspect-square bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">--</span>
                </div>
                <span className="text-xs text-muted-foreground mt-2">---</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const timeUnits = [
    { value: timeLeft.seconds, label: "שניות" },
    { value: timeLeft.minutes, label: "דקות" },
    { value: timeLeft.hours, label: "שעות" },
    { value: timeLeft.days, label: "ימים" },
  ]

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">זמן עד הבחירות</p>
        <div className="grid grid-cols-4 gap-3">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full aspect-square bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-xs text-muted-foreground mt-2">{unit.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">1 בספטמבר 2026</p>
      </div>
    </div>
  )
}
