"use server";

import type { IPizza } from "@/interfaces";
import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

export const readPizzas = async (): Promise<ApiResponse<IPizza[]>> => {
  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const { data, error: readPizzasError } = await client
    .from("pizzas")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<IPizza[]>();

  if (readPizzasError) {
    return {
      success: false,
      message: readPizzasError.message,
    };
  }

  return {
    success: true,
    data: data ?? [],
  };
};
