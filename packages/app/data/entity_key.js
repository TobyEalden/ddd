import {digestMessageBase58} from "../util/crypto-helper";
import {supabase} from "../util/supabase-client";

export function createKey({name, description, public_key}) {
  return digestMessageBase58(public_key)
    .then((fingerprint) => {
      return supabase.from("entity_key").insert([
        {
          fingerprint,
          user_id: supabase.auth.user().id,
          public_key: public_key,
          name,
          description,
          updated_at: "now()",
          status: 0,
        },
      ]);
    })
    .catch((err) => {
      console.log("Failure creating key: ", err.message);
      throw err;
    });
}

export function deleteKey(fingerprint) {
  return Promise.resolve(supabase.from("entity_key").update({status: 99}).eq("fingerprint", fingerprint)).catch(
    (err) => {
      console.log("Failure deleting key: ", err.message);
      throw err;
    }
  );
}

export function getKey(fingerprint) {
  return supabase
    .from("entity_key")
    .select()
    .eq("fingerprint", fingerprint)
    .neq("status", 99)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error("Failure loading key " + fingerprint);
      return {error: err};
    });
}

export function saveKey({fingerprint, name, description}) {
  return Promise.resolve(
    supabase.from("entity_key").update({name, description, updated_at: "now()"}).eq("fingerprint", fingerprint)
  ).catch((err) => {
    console.log("Failure saving key: ", err.message);
    throw err;
  });
}
