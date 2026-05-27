import Link from "next/link";
import { PageHeaderAuthControls } from "./page-header-auth-controls";
import { PageHeaderDesktopNav } from "./page-header-desktop-nav";
import { PageHeaderMobileNav } from "./page-header-mobile-nav";

export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 glass-card border-b-0">
      <div className="mx-auto flex w-full max-w-md flex-row-reverse items-center justify-between gap-2 px-4 py-2 md:grid md:max-w-6xl md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-4 md:px-6 md:py-2.5">
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold text-foreground md:justify-self-start md:text-base"
        >
          בחירות 2026
        </Link>

        <PageHeaderDesktopNav />
        <PageHeaderAuthControls variant="desktop" />
        <PageHeaderMobileNav />
      </div>
    </header>
  );
}
