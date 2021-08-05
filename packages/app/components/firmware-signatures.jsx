import {useFirmwareSignatures} from "../data/firmware";
import ErrorPanel from "./error-panel";
import LoadingPanel from "./loading-panel";

export default function FirmwareSignatures({firmwareId}) {
  const firmware = useFirmwareSignatures(firmwareId);

  if (firmware.loading) {
    return <LoadingPanel>Loading...</LoadingPanel>;
  } else if (firmware.error) {
    return <ErrorPanel>{firmware.error.message}</ErrorPanel>;
  } else {
    return (
      <div>
        {firmware.data[0].firmware_signature.map((signature) => {
          return (
            <div className="border-b-2 py-2">
              <i className="fad fa-fingerprint mr-2" />
              Signed by '{signature.profile_key_public.profile.name}' at
              {new Date(signature.signed_at).toLocaleString()} using key '{signature.profile_key_public.name}'
            </div>
          );
        })}
      </div>
    );
  }
}
