import {useEffect, useMemo, useState} from "react";

import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";
import {useSubscribe} from "./use-subscribe.js";

export function selectSite(id) {
  return supabase
    .from("site")
    .select(
      "*, organisation:organisation_id(name), connection_type:connection_type_id(name), site_type:site_type_id(name)"
    )
    .eq("id", id)
    .neq("status", 99);
}

export function useSite(id) {
  return useSelect(selectSite, [id]);
}

export function selectSites(orderBy = "name") {
  return supabase.from("site").select().neq("status", 99).order(orderBy);
}

export function useSites(orderBy = "name") {
  return useSelect(selectSites, [orderBy]);
}

export function useSubscribeSites(orderBy = "name") {
  return useSubscribe("sites", selectSites, orderBy);
}

export function deleteSite(id) {
  return supabase.from("site").update({status: 99}).eq("id", id);
}

export function getSite(id) {
  return supabase.from("site").select().eq("id", id).neq("status", 99);
}

export function saveSite(data) {
  const update = {...data};
  delete update.organisation;
  delete update.connection_type;
  delete update.site_type;
  return supabase.from("site").upsert(update);
}
