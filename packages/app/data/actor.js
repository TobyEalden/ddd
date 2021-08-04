import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";

export function useActorSelect(id) {
  return useSelect(() => {
    if (id) {
      return supabase
        .from("actor")
        .select("*, actor_type(name), actor_key(name, profile: profile_id(name))")
        .eq("id", id)
        .eq("actor_type.name", "device type")
        .neq("status", 99);
    } else {
      return supabase
        .from("actor")
        .select("*, actor_type(name), actor_key(name, profile: profile_id(name))")
        .eq("actor_type.name", "device type")
        .neq("status", 99);
    }
  });
}

export function createDeviceType(data) {
  return supabase
    .from("actor_type")
    .select("id")
    .eq("name", "device type")
    .then((response) => {
      if (response.error) {
        return response;
      }
      if (response.data.length != 1) {
        response.error = new Error("Error fetching device type actor id");
        return response;
      }
      return createActor({...data, actor_type: response.data[0].id});
    });
}

export function createActor({name, description, issuer_fingerprint, actor_type, profile_id}) {
  return supabase.from("actor").insert([
    {
      issuer_fingerprint,
      actor_type,
      profile_id: supabase.auth.user().id,
      name,
      description,
      status: 0,
    },
  ]);
}

export function deleteActor(id) {
  return supabase.from("actor").update({status: 99}).eq("id", id);
}

export function getActor(id) {
  return supabase.from("actor").select().eq("id", id).neq("status", 99);
}

export function saveActor({id, name, description}) {
  return supabase.from("actor").update({name, description, updated_at: "now()"}).eq("id", id);
}
