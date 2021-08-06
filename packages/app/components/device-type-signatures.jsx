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
        {deviceType.data[0].device_type_signature.map((signature, idx) => {
          return (
            <div key={idx} className="border-b-2 py-2">
              <i className="fad fa-fingerprint mr-2 text-primary-dark" />
              Signed by &apos;{signature.profile_key_public.profile.name}&apos; at{" "}
              {new Date(signature.signed_at).toLocaleString()} using key &apos;{signature.profile_key_public.name}&apos;
            </div>
          );
        })}
      </div>
    );
  }
}
