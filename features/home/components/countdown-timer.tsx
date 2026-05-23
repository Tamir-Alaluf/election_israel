"use client";

import { useState, useEffect } from "react";

// Election date - September 1, 2026
const ELECTION_DATE = new Date("2026-09-01T07:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeUnit {
  value: number;
  label: string;
  pad: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const difference = ELECTION_DATE.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function formatValue(value: number, pad: boolean, placeholder: boolean): string {
  if (placeholder) return "--";
  if (pad) return String(value).padStart(2, "0");
  return String(value);
}

function CountdownGrid({
  units,
  placeholder,
}: {
  units: TimeUnit[];
  placeholder: boolean;
}) {
  return (
    <div className="mx-auto grid max-w-48 grid-cols-4 gap-2">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-primary/10">
            <span className="text-base font-bold tabular-nums text-primary">
              {formatValue(unit.value, unit.pad, placeholder)}
            </span>
          </div>
          <span className="mt-1 text-xs text-muted-foreground">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits: TimeUnit[] = [
    { value: timeLeft.seconds, label: "שניות", pad: true },
    { value: timeLeft.minutes, label: "דקות", pad: true },
    { value: timeLeft.hours, label: "שעות", pad: true },
    { value: timeLeft.days, label: "ימים", pad: false },
  ];

  return (
    <div className="mb-10 text-center">
      <p className="mb-2 text-xs text-muted-foreground">זמן עד הבחירות</p>
      <CountdownGrid units={timeUnits} placeholder={!mounted} />
      <p className="mt-2 text-[10px] text-muted-foreground">1 בספטמבר 2026</p>
    </div>
  );
}
