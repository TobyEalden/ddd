import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";

export function selectProfile(userId) {
  return supabase.from("profile").select().eq("user_id", userId);
}

export function useProfile(userId) {
  return useSelect(selectProfile, [userId]);
}

export function saveProfile(data) {
  return supabase
    .from("profile")
    .upsert({...data, updated_at: "now()"})
    .eq("user_id", data.user_id);
}
