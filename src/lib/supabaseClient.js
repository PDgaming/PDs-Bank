
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yfzqooiwfxikhqmwjvjz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmenFvb2l3Znhpa2hxbXdqdmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1OTMxMzIsImV4cCI6MjAzNDE2OTEzMn0.VTby5Ex7Yh-Nn48nIQCn8MtBaweQ30nglCYaFqsPg_w"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);