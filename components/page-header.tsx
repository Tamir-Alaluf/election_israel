"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, UserCircle, MessageCircle, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "ראשי", icon: Home },
  { href: "/parties", label: "מפלגות", icon: Users },
  { href: "/leaders", label: "מנהיגים", icon: UserCircle },
  { href: "/advisor", label: "יועץ", icon: MessageCircle },
]

export function PageHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 glass-card border-b-0">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-foreground">
          בחירות 2026
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger with Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="פתח תפריט"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background/95 backdrop-blur-xl">
            <SheetHeader className="text-right">
              <SheetTitle className="text-lg">בחירות 2026</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 mt-6">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SheetClose>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
