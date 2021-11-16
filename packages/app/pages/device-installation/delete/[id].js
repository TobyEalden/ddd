import Button from "../../../components/button.jsx";
import Link from "next/link";
import {useRouter} from "next/router";

import ErrorPanel from "../../../components/error-panel.jsx";
import MainFull from "../../../components/main-full.jsx";
import PageHeading from "../../../components/page-heading.jsx";

import {deleteDeviceInstallation, useDeviceInstallation} from "../../../data/device-installation.js";
import {useSnacks} from "../../../util/snackbar.js";

export default function DeleteDeviceInstallation() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();
  const deviceInstallation = useDeviceInstallation(router.query.id);

  const handleDelete = () => {
    deleteDeviceInstallation(deviceInstallation.data[0].id)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Device installation deleted successfully.");
        router.replace("/device-installation");
      })
      .catch((err) => {
        errorSnack(`Failed to delete device installation: ${err.message}`);
      });
  };

  return (
    <MainFull>
      {deviceInstallation.error && (
        <ErrorPanel>Error loading device installation: {deviceInstallation.error.message}</ErrorPanel>
      )}
      {deviceInstallation.data && deviceInstallation.data.length > 0 && (
        <>
          <PageHeading
            heading={`Confirm deletion of device installation '${deviceInstallation.data[0].serial_number}'`}
          />
          <div className="text-lg p-8 m-8 bg-yellow-400 text-white rounded-md flex flex-row items-center">
            <i className="fad fa-triangle-exclamation mr-4 text-4xl" />
            Are you sure you want to delete device installation &apos;{deviceInstallation.data[0].serial_number}&apos;?
          </div>
          <div className="flex flex-col space-y-2 w-full p-2">
            <div className="flex flex-row justify-between">
              <Link passHref href="/device-installation">
                <Button type="button">Close</Button>
              </Link>
              <div className="flex-grow" />
              <Button type="button" className="mr-2" secondary={true} onClick={handleDelete}>
                <i className="fad fa-trash mr-2" /> Delete
              </Button>
            </div>
          </div>
        </>
      )}
    </MainFull>
  );
}
