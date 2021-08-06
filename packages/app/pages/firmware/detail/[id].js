import {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import Button from "../../../components/button.jsx";
import ErrorPanel from "../../../components/error-panel.jsx";
import FirmwareBindDialog from "../../../components/firmware-bind-dialog.jsx";
import FirmwareSignatures from "../../../components/firmware-signatures.jsx";
import FirmwareBindings from "../../../components/firmware-bindings.jsx";
import FormDetail from "../../../components/form-detail.jsx";
import MainFull from "../../../components/main-full.jsx";
import PageHeading from "../../../components/page-heading.jsx";
import SectionHeading from "../../../components/section-heading.jsx";

import {useFirmware} from "../../../data/firmware.js";

export default function DetailFirmware() {
  const router = useRouter();
  const firmware = useFirmware(router.query.id);
  const [toggleShowBinding, setToggleShowBinding] = useState(false);

  return (
    <MainFull>
      {firmware.error && <ErrorPanel>ERROR! {firmware.error.message}</ErrorPanel>}
      {firmware.data && firmware.data.length > 0 && (
        <>
          <PageHeading heading={`Details for '${firmware.data[0].name}'`} />
          <div className="flex flex-col space-y-2 w-full p-2">
            <FormDetail label="Id" detail={firmware.data[0].id} pre={true} />
            <FormDetail label="Firmware" detail={firmware.data[0].name} />
            <FormDetail label="Description" detail={firmware.data[0].description || "n/a"} />
            <FormDetail label="Download URL" detail={firmware.data[0].download_url || "n/a"} />
            <FormDetail label="Payload number" detail={firmware.data[0].payload_number || "n/a"} />
            <FormDetail label="Version number" detail={firmware.data[0].version_number || "n/a"} />
            <FormDetail label="Manufacturer" detail={firmware.data[0].organisation.name || "n/a"} />
            <FormDetail label="Timestamp" detail={firmware.data[0].updated_at || Date.now()} pre={true} />
            <SectionHeading heading="Signatures" />
            <FirmwareSignatures firmwareId={router.query.id} />
            <SectionHeading heading="Device Type Bindings" />
            <FirmwareBindings firmwareId={router.query.id} />
            <div className="flex flex-row justify-between">
              <Link href="/firmware">
                <Button type="button" secondary={true}>
                  Close
                </Button>
              </Link>
              <Button type="button" className="ml-2" onClick={() => setToggleShowBinding(true)}>
                Add Device Type Binding
              </Button>
              <div className="flex-grow" />
              <Link href={`/firmware/edit/${firmware.data[0].id}`}>
                <Button type="button">
                  <i className="fad fa-edit mr-2" /> Edit
                </Button>
              </Link>
            </div>
          </div>
          <FirmwareBindDialog
            isOpen={toggleShowBinding}
            onDismiss={() => setToggleShowBinding(false)}
            firmwareId={router.query.id}
          />
        </>
      )}
    </MainFull>
  );
}
