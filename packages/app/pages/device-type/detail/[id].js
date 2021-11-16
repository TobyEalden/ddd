import Link from "next/link";
import {useRouter} from "next/router";
import getConfig from "next/config";

import Button from "../../../components/button.jsx";
import MainFull from "../../../components/main-full.jsx";
import FormDetail from "../../../components/form-detail.jsx";
import PageHeading from "../../../components/page-heading.jsx";
import ErrorPanel from "../../../components/error-panel.jsx";

import {useDeviceType} from "../../../data/device-type.js";
import SectionHeading from "../../../components/section-heading.jsx";
import DeviceTypeSignatures from "../../../components/device-type-signatures.jsx";
import DeviceTypeBindings from "../../../components/device-type-bindings.jsx";
import IconButton from "../../../components/icon-button.jsx";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const {publicRuntimeConfig} = getConfig();

// Will be available on both server-side and client-side
console.log(publicRuntimeConfig.baseUrl);
export default function DetailDeviceType() {
  const router = useRouter();
  const deviceType = useDeviceType(router.query.id);

  let infoURL;
  if (deviceType.data && deviceType.data.length > 0) {
    infoURL = `${publicRuntimeConfig.baseUrl}/api/device-type/info/${deviceType.data[0].id}`;
  }

  return (
    <MainFull>
      {deviceType.error && <ErrorPanel>ERROR! {deviceType.error.message}</ErrorPanel>}
      {deviceType.data && deviceType.data.length > 0 && (
        <>
          <PageHeading heading={`Device Type details for '${deviceType.data[0].name}'`}>
            <IconButton
              route={`/device-type/detail/graph/${router.query.id}`}
              iconName={`fad fa-diagram-project`}
              label="visualise"
            />
          </PageHeading>
          <div className="flex flex-col space-y-2 w-full p-2">
            <FormDetail label="Id" detail={deviceType.data[0].id} pre={true} />
            <FormDetail label="Id link" detail={<a href={infoURL}>{infoURL}</a>} />
            <FormDetail label="Device type" detail={deviceType.data[0].name} />
            <FormDetail label="Description" detail={deviceType.data[0].description || "n/a"} />
            <FormDetail label="Model" detail={deviceType.data[0].model || "n/a"} />
            <FormDetail label="Manufacturer" detail={deviceType.data[0].organisation.name || "n/a"} />
            <FormDetail
              label="Manufacturer link"
              detail={
                <a href={deviceType.data[0].manufacturer_link || "#"}>
                  {deviceType.data[0].manufacturer_link || "n/a"}
                </a>
              }
            />
            <FormDetail label="Timestamp" detail={deviceType.data[0].updated_at || Date.now()} pre={true} />
            <SectionHeading heading="Signatures" />
            <DeviceTypeSignatures deviceTypeId={router.query.id} />
            <SectionHeading heading="Firmware Bindings" />
            <DeviceTypeBindings deviceTypeId={router.query.id} />
            <div className="flex flex-row justify-between">
              <Link href="/device-type">
                <Button type="button" secondary={true}>
                  Close
                </Button>
              </Link>
              <div className="flex-grow" />
              <Link href={`/device-type/edit/${deviceType.data[0].id}`}>
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

DetailDeviceType.getInitialProps = async () => {
  return {};
};
