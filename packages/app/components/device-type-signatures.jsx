import {useDeviceTypeSignatures} from "../data/device-type";
import ErrorPanel from "./error-panel";
import LoadingPanel from "./loading-panel";

export default function DeviceTypeSignatures({deviceTypeId}) {
  const deviceType = useDeviceTypeSignatures(deviceTypeId);

  if (deviceType.loading) {
    return <LoadingPanel>Loading...</LoadingPanel>;
  } else if (deviceType.error) {
    return <ErrorPanel>{deviceType.error.message}</ErrorPanel>;
  } else {
    return (
      <div>
        {deviceType.data[0].device_type_signature.map((signature) => {
          return (
            <div className="border-b-2 py-2">
              <i className="fad fa-fingerprint mr-2" />
              Signed by '{signature.profile_key_public.profile.name}' at{" "}
              {new Date(signature.signed_at).toLocaleString()} using key '{signature.profile_key_public.name}'
            </div>
          );
        })}
      </div>
    );
  }
}
