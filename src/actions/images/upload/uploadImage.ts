"use server";

import type { ApiResponse } from "@/types";
import { createClient } from "@/utils/supabase/client";

interface UploadImageResult {
  path: string;
  fullPath: string;
  publicUrl: string;
}

const sanitizeFileName = (fileName: string) =>
  fileName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "");

export const uploadImage = async (
  formData: FormData,
): Promise<ApiResponse<UploadImageResult>> => {
  const file = formData.get("file");
  const bucket = formData.get("bucket");
  const folder = formData.get("folder");

  if (!(file instanceof File)) {
    return {
      success: false,
      message: "Image file is required.",
    };
  }

  if (typeof bucket !== "string" || !bucket.trim()) {
    return {
      success: false,
      message: "Bucket name is required.",
    };
  }

  const { client, error } = createClient();

  if (!client) {
    return {
      success: false,
      message: error,
    };
  }

  const safeName = sanitizeFileName(file.name || "image");
  const filePath = `${typeof folder === "string" && folder.trim() ? folder.trim() : "uploads"}/${Date.now()}-${safeName}`;
  const fileBytes = new Uint8Array(await file.arrayBuffer());

  const { data, error: uploadError } = await client.storage
    .from(bucket.trim())
    .upload(filePath, fileBytes, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (uploadError) {
    return {
      success: false,
      message: uploadError.message,
    };
  }

  const {
    data: { publicUrl },
  } = client.storage.from(bucket.trim()).getPublicUrl(data.path);

  return {
    success: true,
    data: {
      path: data.path,
      fullPath: data.fullPath,
      publicUrl,
    },
  };
};
