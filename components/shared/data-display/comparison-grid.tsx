import type { ReactNode } from "react";

export function ComparisonGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{children}</div>;
}
