import Button from "../../../components/button.jsx";
import Link from "next/link";
import {useRouter} from "next/router";

import MainFull from "../../../components/main-full.jsx";
import PageHeading from "../../../components/page-heading.jsx";

import {deleteFirmware, useFirmware} from "../../../data/firmware.js";
import {useSnacks} from "../../../util/snackbar.js";

export default function DeleteFirmware() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();
  const firmware = useFirmware(router.query.id);

  const handleDelete = () => {
    deleteFirmware(firmware.data[0].id)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Firmware deleted successfully.");
        router.replace("/firmware");
      })
      .catch((err) => {
        errorSnack(`Failed to delete firmware: ${err.message}`);
      });
  };

  return (
    <MainFull>
      {firmware.error && <div>Error loading firmware: {firmware.error.message}</div>}
      {firmware.data && firmware.data.length > 0 && (
        <>
          <PageHeading heading={`Confirm deletion of firmware '${firmware.data[0].name}'`} />
          <div className="text-lg p-8 m-8 bg-yellow-400 text-white rounded-md flex flex-row items-center">
            <i className="fad fa-triangle-exclamation mr-4 text-4xl" />
            Are you sure you want to delete firmware &apos;{firmware.data[0].name}&apos;?
          </div>
          <div className="flex flex-col space-y-2 w-full p-2">
            <div className="flex flex-row justify-between">
              <Link passHref href="/firmware">
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
