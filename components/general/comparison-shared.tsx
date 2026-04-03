"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterOption = {
  value: string;
  label: string;
};

type SingleFilterConfig = {
  key: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: FilterOption[];
  multiSelect?: false;
};

type MultiSelectFilterConfig = {
  key: string;
  values: string[];
  onValuesChange: (values: string[]) => void;
  placeholder: string;
  options: FilterOption[];
  multiSelect: true;
  allLabel?: string;
};

type LawStanceFilterConfig = {
  key: string;
  placeholder: string;
  lawStances: Record<string, string>;
  lawOptions: Array<{ id: string; label: string }>;
  onLawStanceChange: (lawId: string, stance: string) => void;
  onClearAll: () => void;
  lawFilter: true;
};

type FilterConfig =
  | SingleFilterConfig
  | MultiSelectFilterConfig
  | LawStanceFilterConfig;

function ComparisonImage({
  src,
  alt,
  sizeClassName,
}: {
  src: string;
  alt: string;
  sizeClassName: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden flex items-center justify-center",
        sizeClassName,
      )}
    >
      {isLoading && <Skeleton className="absolute inset-0 rounded-full" />}
      <Image
        src={src}
        alt={alt}
        width={2048}
        height={2048}
        sizes="128px"
        className={cn(
          "object-cover transition-opacity duration-200",
          isLoading && "opacity-0",
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

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
      <ComparisonImage
        src={image}
        alt={`${name} icon`}
        sizeClassName="w-14 h-14"
      />
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
            <ComparisonImage
              src={image}
              alt={`${title} icon`}
              sizeClassName="w-16 h-16"
            />
            <div>
              <DialogTitle className="text-lg text-foreground">
                {title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {subtitle}
              </DialogDescription>
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
        {filters.map((filter) => {
          if ("lawFilter" in filter && filter.lawFilter) {
            const selectedCount = Object.values(filter.lawStances).filter(
              (value) => value === "בעד" || value === "נגד",
            ).length;

            return (
              <DropdownMenu key={filter.key}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="glass-card border-0 text-sm justify-between w-full text-foreground hover:text-foreground"
                  >
                    <span>
                      {filter.placeholder}
                      {selectedCount > 0 ? ` (${selectedCount})` : ""}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-96 overflow-y-auto"
                  align="start"
                >
                  <div dir="rtl">
                    <DropdownMenuItem onClick={filter.onClearAll}>
                      נקה חוקים
                    </DropdownMenuItem>
                    {filter.lawOptions.map((law) => {
                      const selectedStance = filter.lawStances[law.id] ?? "";

                      return (
                        <div
                          key={law.id}
                          className="px-2 py-2 border-t border-border/30 first:border-t-0 text-right"
                        >
                          <p className="text-xs text-foreground mb-2 leading-relaxed">
                            {law.label}
                          </p>
                          <div className="flex flex-row-reverse justify-end gap-2">
                            <Button
                              type="button"
                              variant={
                                selectedStance === "בעד" ? "default" : "outline"
                              }
                              size="sm"
                              className="h-8"
                              onClick={() => filter.onLawStanceChange(law.id, "בעד")}
                            >
                              בעד
                            </Button>
                            <Button
                              type="button"
                              variant={
                                selectedStance === "נגד" ? "default" : "outline"
                              }
                              size="sm"
                              className="h-8"
                              onClick={() => filter.onLawStanceChange(law.id, "נגד")}
                            >
                              נגד
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          if ("multiSelect" in filter && filter.multiSelect) {
            return (
            <DropdownMenu key={filter.key}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="glass-card border-0 text-sm justify-between w-full text-foreground hover:text-foreground"
                >
                  <span>
                    {filter.placeholder}
                    {filter.values.length > 0 ? ` (${filter.values.length})` : ""}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[var(--radix-dropdown-menu-trigger-width)]"
              >
                <div dir="rtl">
                  {filter.allLabel ? (
                    <DropdownMenuItem onClick={() => filter.onValuesChange([])}>
                      {filter.allLabel}
                    </DropdownMenuItem>
                  ) : null}
                  {filter.options.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={filter.values.includes(option.value)}
                      onSelect={(event) => event.preventDefault()}
                      onCheckedChange={(checked) => {
                        const isChecked = checked === true;
                        if (isChecked) {
                          filter.onValuesChange([...filter.values, option.value]);
                          return;
                        }
                        filter.onValuesChange(
                          filter.values.filter((value) => value !== option.value),
                        );
                      }}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            );
          }

          if ("value" in filter && "onValueChange" in filter) {
            return (
              <Select
                key={filter.key}
                value={filter.value}
                onValueChange={filter.onValueChange}
              >
                <SelectTrigger className="glass-card border-0 text-sm">
                  <SelectValue placeholder={filter.placeholder} />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }

          return null;
        })}
      </div>

      <p className="text-xs text-muted-foreground">{resultsText}</p>
    </div>
  );
}

export function ComparisonGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{children}</div>
  );
}

export function ComparisonEmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-8 text-muted-foreground">{message}</div>
  );
}
