import { Home, Users, UserCircle, MessageCircle, type LucideIcon } from "lucide-react";

export type PageHeaderNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const pageHeaderNavItems: PageHeaderNavItem[] = [
  { href: "/", label: "ראשי", icon: Home },
  { href: "/parties", label: "מפלגות", icon: Users },
  { href: "/leaders", label: "מנהיגים", icon: UserCircle },
  { href: "/advisor", label: "יועץ", icon: MessageCircle },
];
