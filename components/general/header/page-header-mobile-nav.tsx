"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { pageHeaderNavItems } from "./page-header-data";
import { PageHeaderNavLink } from "./page-header-nav-link";

export function PageHeaderMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="פתח תפריט"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[280px] bg-background/95 backdrop-blur-xl"
      >
        <SheetHeader className="text-right">
          <SheetTitle className="text-lg">בחירות 2026</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-6">
          {pageHeaderNavItems.map((item) => (
            <PageHeaderNavLink
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              variant="mobile"
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
