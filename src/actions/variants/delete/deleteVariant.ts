"use server";

import type { IVariant } from "@/interfaces";
import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

export const deleteVariant = async (
  id: number,
): Promise<ApiResponse<IVariant>> => {
  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const { data, error: deleteVariantError } = await client
    .from("variants")
    .delete()
    .eq("id", id)
    .select("*")
    .single<IVariant>();

  if (deleteVariantError) {
    return {
      success: false,
      message: deleteVariantError.message,
    };
  }

  return {
    success: true,
    data,
  };
};
