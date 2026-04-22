"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ComparisonImage } from "@/components/shared/data-display/comparison-image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ComparisonDialogShell({
  open,
  onClose,
  image,
  title,
  subtitle,
  children,
  contentClassName,
}: {
  open: boolean;
  onClose: () => void;
  image: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "max-w-md max-h-[85vh] overflow-y-auto glass-card border-0",
          contentClassName,
        )}
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
              <DialogTitle className="text-lg text-foreground">{title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 min-w-0 space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
