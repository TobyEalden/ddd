import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";

import {useInheritedDeviceTypeBindings} from "./device-type.js";

function selectDeviceTypeGraph(deviceTypeId) {
  // Fetch all ancestors of the device type.
  let ancestors;
  console.log("selectDeviceTypeGraph for " + deviceTypeId);
  return supabase
    .from("device_type_hierarchy")
    .select("*")
    .eq("descendant_id", deviceTypeId)
    .order("ancestor_depth")
    .then((response) => {
      if (response.error) {
        return response;
      }
      if (!response.data || response.data.length == 0) {
        return response;
      }

      ancestors = response.data;

      // Fetch all descendants of the root device type.
      const rootId = ancestors[0].ancestor_id || ancestors[0].descendant_id;
      return supabase
        .from("device_type_hierarchy")
        .select("*, device_type: descendant_id(*)")
        .or(`ancestor_id.eq.${rootId}, descendant_id.eq.${rootId}`)
        .order("depth");
    })
    .then((response) => {
      if (response.error) {
        return response;
      }
      return {
        ...response,
        data: {
          ancestors,
          root: response.data[0],
          graph: response.data,
        },
      };
    });
}

export function useDeviceTypeGraph(deviceTypeId) {
  const hierarchy = useSelect(selectDeviceTypeGraph, [deviceTypeId]);
  const bindings = useInheritedDeviceTypeBindings(deviceTypeId);

  return {
    loading: hierarchy.loading || bindings.loading,
    hierarchy,
    bindings,
  };
}
