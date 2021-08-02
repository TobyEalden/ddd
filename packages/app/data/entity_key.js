import {digestMessageBase58} from "../util/crypto-helper";
import {supabase} from "../util/supabase-client";

export function createKey({name, description, publicKey}) {
  return digestMessageBase58(publicKey)
    .then((fingerprint) => {
      return supabase
        .from("entity_key")
        .insert([{fingerprint, user_id: supabase.auth.user().id, public_key: publicKey, name, description}]);
    })
    .catch((err) => {
      console.log("Failure creating key: ", err.message);
      throw err;
    });
}

export function saveKey({fingerprint, name, description}) {
  return Promise.resolve(supabase.from("entity_key").update({name, description}).eq("fingerprint", fingerprint)).catch(
    (err) => {
      console.log("Failure saving key: ", err.message);
      throw err;
    }
  );
}
