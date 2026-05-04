"use client";

import { useEffect } from "react";
import Header from "./header";
import { useAuthStore } from "@/stores/auth-store";

function PrivateLayout({children}:{children:React.ReactNode}) {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  return (
    <div className='flex flex-col'>
        <Header />
        <main className='p-5'>{children}</main>

    </div>
  )
}

export default PrivateLayout
