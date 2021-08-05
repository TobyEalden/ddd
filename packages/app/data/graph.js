import {supabase} from "../util/supabase-client.js";
import {useSelect} from "./use-select.js";

function selectDeviceTypeGraph(deviceTypeId) {
  // Fetch hierarchy involving the device type.
  return supabase
    .from("device_type_hierarchy")
    .select("*")
    .eq("descendant_id", deviceTypeId)
    .order("depth")
    .then((response) => {
      if (response.error) {
        return response;
      }
      if (!response.data || response.data.length == 0) {
        return response;
      }
      return;
    });
}
