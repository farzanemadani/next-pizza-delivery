"use server";

import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

interface GetImagePublicUrlResult {
  path: string;
  publicUrl: string;
}

export const getImagePublicUrl = async (
  bucket: string,
  path: string,
): Promise<ApiResponse<GetImagePublicUrlResult>> => {
  if (!bucket.trim()) {
    return {
      success: false,
      message: "Bucket name is required.",
    };
  }

  if (!path.trim()) {
    return {
      success: false,
      message: "Image path is required.",
    };
  }

  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const {
    data: { publicUrl },
  } = client.storage.from(bucket.trim()).getPublicUrl(path.trim());

  return {
    success: true,
    data: {
      path: path.trim(),
      publicUrl,
    },
  };
};
