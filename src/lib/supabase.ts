import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

//valores do projeto no Supabase:
const supabaseUrl = "https://bnlykckogdmetkpxlyvp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubHlrY2tvZ2RtZXRrcHhseXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjkyNjUsImV4cCI6MjA1OTU0NTI2NX0.IB_z3VZZkCZndsMLH8bPPvMSGflyesE4E3JrNLonSvw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
