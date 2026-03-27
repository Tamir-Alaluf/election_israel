"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type FilterOption = {
  value: string;
  label: string;
};

type FilterConfig = {
  key: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: FilterOption[];
};

export function ComparisonProfileCard({
  image,
  name,
  subtitle,
  onClick,
}: {
  image: string;
  name: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="aspect-square glass-card rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
    >
      <div className="relative w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
        <Image src={image} alt={`${name} icon`} width={56} height={56} className="object-cover" />
      </div>
      <div className="text-center px-3">
        <h3 className="font-semibold text-sm text-foreground">{name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </button>
  );
}

export function ComparisonDialogShell({
  open,
  onClose,
  image,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  image: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md max-h-[85vh] overflow-y-auto glass-card border-0"
        dir="rtl"
      >
        <DialogHeader>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
              <Image src={image} alt={`${title} icon`} width={64} height={64} className="object-cover" />
            </div>
            <div>
              <DialogTitle className="text-lg text-foreground">{title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">{subtitle}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export function ComparisonCollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
        <span className="font-semibold text-sm text-foreground">{title}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">{children}</CollapsibleContent>
    </Collapsible>
  );
}

export function ComparisonFilters({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filters,
  resultsText,
}: {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: FilterConfig[];
  resultsText: string;
}) {
  return (
    <div className="space-y-3 mb-6">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-10 glass-card border-0"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {filters.map((filter) => (
          <Select key={filter.key} value={filter.value} onValueChange={filter.onValueChange}>
            <SelectTrigger className="glass-card border-0 text-sm">
              <SelectValue placeholder={filter.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{resultsText}</p>
    </div>
  );
}

export function ComparisonGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{children}</div>;
}

export function ComparisonEmptyState({ message }: { message: string }) {
  return <div className="text-center py-8 text-muted-foreground">{message}</div>;
}
