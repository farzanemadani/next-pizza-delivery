"use server";

import type { IPizza } from "@/interfaces";
import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

type CreatePizzaInput = Pick<
  IPizza,
  "category" | "name" | "description" | "image" | "status"
>;

export const createPizza = async (
  payload: CreatePizzaInput,
): Promise<ApiResponse<IPizza>> => {
  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const { data, error: createPizzaError } = await client
    .from("pizzas")
    .insert(payload)
    .select("*")
    .single<IPizza>();

  if (createPizzaError) {
    return {
      success: false,
      message: createPizzaError.message,
    };
  }

  return {
    success: true,
    data,
  };
};
