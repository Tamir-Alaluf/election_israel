"use client";

import { usePathname } from "next/navigation";
import { pageHeaderNavItems } from "./page-header-data";
import { PageHeaderNavLink } from "./page-header-nav-link";

export function PageHeaderDesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center justify-center gap-1.5 md:flex md:justify-self-center lg:gap-2">
      {pageHeaderNavItems.map((item) => (
        <PageHeaderNavLink
          key={item.href}
          item={item}
          isActive={pathname === item.href}
          variant="desktop"
        />
      ))}
    </nav>
  );
}
