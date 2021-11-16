import {useEffect, useMemo, useState} from "react";

import {createInheritance} from "./hierarchy-helper.js";
import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";
import {useSubscribe} from "./use-subscribe.js";

export function selectDeviceType(id) {
  return supabase.from("device_type").select("*, organisation:organisation_id(name)").eq("id", id).neq("status", 99);
}

export function selectDeviceTypeSignatures(id) {
  return supabase
    .from("device_type")
    .select(
      "*, device_type_signature(signed_at, profile_key_public(name, profile: profile_id(name))), organisation:organisation_id(name)"
    )
    .eq("id", id)
    .neq("status", 99)
    .order("signed_at", {foreignTable: "device_type_signature"})
    .order("name", {foreignTable: "profile"});
}

export function selectDeviceTypeBindings(id) {
  return supabase
    .from("firmware_binding")
    .select(
      "signed_at, device_type(*, organisation:organisation_id(name)), firmware(*), profile_key_public(name, profile: profile_id(name))"
    )
    .eq("device_type_id", id)
    .neq("device_type.status", 99)
    .neq("firmware.status", 99);
}

/**
 * Loads all bindings for the given device type, including those bindings
 * inherited from parent device types.
 * @param {*} deviceTypeId
 * @returns
 */
export function selectInheritedDeviceTypeBindings(deviceTypeId) {
  // Begin by fetching all ancestors of the given device type.
  console.log("selectInheritedDeviceTypeBindings for " + deviceTypeId);
  return supabase
    .from("device_type_hierarchy")
    .select("ancestor_id")
    .eq("descendant_id", deviceTypeId)
    .then((response) => {
      if (response.error) {
        return response;
      }

      // Have the collection of device ancestors. Now lookup all firmware bindings for any of those devices.
      const deviceIds = response.data.map((d) => d.ancestor_id || deviceTypeId);
      deviceIds.push(deviceTypeId);
      return supabase
        .from("inherited_firmware_binding")
        .select(
          "*, device_type:device_type_id(*, organisation:organisation_id(name)), profile_key_public!profile_key_id(name, profile: profile_id(name))"
        )
        .in("device_type_id", deviceIds)
        .neq("device_type.status", 99)
        .neq("firmware.status", 99)
        .order("device_type_id")
        .order("depth", {ascending: true});
    });
}

export function useDeviceType(id) {
  return useSelect(selectDeviceType, [id]);
}

export function useDeviceTypeSignatures(id) {
  return useSelect(selectDeviceTypeSignatures, [id]);
}

export function useDeviceTypeBindings(id) {
  return useSelect(selectDeviceTypeBindings, [id]);
}

export function useInheritedDeviceTypeBindings(id) {
  return useSelect(selectInheritedDeviceTypeBindings, [id]);
}

export function useSubscribeDeviceTypeBindings(id) {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const subscription = supabase
      .from("firmware_binding")
      .on("*", () => {
        selectDeviceTypeBindings(id).then((response) => setPayload(response));
      })
      .subscribe();

    selectDeviceTypeBindings(id).then((response) => setPayload(response));

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [id]);

  return payload;
}

export function selectDeviceTypeWithHierarchy(id) {
  return supabase
    .from("device_type_hierarchy")
    .select("*, device_type: ancestor_id(*)")
    .eq("descendant_id", id)
    .order("depth");
}

export function useDeviceTypeHierarchy(id) {
  return useSelect(selectDeviceTypeWithHierarchy, [id]);
}

export function useSubscribeDeviceTypeWithClaims(deviceTypeName, id) {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const subscription = supabase
      .from("claim")
      .on("*", () => {
        selectDeviceType(id).then((response) => setPayload(response));
      })
      .subscribe();

    selectDeviceType(id).then((response) => setPayload(response));

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [deviceTypeName, id]);

  return payload;
}

export function selectDeviceTypes(orderBy = "name") {
  return supabase.from("device_type").select().neq("status", 99).order(orderBy);
}

export function useDeviceTypes(orderBy = "name") {
  return useSelect(selectDeviceTypes, [orderBy]);
}

export function useSubscribeDeviceTypes(orderBy = "name") {
  return useSubscribe("device_types", selectDeviceTypes, orderBy);
}

export function createDeviceTypeSignature(device_type_id, issuer_fingerprint) {
  return supabase.from("device_type_signature").insert([
    {
      device_type_id,
      profile_key_id: issuer_fingerprint,
    },
  ]);
}

export function createDeviceTypeInheritance(parentId, childId, issuer_fingerprint) {
  return createInheritance("device_type_hierarchy", parentId, childId, issuer_fingerprint);
}

export function createDeviceType({issuer_fingerprint, parent_id, ...data}) {
  return supabase
    .from("device_type")
    .insert(data)
    .then((response) => {
      if (response.error) {
        return response;
      }
      return createDeviceTypeSignature(response.data[0].id, issuer_fingerprint);
    })
    .then((response) => {
      if (response.error) {
        return response;
      }
      return createDeviceTypeInheritance(
        parent_id || "00000000-0000-0000-0000-000000000000",
        response.data[0].device_type_id,
        issuer_fingerprint
      );
    });
}

export function deleteDeviceType(id) {
  return supabase.from("device_type").update({status: 99}).eq("id", id);
}

export function getDeviceType(id) {
  return supabase.from("device_type").select().eq("id", id).neq("status", 99);
}

export function saveDeviceType({id, name, description, manufacturer_link}) {
  return supabase
    .from("device_type")
    .update({name, description, manufacturer_link, updated_at: new Date()})
    .eq("id", id);
}
