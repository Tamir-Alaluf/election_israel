import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { heIL } from "@clerk/localizations";
import { Heebo } from "next/font/google";
import { BubbleBackground } from "@/components/shared/layout/bubble-background";
import { PageHeader } from "@/components/shared/navigation/page-header";
import "./globals.css";

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "בחירות ישראל 2026 | הקול שלך משנה",
  description:
    "כל המידע על הבחירות לכנסת ה-26 - תאריכים, מפלגות, סקרים ואיך להצביע",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={heIL}>
      <html lang="he" dir="rtl">
        <body className={`${heebo.variable} font-sans antialiased`}>
          {/* <BubbleBackground interactive /> */}
          <PageHeader />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
