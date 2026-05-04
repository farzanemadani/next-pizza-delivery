import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/env";

export const createClient = () => {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return {
      client: null,
      error: "Supabase environment variables are missing.",
    };
  }

  return {
    client: createSupabaseClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY),
    error: null,
  };
};
