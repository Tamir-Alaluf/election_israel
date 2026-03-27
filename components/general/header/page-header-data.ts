import {
  BookOpen,
  Home,
  MessageCircle,
  UserCircle,
  Users,
  type LucideIcon,
} from "lucide-react";

export type PageHeaderNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const pageHeaderNavItems: PageHeaderNavItem[] = [
  { href: "/", label: "ראשי", icon: Home },
  { href: "/parties", label: "מפלגות", icon: Users },
  { href: "/leaders", label: "מנהיגים", icon: UserCircle },
  { href: "/glossary", label: "מילון בחירות", icon: BookOpen },
  { href: "/advisor", label: "יועץ", icon: MessageCircle },
];
