import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPA_BASE_PROJECT_URL,
  import.meta.env.VITE_SUPA_BASE_API_KEY
);
