import {supabase} from "../util/supabase-client";

export function saveProfile(data) {
  return supabase
    .from("profile")
    .upsert({...data, updated_at: "now()"})
    .eq("user_id", data.user_id);
}
