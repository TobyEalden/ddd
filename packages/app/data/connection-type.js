import {useEffect, useState} from "react";
import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";

export function selectConnectionTypes(orderBy = "name") {
  return supabase.from("connection_type").select().neq("status", 99).order(orderBy);
}

export function useConnectionTypes(orderBy = "name") {
  return useSelect(selectConnectionTypes, [orderBy]);
}

export function useSubscribeConnectionTypes(orderBy = "name") {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const subscription = supabase
      .from("connection_type")
      .on("*", () => {
        selectConnectionTypes(orderBy).then((response) => setPayload(response));
      })
      .subscribe();

    selectConnectionTypes(orderBy).then((response) => setPayload(response));

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [orderBy]);

  return payload;
}

export function saveConnectionType(data) {
  return supabase.from("connection_type").upsert(data);
}
