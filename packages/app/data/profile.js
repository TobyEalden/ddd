import {supabase} from "../util/supabase-client";

export function saveProfile({name, email, bio, user_id}) {
  return supabase.from("profile").upsert({name, email, updated_at: "now()", user_id}).eq("user_id", user_id);
}
