import type { Metadata } from 'next'
import { Heebo, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const heebo = Heebo({ 
  subsets: ["latin", "hebrew"],
  variable: '--font-heebo',
})

const _geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'בחירות ישראל 2026 | הקול שלך משנה',
  description: 'כל המידע על הבחירות לכנסת ה-26 - תאריכים, מפלגות, סקרים ואיך להצביע',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
