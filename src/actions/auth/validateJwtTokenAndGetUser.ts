"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/env";
import type { ApiResponse } from "@/types";
import type { UserPublic } from "@/types";
import type { TokenPayload } from "@/types";
import { createClient } from "@/utils/supabase/client";

export const validateJwtTokenAndGetUser = async (): Promise<ApiResponse<UserPublic>> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "No token provided" };
    }

    if (!JWT_SECRET) {
      return { success: false, message: "Missing JWT secret." };
    }

    const { client: supabase, error: clientError } = createClient();

    if (!supabase) {
      return { success: false, message: "Supabase environment variables are missing." };
    }

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    if (!decoded.userID) {
      return { success: false, message: "Invalid token payload" };
    }

    const { data: user, error } = await supabase
      .from("user_profiles")
      .select("id, email, name, role")
      .eq("id", decoded.userID)
      .single<UserPublic>();

    if (error || !user) {
      return { success: false, message: "User not found" };
    }

    return {
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as "customer" | "admin",
      },
    };
  } catch (err: any) {
    if (err?.name === "TokenExpiredError") {
      return { success: false, message: "Token expired" };
    }

    return { success: false, message: "Invalid token" };
  }
};
