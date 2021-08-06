import {useRouter} from "next/router";

import MainFull from "../../../../components/main-full.jsx";
import PageHeading from "../../../../components/page-heading.jsx";
import ErrorPanel from "../../../../components/error-panel.jsx";

import {useDeviceType} from "../../../../data/device-type.js";
import DeviceTypeGraph from "../../../../components/device-type-graph.jsx";
import IconButton from "../../../../components/icon-button.jsx";

export default function GraphDeviceType() {
  const router = useRouter();
  const deviceType = useDeviceType(router.query.id);

  return (
    <MainFull>
      {deviceType.error && <ErrorPanel>ERROR! {deviceType.error.message}</ErrorPanel>}
      {deviceType.data && deviceType.data.length > 0 && (
        <>
          <PageHeading heading={`Hierarchy for '${deviceType.data[0].name}'`}>
            <IconButton route={`/device-type/detail/${router.query.id}`} iconName={`fa fa-times`} />
          </PageHeading>
          <DeviceTypeGraph deviceTypeId={router.query.id} includeFirmware />
        </>
      )}
    </MainFull>
  );
}
