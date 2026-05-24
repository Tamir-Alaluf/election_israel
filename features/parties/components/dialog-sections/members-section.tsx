"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";
import type { PartyMemberItem } from "@/lib/types/shared";

const NO_DESCRIPTION_FALLBACK = "אין מידע נוסף";

function PartyMemberDescriptionDialog({ member }: { member: PartyMemberItem }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-14 w-14 rounded-full border border-border/40 bg-muted hover:bg-muted/80"
          aria-label={`פרטים על ${member.name}`}
        >
          <User className="h-7 w-7 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm" dir="rtl">
        <DialogHeader>
          <DialogTitle>{member.name}</DialogTitle>
          <DialogDescription className="text-start text-sm leading-relaxed text-foreground">
            {member.description ?? NO_DESCRIPTION_FALLBACK}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function MembersContent({ members }: { members: PartyMemberItem[] }) {
  const displayedMembers = members.slice(0, 10);

  return (
    <div className="grid grid-cols-4 gap-3">
      {displayedMembers.map((member, index) => (
        <div
          key={`${member.name}-${index}`}
          className="flex flex-col items-center text-center"
        >
          <PartyMemberDescriptionDialog member={member} />
          <span className="mt-1 line-clamp-2 text-sm font-medium leading-tight text-foreground">
            {member.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export function MembersSection({ members }: { members: PartyMemberItem[] }) {
  return (
    <SectionShell title="חברי מפלגה">
      <MembersContent members={members} />
    </SectionShell>
  );
}
