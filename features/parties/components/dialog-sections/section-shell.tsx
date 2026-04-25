import type { ReactNode } from "react";
import { ComparisonCollapsibleSection } from "@/components/shared/data-display";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  withSurface?: boolean;
  contentClassName?: string;
};

export function SectionShell({
  title,
  children,
  defaultOpen = false,
  withSurface = true,
  contentClassName,
}: SectionShellProps) {
  return (
    <ComparisonCollapsibleSection title={title} defaultOpen={defaultOpen}>
      {withSurface ? (
        <div className={cn("rounded-lg bg-muted/30 p-3", contentClassName)}>{children}</div>
      ) : (
        <div className={contentClassName}>{children}</div>
      )}
    </ComparisonCollapsibleSection>
  );
}
