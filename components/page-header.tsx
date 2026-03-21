"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, UserCircle, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "ראשי", icon: Home },
  { href: "/parties", label: "מפלגות", icon: Users },
  { href: "/leaders", label: "מנהיגים", icon: UserCircle },
  { href: "/advisor", label: "יועץ AI", icon: MessageCircle },
]

export function PageHeader({ title }: { title?: string }) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-3 py-2 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold text-primary">
          בחירות 2026
        </Link>

        <nav className="flex items-center gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium transition-colors",
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

      {title && (
        <div className="max-w-4xl mx-auto px-3 pb-3">
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
      )}
    </header>
  )
}
