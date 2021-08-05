import {useEffect, useState} from "react";
import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";

export function selectOrganisations(orderBy = "name") {
  return supabase.from("organisation").select().neq("status", 99).order(orderBy);
}

export function useOrganisations(orderBy = "name", reloadTrigger) {
  return useSelect(() => selectOrganisations(orderBy), reloadTrigger);
}

export function useSubscribeOrganisations(orderBy = "name") {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const subscription = supabase
      .from("organisation")
      .on("*", () => {
        selectOrganisations(orderBy).then((response) => setPayload(response));
      })
      .subscribe();

    selectOrganisations(orderBy).then((response) => setPayload(response));

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [orderBy]);

  return payload;
}

export function saveOrganisation(data) {
  return supabase.from("organisation").upsert(data);
}
