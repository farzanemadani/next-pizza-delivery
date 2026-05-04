"use server";

import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/env";
import type { IUser } from "@/interfaces";
import type { RegisterUserResult } from "@/types";

export const registerUser = async (
  payload: Partial<IUser>,
): Promise<RegisterUserResult> => {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return {
      success: false,
      message: "Supabase environment variables are missing.",
    };
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim().toLowerCase();
  const password = payload.password;

  if (!name || !email || !password) {
    return {
      success: false,
      message: "Name, email, and password are required.",
    };
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

  const { data: existingUser, error: findUserError } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (findUserError) {
    return {
      success: false,
      message: findUserError.message,
    };
  }

  if (existingUser) {
    return {
      success: false,
      message: "Email already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error: createUserError } = await supabase
    .from("user_profiles")
    .insert({
      name,
      email,
      password: hashedPassword,
      role: payload.role ?? "customer",
    });

  if (createUserError) {
    return {
      success: false,
      message:
        createUserError.code === "23505"
          ? "Email already exists."
          : createUserError.message,
    };
  }

  return {
    success: true,
    message: "User registered successfully.",
  };
};
