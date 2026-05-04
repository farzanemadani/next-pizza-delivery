"use server";

import type { IVariant } from "@/interfaces";
import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

type UpdateVariantInput = Partial<Pick<IVariant, "type" | "price" | "pizza_id">>;

export const updateVariant = async (
  id: number,
  payload: UpdateVariantInput,
): Promise<ApiResponse<IVariant>> => {
  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const { data, error: updateVariantError } = await client
    .from("variants")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single<IVariant>();

  if (updateVariantError) {
    return {
      success: false,
      message: updateVariantError.message,
    };
  }

  return {
    success: true,
    data,
  };
};
