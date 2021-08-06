import {useFirmwareSignatures} from "../data/firmware.js";

import IconButton from "./icon-button.jsx";
import ErrorPanel from "./error-panel.jsx";
import LoadingPanel from "./loading-panel.jsx";

export default function FirmwareSignatures({firmwareId}) {
  const firmware = useFirmwareSignatures(firmwareId);

  if (firmware.loading) {
    return <LoadingPanel>Loading...</LoadingPanel>;
  } else if (firmware.error) {
    return <ErrorPanel>{firmware.error.message}</ErrorPanel>;
  } else {
    return (
      <>
        {firmware.data[0].firmware_signature.map((signature, idx) => {
          return (
            <div className="border-b-2 py-2" key={idx}>
              <i className="fad fa-fingerprint mr-2" />
              Signed by &apos;{signature.profile_key_public.profile.name}&apos; at
              {new Date(signature.signed_at).toLocaleString()} using key &apos;{signature.profile_key_public.name}&apos;
            </div>
          );
        })}
        <div className="flex justify-end">
          <IconButton iconName="fad fa-signature-lock" label="add your signature" />
        </div>
      </>
    );
  }
}
