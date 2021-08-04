import {useEffect} from "react";
import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";

export function selectClaimDefinitions(orderBy = "name") {
  return supabase.from("claim_definition").select().neq("status", 99).order(orderBy);
}

export function useClaimDefinitions(orderBy = "name", reloadTrigger) {
  return useSelect(() => selectClaimDefinitions(orderBy), reloadTrigger);
}

export function selectClaims(subjectId, orderBy = "name") {
  return supabase.from("claim").select().eq("subject_id", subjectId).neq("status", 99).order(orderBy);
}

export function useClaims(subjectId, orderBy = "name") {
  return useSelect(() => selectClaims(subjectId, orderBy));
}

export function saveClaimDefinition(data) {
  return supabase.from("claim_definition").upsert(data);
}

export function saveClaim(data) {
  return supabase.from("claim").upsert(data);
}

export function deleteClaim(claimId) {
  return supabase.from("claim").delete().match({id: claimId});
}
