import {digestMessageBase58} from "../util/crypto-helper";
import {supabase} from "../util/supabase-client";

export function createKey({name, description, public_key, private_key}) {
  return digestMessageBase58(public_key).then((fingerprint) => {
    return supabase.from("actor_key").insert([
      {
        fingerprint,
        user_id: supabase.auth.user().id,
        public_key,
        private_key,
        name,
        description,
        updated_at: "now()",
        status: 0,
      },
    ]);
  });
}

export function deleteKey(fingerprint) {
  return supabase.from("actor_key").update({status: 99}).eq("fingerprint", fingerprint);
}

export function getKey(fingerprint) {
  return supabase.from("actor_key").select().eq("fingerprint", fingerprint).neq("status", 99);
}

export function saveKey({fingerprint, name, description}) {
  return supabase.from("actor_key").update({name, description, updated_at: "now()"}).eq("fingerprint", fingerprint);
}
