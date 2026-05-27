import { forwardRef } from "react";
import type { MouseEventHandler } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import type { PageHeaderNavItem } from "./page-header-data";

export type PageHeaderNavLinkProps = {
  item: PageHeaderNavItem;
  isActive: boolean;
  variant: "desktop" | "mobile";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const variantClasses = {
  desktop:
    "flex items-center gap-2 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors lg:px-3",
  mobile:
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
} as const;

const iconSizes = {
  desktop: "w-4 h-4",
  mobile: "w-5 h-5",
} as const;

export const PageHeaderNavLink = forwardRef<
  HTMLAnchorElement,
  PageHeaderNavLinkProps
>(function PageHeaderNavLink({ item, isActive, variant, onClick }, ref) {
  const Icon = item.icon;
  return (
    <Link
      ref={ref}
      href={item.href}
      onClick={onClick}
      className={cn(
        variantClasses[variant],
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
    >
      <Icon className={iconSizes[variant]} />
      <span>{item.label}</span>
    </Link>
  );
});
