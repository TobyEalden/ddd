import Button from "../../../components/button.jsx";
import Link from "next/link";
import {useRouter} from "next/router";

import ErrorPanel from "../../../components/error-panel.jsx";
import MainFull from "../../../components/main-full.jsx";
import PageHeading from "../../../components/page-heading.jsx";

import {deleteSite, useSite} from "../../../data/site.js";
import {useSnacks} from "../../../util/snackbar.js";

export default function DeleteSite() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();
  const site = useSite(router.query.id);

  const handleDelete = () => {
    deleteSite(site.data[0].id)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Site deleted successfully.");
        router.replace("/site");
      })
      .catch((err) => {
        errorSnack(`Failed to delete site: ${err.message}`);
      });
  };

  return (
    <MainFull>
      {site.error && <ErrorPanel>Error loading site: {site.error.message}</ErrorPanel>}
      {site.data && site.data.length > 0 && (
        <>
          <PageHeading heading={`Confirm deletion of Site '${site.data[0].name}'`} />
          <div className="text-lg p-8 m-8 bg-yellow-400 text-white rounded-md flex flex-row items-center">
            <i className="fad fa-triangle-exclamation mr-4 text-4xl" />
            Are you sure you want to delete site &apos;{site.data[0].name}&apos;?
          </div>
          <div className="flex flex-col space-y-2 w-full p-2">
            <div className="flex flex-row justify-between">
              <Link href="/site">
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
