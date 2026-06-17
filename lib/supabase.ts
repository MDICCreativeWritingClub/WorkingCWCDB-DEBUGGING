import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hrfxairorirvugkohjyj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyZnhhaXJvcmlydnVna29oanlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2NzEyNjksImV4cCI6MjA5NzI0NzI2OX0.2ROgnoNK5xBIsobHiT40rwLIkPL_Y3HOAljxewgDleI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
