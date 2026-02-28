import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jyxejcmqxdptksomvekm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGVqY21xeGRwdGtzb212ZWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNjAxMzgsImV4cCI6MjA4NzgzNjEzOH0.OmSIdwaBX9T7HwEzttxdBUneYP5e8rnFuXo-M5VHD-E"
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);