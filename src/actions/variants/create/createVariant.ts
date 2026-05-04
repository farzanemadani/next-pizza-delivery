"use server";

import type { IVariant } from "@/interfaces";
import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

type CreateVariantInput = Pick<IVariant, "type" | "price" | "pizza_id">;

export const createVariant = async (
  payload: CreateVariantInput,
): Promise<ApiResponse<IVariant>> => {
  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const { data, error: createVariantError } = await client
    .from("variants")
    .insert(payload)
    .select("*")
    .single<IVariant>();

  if (createVariantError) {
    return {
      success: false,
      message: createVariantError.message,
    };
  }

  return {
    success: true,
    data,
  };
};
