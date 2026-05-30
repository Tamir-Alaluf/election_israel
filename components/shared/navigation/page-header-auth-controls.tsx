"use client";

import Link from "next/link";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export type PageHeaderAuthControlsProps = {
  variant: "desktop" | "mobile-bar";
};

const signInClasses = {
  desktop:
    "flex items-center gap-2 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground lg:px-3",
  "mobile-bar":
    "px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50",
} as const;

const signOutClasses =
  "px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50";

export function PageHeaderAuthControls({
  variant,
}: PageHeaderAuthControlsProps) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center",
        variant === "mobile-bar"
          ? ""
          : "hidden shrink-0 md:flex md:justify-self-end",
      )}
    >
      {isSignedIn ? (
        variant === "mobile-bar" ? (
          <SignOutButton>
            <button type="button" className={signOutClasses}>
              התנתקות
            </button>
          </SignOutButton>
        ) : (
          <UserButton />
        )
      ) : (
        <Link href="/sign-in" className={signInClasses[variant]}>
          {variant === "desktop" && <LogIn className="w-4 h-4" />}
          <span>התחברות</span>
        </Link>
      )}
    </div>
  );
}
