import {
  BookOpen,
  CircleUser,
  GitCompare,
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
  // { href: "/parties", label: "מפלגות", icon: Users },
  {
    href: "/political-card",
    label: "הכרטיס הפוליטי שלי",
    icon: CircleUser,
  },
  { href: "/advisor", label: "יועץ AI", icon: MessageCircle },

  { href: "/candidates", label: "מועמדים", icon: UserCircle },
  { href: "/compare", label: "השוואה", icon: GitCompare },
  { href: "/glossary", label: "מילון בחירות", icon: BookOpen },
];
