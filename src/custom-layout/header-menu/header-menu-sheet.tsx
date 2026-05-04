"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetDismissButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import HeaderMenuNav from "@/custom-layout/header-menu/header-menu-nav";
import { useAuthStore } from "@/stores/auth-store";
import { HeaderMenuSheetProps } from "./types";



function HeaderMenuSheet({ displayName, role }: HeaderMenuSheetProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout();
      setMenuOpen(false);
      router.replace("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetTrigger
        aria-label="Open navigation menu"
        className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
        <SheetHeader>
          <div className="space-y-1">
            <SheetTitle className="text-lg font-semibold">
              {displayName ?? "Loading user"}
            </SheetTitle>
            <SheetDescription className="capitalize">
              {role ?? "Preparing your menu"}
            </SheetDescription>
          </div>
          <SheetDismissButton />
        </SheetHeader>

        <SheetBody>
          <HeaderMenuNav
            pathname={pathname}
            role={role}
            onLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}

export default HeaderMenuSheet;
