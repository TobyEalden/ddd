import {useEffect, useState} from "react";

import {createInheritance} from "./hierarchy-helper.js";
import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";
import {useSubscribe} from "./use-subscribe.js";

export function selectFirmware(id) {
  return supabase.from("firmware").select("*, organisation(name)").eq("id", id).neq("status", 99);
}

export function selectFirmwareSignatures(id) {
  return supabase
    .from("firmware")
    .select("*, firmware_signature(signed_at, profile_key_public(name, profile: profile_id(name))), organisation(name)")
    .eq("id", id)
    .neq("status", 99)
    .order("signed_at", {foreignTable: "firmware_signature"})
    .order("name", {foreignTable: "profile"});
}

export function selectFirmwareBindings(firmwareId) {
  return supabase
    .from("firmware_binding")
    .select(
      "signed_at, firmware(*), device_type(*, organisation:organisation_id(name)),  profile_key_public(name, profile: profile_id(name))"
    )
    .eq("firmware_id", firmwareId)
    .neq("device_type.status", 99)
    .neq("firmware.status", 99);
}

export function useFirmware(id) {
  return useSelect(() => selectFirmware(id));
}

export function useFirmwareSignatures(id) {
  return useSelect(() => selectFirmwareSignatures(id));
}

export function useFirmwareBindings(firmwareId) {
  return useSelect(() => selectFirmwareBindings(firmwareId));
}

export function selectFirmwareWithHierarchy(id) {
  return supabase
    .from("firmware_hierarchy")
    .select("*, firmware: ancestor_id(*)")
    .eq("descendant_id", id)
    .order("depth");
}

export function useFirmwareHierarchy(id) {
  return useSelect(() => selectFirmwareWithHierarchy(id));
}

export function useSubscribeFirmwareWithClaims(firmwareName, id) {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const subscription = supabase
      .from("claim")
      .on("*", () => {
        selectFirmware(id).then((response) => setPayload(response));
      })
      .subscribe();

    selectFirmware(id).then((response) => setPayload(response));

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [firmwareName, id]);

  return payload;
}

export function selectFirmwares(orderBy = "name") {
  return supabase.from("firmware").select().neq("status", 99).order(orderBy);
}

export function useFirmwares(orderBy = "name") {
  return useSelect(() => {
    return selectFirmwares(orderBy);
  });
}

export function useSubscribeFirmwares(orderBy = "name") {
  return useSubscribe("firmwares", selectFirmwares, orderBy);
}

export function createFirmwareSignature(firmware_id, issuer_fingerprint) {
  return supabase.from("firmware_signature").insert([
    {
      firmware_id,
      profile_key_id: issuer_fingerprint,
    },
  ]);
}

export function createFirmwareInheritance(parentId, childId, issuer_fingerprint) {
  return createInheritance("firmware_hierarchy", parentId, childId, issuer_fingerprint);
}

export function createFirmware({issuer_fingerprint, parent_id, ...data}) {
  return supabase
    .from("firmware")
    .insert(data)
    .then((response) => {
      if (response.error) {
        return response;
      }
      return createFirmwareSignature(response.data[0].id, issuer_fingerprint);
    })
    .then((response) => {
      if (response.error) {
        return response;
      }
      return createFirmwareInheritance(
        parent_id || "00000000-0000-0000-0000-000000000000",
        response.data[0].firmware_id,
        issuer_fingerprint
      );
    });
}

export function deleteFirmware(id) {
  return supabase.from("firmware").update({status: 99}).eq("id", id);
}

export function getFirmware(id) {
  return supabase.from("firmware").select().eq("id", id).neq("status", 99);
}

export function saveFirmware({id, name, description, payload_number, version_number, organisation_id, download_url}) {
  return supabase
    .from("firmware")
    .update({
      id,
      name,
      description,
      payload_number,
      version_number,
      organisation_id,
      download_url,
      updated_at: new Date(),
    })
    .eq("id", id);
}

export function addFirmwareBinding(firmware_id, device_type_id, profile_key_id) {
  return supabase.from("firmware_binding").insert({
    firmware_id,
    device_type_id,
    profile_key_id,
  });
}
