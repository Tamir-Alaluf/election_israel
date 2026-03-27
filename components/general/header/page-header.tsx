import Link from "next/link";
import { PageHeaderDesktopNav } from "./page-header-desktop-nav";
import { PageHeaderMobileNav } from "./page-header-mobile-nav";

export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 glass-card border-b-0">
      <div className="max-w-md mx-auto px-4 py-2 flex flex-row-reverse md:flex-row items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-foreground">
          בחירות 2026
        </Link>

        <PageHeaderDesktopNav />
        <PageHeaderMobileNav />
      </div>
    </header>
  );
}
