import type { LucideIcon } from "lucide-react";
import {
  CircleHelp,
  LayoutDashboard,
  MapPinned,
  Pizza,
  ShoppingBag,
  User,
  Users,
} from "lucide-react";
import type { UserRole } from "@/types";

export interface AppMenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const MENU_ITEMS_BY_ROLE: Record<UserRole, AppMenuItem[]> = {
  admin: [
    { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Pizzas", href: "/admin/pizzas", icon: Pizza },
    { title: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { title: "Customers", href: "/admin/customers", icon: Users },
    { title: "Users", href: "/admin/users", icon: Users },
    { title: "Profile", href: "/admin/profile", icon: User },
  ],
  customer: [
    { title: "Pizzas", href: "/customer/pizzas", icon: Pizza },
    { title: "Orders", href: "/customer/orders", icon: ShoppingBag },
    { title: "Addresses", href: "/customer/addresses", icon: MapPinned },
    { title: "Help", href: "/customer/help", icon: CircleHelp },
    { title: "Profile", href: "/customer/profile", icon: User },
  ],
};

export function isMenuItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
