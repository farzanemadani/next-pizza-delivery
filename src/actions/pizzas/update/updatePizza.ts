"use server";

import type { IPizza } from "@/interfaces";
import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

type UpdatePizzaInput = Partial<
  Pick<IPizza, "name" | "description" | "image" | "status">
>;

export const updatePizza = async (
  id: number,
  payload: UpdatePizzaInput,
): Promise<ApiResponse<IPizza>> => {
  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const { data, error: updatePizzaError } = await client
    .from("pizzas")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single<IPizza>();

  if (updatePizzaError) {
    return {
      success: false,
      message: updatePizzaError.message,
    };
  }

  return {
    success: true,
    data,
  };
};
