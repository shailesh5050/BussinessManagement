// Import the Supabase client
import { createClient } from "@supabase/supabase-js";

// Your Supabase project's URL and public API key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Now you can use the `supabase` object to interact with your Supabase project
