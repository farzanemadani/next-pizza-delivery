"use server";

import type { IPizza } from "@/interfaces";
import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

export const readPizzaById = async (
  id: number,
): Promise<ApiResponse<IPizza | null>> => {
  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const { data, error: readPizzaError } = await client
    .from("pizzas")
    .select("*")
    .eq("id", id)
    .maybeSingle<IPizza>();

  if (readPizzaError) {
    return {
      success: false,
      message: readPizzaError.message,
    };
  }

  return {
    success: true,
    data,
  };
};
