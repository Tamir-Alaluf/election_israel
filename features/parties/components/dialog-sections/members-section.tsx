import { User } from "lucide-react";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";

export function MembersSection({ members }: { members: string[] }) {
  const displayedMembers = members.slice(0, 10);

  return (
    <SectionShell title="חברי מפלגה">
      <div className="grid grid-cols-5 gap-3 pt-2">
        {displayedMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border/40 bg-muted">
                <User className="h-7 w-7 text-muted-foreground" />
              </div>
              <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground shadow-sm">
                #{index + 1}
              </span>
            </div>
            <span className="mt-1 line-clamp-2 text-sm font-medium leading-tight text-foreground">
              {member}
            </span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
