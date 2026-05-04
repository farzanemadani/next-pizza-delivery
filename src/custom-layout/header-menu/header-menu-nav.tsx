"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { MENU_ITEMS_BY_ROLE, isMenuItemActive } from "@/constants/menu-items";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeaderMenuNavProps } from "./types";

function HeaderMenuNav({
  pathname,
  role,
  onLogout,
  isLoggingOut,
}: HeaderMenuNavProps) {
  const menuItems = role ? MENU_ITEMS_BY_ROLE[role as keyof typeof MENU_ITEMS_BY_ROLE] : [];

  return (
    <div className="flex h-full flex-col gap-4">
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = isMenuItemActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}

        {!menuItems.length ? (
          <div className="rounded-xl border border-dashed border-sidebar-border px-4 py-5 text-sm text-sidebar-foreground/70">
            Loading your menu...
          </div>
        ) : null}
      </nav>

      {role ? (
        <Button
          type="button"
          variant="outline"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="mt-auto h-11 justify-start gap-3 rounded-xl border-sidebar-border bg-transparent px-4 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="size-4" />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </Button>
      ) : null}
    </div>
  );
}

export default HeaderMenuNav;
