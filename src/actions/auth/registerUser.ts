"use server";

import bcrypt from "bcrypt";
import type { IUser } from "@/interfaces";
import type { RegisterUserResult } from "@/types";
import { createClient } from "@/utils/supabase/client";

export const registerUser = async (
  payload: Partial<IUser>,
): Promise<RegisterUserResult> => {
  const { client: supabase, error } = createClient();

  if (!supabase) {
    return {
      success: false,
      message: error,
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
