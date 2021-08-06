import {useFirmwareBindings} from "../data/firmware";
import ErrorPanel from "./error-panel";
import InfoPanel from "./info-panel";
import LoadingPanel from "./loading-panel";

export default function FirmwareBindings({firmwareId}) {
  const bindings = useFirmwareBindings(firmwareId);

  if (bindings.loading) {
    return <LoadingPanel>Loading...</LoadingPanel>;
  } else if (bindings.error) {
    return <ErrorPanel>{bindings.error.message}</ErrorPanel>;
  } else if (bindings.data.length === 0) {
    return <InfoPanel>No bindings found.</InfoPanel>;
  } else {
    return bindings.data.map((binding) => {
      return (
        <div className="border-b-2 py-2">
          <i className="fad fa-link mr-2" />
          Bound to '{binding.device_type.name}' by '{binding.profile_key_public.profile.name}' at{" "}
          {new Date(binding.signed_at).toLocaleString()} using key '{binding.profile_key_public.name}'
        </div>
      );
    });
  }
}