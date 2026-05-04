"use client";

import { useEffect, useState } from "react";
import HeaderMenuSheet from "@/custom-layout/header-menu/header-menu-sheet";
import { useAuthStore } from "@/stores/auth-store";

function Header() {
  const user = useAuthStore((state) => {
    return state.user;
  });
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.name) {
      setDisplayName(null);
      return;
    }
    setDisplayName(null);
    const timeout = window.setTimeout(() => {
      setDisplayName(user.name);
    }, 2000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [user?.name]);

  return (
    <div className="px-10 py-6 bg-primary flex justify-between">
      <h1 className="text-xl font-bold text-white">Pizza Pro</h1>

      <div className="flex justify-between items-center gap-5">
        {displayName ? (
          <h1 className="text-white">{displayName}</h1>
        ) : (
          <span
            aria-label="Loading user"
            className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
          />
        )}
        <HeaderMenuSheet displayName={displayName} role={user?.role} />
      </div>
    </div>
  );
}

export default Header;
