"use client"

import { ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Rotating gradient ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-rotate-slow" />
        <div className="absolute inset-8 rounded-full border border-accent/20 animate-rotate-slow [animation-direction:reverse]" />
        <div className="absolute inset-16 rounded-full border border-primary/10 animate-rotate-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-8 animate-float">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>הבחירות לכנסת ה-26</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 hebrew-text leading-tight">
            <span className="text-foreground">הקול שלך</span>
            <br />
            <span className="text-glow bg-gradient-to-l from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              משנה את המדינה
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto hebrew-text">
            כל מה שצריך לדעת על הבחירות הקרובות. 
            מידע אמין, סקרים עדכניים, והדרכה להצבעה.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/80 text-primary-foreground text-lg px-8 py-6 rounded-full group"
            >
              <span>גלה איפה להצביע</span>
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 rounded-full border-border/50 hover:bg-secondary"
            >
              הכר את המפלגות
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="glass rounded-xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-primary">120</div>
              <div className="text-xs md:text-sm text-muted-foreground">חברי כנסת</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-accent">6.8M</div>
              <div className="text-xs md:text-sm text-muted-foreground">בעלי זכות הצבעה</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-primary">3.25%</div>
              <div className="text-xs md:text-sm text-muted-foreground">אחוז חסימה</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
