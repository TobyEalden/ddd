import {useEffect, useState} from "react";

import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";
import {useSubscribe} from "./use-subscribe.js";

export function selectDeviceTypeWithSignatures(id) {
  return supabase
    .from("device_type")
    .select(
      "*, device_type_signature(signed_at, profile_key_public(name, profile: profile_id(name))), organisation(name)"
    )
    .eq("id", id)
    .neq("status", 99)
    .order("signed_at", {foreignTable: "device_type_signature"})
    .order("name", {foreignTable: "profile"});
}

export function useDeviceType(id) {
  return useSelect(() => selectDeviceTypeWithSignatures(id));
}

export function selectDeviceTypeWithHierarchy(id) {
  return supabase
    .from("device_type_hierarchy")
    .select("*, device_type: ancestor_id(*)")
    .eq("descendant_id", id)
    .order("depth");
}
export function useDeviceTypeHierarchy(id) {
  return useSelect(() => selectDeviceTypeWithHierarchy(id));
}

export function useSubscribeDeviceTypeWithClaims(deviceTypeName, id) {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const subscription = supabase
      .from("claim")
      .on("*", () => {
        selectDeviceTypeWithSignatures(deviceTypeName, id).then((response) => setPayload(response));
      })
      .subscribe();

    selectDeviceTypeWithSignatures(deviceTypeName, id).then((response) => setPayload(response));

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
  return useSelect(() => {
    return selectDeviceTypes(orderBy);
  });
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
  return supabase
    .from("device_type_hierarchy")
    .select()
    .eq("descendant_id", parentId)
    .order("depth")
    .then((response) => {
      if (response.error) {
        return response;
      }

      const childNodes = [];
      if (response.data.length === 0) {
        childNodes.push({
          ancestor_id: null,
          descendant_id: childId,
          parent_id: null,
          depth: 1,
          signed_by: issuer_fingerprint,
        });
      } else {
        // Child depth is one deeper than parent depth.
        const childDepth = response.data[0].depth + 1;
        let leafAdded = false;
        response.data.forEach((node) => {
          if (!node.ancestor_id) {
            // Ignore the root.
            return;
          }
          if (node.ancestor_id === parentId && node.parent_id === parentId) {
            // Add the leaf node.
            childNodes.push({
              ancestor_id: parentId,
              descendant_id: childId,
              parent_id: parentId,
              depth: node.depth + 1,
              signed_by: issuer_fingerprint,
            });
            leafAdded = true;
          }

          childNodes.push({
            ancestor_id: node.ancestor_id,
            descendant_id: childId,
            parent_id: parentId,
            depth: node.depth + 1,
            signed_by: node.signed_by,
          });
        });

        if (!leafAdded) {
          childNodes.push({
            ancestor_id: parentId,
            descendant_id: childId,
            parent_id: parentId,
            depth: childDepth,
            signed_by: issuer_fingerprint,
          });
        }
      }

      return supabase.from("device_type_hierarchy").insert(childNodes);
    });
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

export function saveDeviceType({id, name, description}) {
  return supabase.from("device_type").update({name, description, updated_at: new Date()}).eq("id", id);
}
