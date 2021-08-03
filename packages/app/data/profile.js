import {supabase} from "../util/supabase-client";

export function saveProfile({id, name, email, bio, user_id}) {
  return supabase.from("profile").upsert({id, name, email, updated_at: "now()", user_id}).eq("id", id);
}
