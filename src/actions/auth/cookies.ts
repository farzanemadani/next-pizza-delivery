"use server";

import { cookies } from "next/headers";

export const setAuthCookies = async (token: string, role: string) => {
  const cookieStore = await cookies();
  
  cookieStore.set("token", token, {
    httpOnly: true,        
    secure: process.env.NODE_ENV === "production",           
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, 
  });

  cookieStore.set("role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
};
