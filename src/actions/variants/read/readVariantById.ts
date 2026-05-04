"use server";

import type { IVariant } from "@/interfaces";
import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

export const readVariantById = async (
  id: number,
): Promise<ApiResponse<IVariant | null>> => {
  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const { data, error: readVariantError } = await client
    .from("variants")
    .select("*")
    .eq("id", id)
    .maybeSingle<IVariant>();

  if (readVariantError) {
    return {
      success: false,
      message: readVariantError.message,
    };
  }

  return {
    success: true,
    data,
  };
};
