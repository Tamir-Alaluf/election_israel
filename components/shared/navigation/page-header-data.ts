import {
  BookOpen,
  CircleUser,
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
  { href: "/candidates", label: "מועמדים", icon: UserCircle },
  { href: "/glossary", label: "מילון בחירות", icon: BookOpen },
  {
    href: "/political-card",
    label: "הכרטיס הפוליטי שלי",
    icon: CircleUser,
  },
  { href: "/advisor", label: "יועץ", icon: MessageCircle },
];
