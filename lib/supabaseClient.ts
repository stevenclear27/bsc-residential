import { createClient } from "@supabase/supabase-js";

// Pull the secure API keys from the local environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "CRITICAL FAILURE: Supabase environment variables are missing.",
  );
}

// Initialize and export the client for system-wide use
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
