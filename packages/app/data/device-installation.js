import {useEffect, useMemo, useState} from "react";

import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";
import {useSubscribe} from "./use-subscribe.js";

export function selectDeviceInstallation(id) {
  return supabase
    .from("device_installation")
    .select("*, device_type:device_type_id(name), site:site_id(name)")
    .eq("id", id)
    .neq("status", 99);
}

export function useDeviceInstallation(id) {
  return useSelect(selectDeviceInstallation, [id]);
}

export function selectDeviceInstallations(orderBy = "name") {
  return supabase.from("device_installation").select("*, site:site_id(name)").neq("status", 99).order(orderBy);
}

export function useDeviceInstallations(orderBy = "name") {
  return useSelect(selectDeviceInstallations, [orderBy]);
}

export function useSubscribeDeviceInstallations(orderBy = "name") {
  return useSubscribe("deviceInstallations", selectDeviceInstallations, orderBy);
}

export function deleteDeviceInstallation(id) {
  return supabase.from("device_installation").update({status: 99}).eq("id", id);
}

export function getDeviceInstallation(id) {
  return supabase.from("device_installation").select().eq("id", id).neq("status", 99);
}

export function saveDeviceInstallation(data) {
  const update = {...data};
  delete update.site;
  delete update.device_type;
  return supabase.from("device_installation").upsert(update);
}
