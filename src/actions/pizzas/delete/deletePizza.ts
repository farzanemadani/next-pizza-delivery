"use server";

import type { IPizza } from "@/interfaces";
import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

export const deletePizza = async (id: number): Promise<ApiResponse<IPizza>> => {
  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const { data, error: deletePizzaError } = await client
    .from("pizzas")
    .delete()
    .eq("id", id)
    .select("*")
    .single<IPizza>();

  if (deletePizzaError) {
    return {
      success: false,
      message: deletePizzaError.message,
    };
  }

  return {
    success: true,
    data,
  };
};
