"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

export type PageHeaderAuthControlsProps = {
  variant: "desktop" | "mobile";
  onSignInClick?: () => void;
};

const signInClasses = {
  desktop:
    "hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50",
  mobile:
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50",
} as const;

export function PageHeaderAuthControls({
  variant,
  onSignInClick,
}: PageHeaderAuthControlsProps) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center",
        variant === "mobile" ? "px-4 py-3" : "hidden md:flex",
      )}
    >
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link
          href="/sign-in"
          onClick={onSignInClick}
          className={signInClasses[variant]}
        >
          <LogIn
            className={variant === "mobile" ? "w-5 h-5" : "w-4 h-4"}
          />
          <span>התחברות</span>
        </Link>
      )}
    </div>
  );
}
