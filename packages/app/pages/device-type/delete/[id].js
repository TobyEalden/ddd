import Button from "../../../components/button.jsx";
import MainFull from "../../../components/main-full.jsx";
import {useRouter} from "next/router";
import Link from "next/link";
import {useSelect} from "../../../data/use-select.js";
import {supabase} from "../../../util/supabase-client.js";
import {useSuccessSnack, useErrorSnack} from "../../../util/snackbar.js";
import PageHeading from "../../../components/page-heading.jsx";
import {deleteActor} from "../../../data/actor.js";

export default function DeleteDeviceType() {
  const [successSnack] = useSuccessSnack();
  const [errorSnack] = useErrorSnack();
  const router = useRouter();
  const deviceType = useSelect(() => supabase.from("actor").select().eq("id", router.query.id).neq("status", 99));

  const handleDelete = () => {
    deleteActor(deviceType.data[0].id)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Device Type deleted successfully.");
        router.replace("/device-type");
      })
      .catch((err) => {
        errorSnack(`Failed to delete device type: ${err.message}`);
      });
  };

  return (
    <MainFull>
      {deviceType.error && <div>Error loading device type: {deviceType.error.message}</div>}
      {deviceType.data && deviceType.data.length > 0 && (
        <>
          <PageHeading heading={`Confirm deletion of device type '${deviceType.data[0].name}'`} />
          <div className="text-lg p-8 m-8 bg-yellow-400 text-white rounded-md flex flex-row items-center">
            <i className="fad fa-triangle-exclamation mr-4 text-4xl" />
            Are you sure you want to delete device type '{deviceType.data[0].name}'?
          </div>
          <div className="flex flex-col space-y-2 w-full p-2">
            <div className="flex flex-row justify-between">
              <Link href="/device-type">
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