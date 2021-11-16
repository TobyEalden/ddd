import {useEffect, useState} from "react";
import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";

export function selectSiteTypes(orderBy = "name") {
  return supabase.from("site_type").select().neq("status", 99).order(orderBy);
}

export function useSiteTypes(orderBy = "name") {
  return useSelect(selectSiteTypes, [orderBy]);
}

export function useSubscribeSiteTypes(orderBy = "name") {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const subscription = supabase
      .from("site_type")
      .on("*", () => {
        selectSiteTypes(orderBy).then((response) => setPayload(response));
      })
      .subscribe();

    selectSiteTypes(orderBy).then((response) => setPayload(response));

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [orderBy]);

  return payload;
}

export function saveSiteType(data) {
  return supabase.from("site_type").upsert(data);
}
