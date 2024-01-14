import { Database } from "@/models/schema";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const suapbaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient<Database>(supabaseUrl, suapbaseKey);
