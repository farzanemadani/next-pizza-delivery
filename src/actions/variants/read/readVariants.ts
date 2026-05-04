"use server";

import type { IVariant } from "@/interfaces";
import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

export const readVariants = async (): Promise<ApiResponse<IVariant[]>> => {
  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const { data, error: readVariantsError } = await client
    .from("variants")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<IVariant[]>();

  if (readVariantsError) {
    return {
      success: false,
      message: readVariantsError.message,
    };
  }

  return {
    success: true,
    data: data ?? [],
  };
};
