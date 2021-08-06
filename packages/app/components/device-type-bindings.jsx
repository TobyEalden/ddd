import {useInheritedDeviceTypeBindings} from "../data/device-type.js";

import ErrorPanel from "./error-panel.jsx";
import IconButton from "./icon-button.jsx";
import InfoPanel from "./info-panel.jsx";
import LoadingPanel from "./loading-panel.jsx";

export default function DeviceTypeBindings({deviceTypeId}) {
  const bindings = useInheritedDeviceTypeBindings(deviceTypeId);

  if (bindings.loading) {
    return <LoadingPanel>Loading...</LoadingPanel>;
  } else if (bindings.error) {
    return <ErrorPanel>{bindings.error.message}</ErrorPanel>;
  } else if (bindings.data.length === 0) {
    return <InfoPanel>No bindings found.</InfoPanel>;
  } else {
    return bindings.data.map((binding, idx) => {
      return (
        <div key={idx} className="border-b-2 py-2 flex">
          <div className="flex-grow">
            <i className="fad fa-microchip mr-2 text-primary-dark" />
            {binding.name}
            <div>
              Bound by &apos;{binding.profile_key_public.profile.name}&apos; at{" "}
              {new Date(binding.signed_at).toLocaleString()} using key &apos;{binding.profile_key_public.name}&apos;
            </div>
            {binding.device_type.id !== deviceTypeId && (
              <div className="text-sm">[INHERITED from {binding.device_type.name}]</div>
            )}
          </div>
          <div>
            <IconButton iconName="fad fa-signature-lock" label="add your signature" />
          </div>
        </div>
      );
    });
  }
}
