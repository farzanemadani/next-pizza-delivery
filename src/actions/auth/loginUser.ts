"use server";

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/env";
import type { IUser } from "@/interfaces";
import type { LoginUserResult } from "@/types";
import bcrypt from "bcrypt";
import { createJwt } from "./createJwt";

export const loginUser = async (
  payload: Pick<IUser, "email" | "password" | "role">,
): Promise<LoginUserResult> => {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return {
      success: false,
      message: "Supabase environment variables are missing.",
    };
  }

  const email = payload.email?.trim().toLowerCase();
  const password = payload.password;
  const role = payload.role;

  if (!email || !password || !role) {
    return {
      success: false,
      message: "Email, password, and role are required.",
    };
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

  const { data: user, error: findUserError } = await supabase
    .from("user_profiles")
    .select("id, email, password, role")
    .eq("email", email)
    .maybeSingle<Pick<IUser, "id" | "email" | "password" | "role">>();

  if (findUserError) {
    return {
      success: false,
      message: findUserError.message,
    };
  }

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  if (user.role !== role) {
    return {
      success: false,
      message: `This account is not registered as ${role}.`,
    };
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  try {
    const token = await createJwt({
      id: user.id,
      email: user.email,
    });

    return {
      success: true,
      message: "Login successful.",
      token,
      role: user.role,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to create authorization token.",
    };
  }
};
