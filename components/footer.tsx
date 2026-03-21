"use client"

import { Vote, ExternalLink } from "lucide-react"

const links = [
  { label: "ראשי", href: "#home" },
  { label: "מפלגות", href: "#parties" },
  { label: "איך להצביע", href: "#guide" },
  { label: "ספירה לאחור", href: "#countdown" },
]

const resources = [
  { label: "ועדת הבחירות המרכזית", href: "#" },
  { label: "בדיקת מיקום קלפי", href: "#" },
  { label: "תוצאות בחירות קודמות", href: "#" },
  { label: "חוק הבחירות", href: "#" },
]

export function Footer() {
  return (
    <footer className="relative pt-24 pb-8 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Vote className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">
                בחירות
                <span className="text-primary"> 2026</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              אתר מידע לא רשמי על הבחירות לכנסת ה-26.
              המידע נאסף ממקורות ציבוריים ומוצג למטרות מידע בלבד.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-foreground mb-4">ניווט מהיר</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-foreground mb-4">משאבים</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} בחירות 2026. 
            אתר מידע לא רשמי. כל הזכויות שמורות.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            אין לראות באתר זה כמקור רשמי. 
            למידע רשמי פנו לוועדת הבחירות המרכזית.
          </p>
        </div>
      </div>
    </footer>
  )
}
