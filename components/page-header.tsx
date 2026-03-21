"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, UserCircle, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

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
        <Link href="/" className="text-[11px] font-semibold text-foreground">
          בחירות 2026
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
