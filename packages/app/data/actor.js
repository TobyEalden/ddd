import {useEffect, useState} from "react";
import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";

export function useDeviceType(id) {
  return useActor("device type", id);
}

export function useDeviceTypes(orderBy = "name") {
  return useActors("device type", orderBy);
}

export function useActor(actorTypeName, id) {
  return useSelect(() => {
    return supabase
      .from("actor")
      .select("*, actor_type(name), actor_key(name, profile: profile_id(name))")
      .eq("id", id)
      .eq("actor_type.name", actorTypeName)
      .neq("status", 99);
  });
}

export function selectActorWithClaims(actorTypeName, id) {
  return supabase
    .from("actor")
    .select("*, actor_type(name), actor_key(name, profile: profile_id(name)), claim(*, claim_definition(*))")
    .eq("id", id)
    .eq("actor_type.name", actorTypeName)
    .neq("status", 99)
    .order("name", {foreignTable: "claim_definition"});
}

export function useActorWithClaims(actorTypeName, id) {
  return useSelect(() => {
    selectActorWithClaims(actorTypeName, id);
  });
}

export function subscribeActorWithClaims(actorTypeName, id) {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const subscription = supabase
      .from("claim")
      .on("*", () => {
        selectActorWithClaims(actorTypeName, id).then((response) => setPayload(response));
      })
      .subscribe();

    selectActorWithClaims(actorTypeName, id).then((response) => setPayload(response));

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [actorTypeName, id]);

  return payload;
}

export function useActors(actorTypeName, orderBy = "name") {
  return useSelect(() => {
    return supabase
      .from("actor")
      .select("*, actor_type(name), actor_key(name, profile: profile_id(name))")
      .eq("actor_type.name", actorTypeName)
      .neq("status", 99)
      .order(orderBy);
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
