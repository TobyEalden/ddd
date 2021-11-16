import {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import Button from "../../../components/button.jsx";
import ErrorPanel from "../../../components/error-panel.jsx";
import FormDetail from "../../../components/form-detail.jsx";
import MainFull from "../../../components/main-full.jsx";
import PageHeading from "../../../components/page-heading.jsx";

import {useDeviceInstallation} from "../../../data/device-installation.js";

export default function DetailFirmware() {
  const router = useRouter();
  const deviceInstallation = useDeviceInstallation(router.query.id);

  return (
    <MainFull>
      {deviceInstallation.error && <ErrorPanel>ERROR! {deviceInstallation.error.message}</ErrorPanel>}
      {deviceInstallation.data && deviceInstallation.data.length > 0 && (
        <>
          <PageHeading heading={`Device installation details for '${deviceInstallation.data[0].serial_number}'`} />
          <div className="flex flex-col space-y-2 w-full p-2">
            <FormDetail label="Id" detail={deviceInstallation.data[0].id} pre={true} />
            <FormDetail label="Serial number" detail={deviceInstallation.data[0].serial_number} />
            <FormDetail label="Description" detail={deviceInstallation.data[0].serial_extra || "n/a"} />
            <FormDetail label="Device type" detail={deviceInstallation.data[0].device_type.name || "n/a"} />
            <FormDetail label="Site" detail={deviceInstallation.data[0].site.name || "n/a"} />
            <FormDetail label="Install date" detail={deviceInstallation.data[0].install_date || "n/a"} />
            <FormDetail label="Activation date" detail={deviceInstallation.data[0].active_date || Date.now()} />
            <div className="flex flex-row justify-between">
              <Link href="/device-installation">
                <Button type="button" secondary={true}>
                  Close
                </Button>
              </Link>
              <div className="flex-grow" />
              <Link href={`/device-installation/edit/${deviceInstallation.data[0].id}`}>
                <Button type="button">
                  <i className="fad fa-edit mr-2" /> Edit
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </MainFull>
  );
}
