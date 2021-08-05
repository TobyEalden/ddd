import Button from "../../../components/button.jsx";
import MainFull from "../../../components/main-full.jsx";
import {useRouter} from "next/router";
import Link from "next/link";
import {useSelect} from "../../../data/use-select.js";
import {supabase} from "../../../util/supabase-client.js";
import {useSuccessSnack, useErrorSnack} from "../../../util/snackbar.js";
import {deleteKey} from "../../../data/actor_key.js";
import PageHeading from "../../../components/page-heading.jsx";

export default function DeleteKey() {
  const [successSnack] = useSuccessSnack();
  const [errorSnack] = useErrorSnack();
  const router = useRouter();
  const keyData = useSelect(() =>
    supabase.from("actor_key").select().eq("fingerprint", router.query.fingerprint).neq("status", 99)
  );

  const handleDelete = () => {
    deleteKey(keyData.data[0].fingerprint)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Key deleted successfully.");
        router.replace("/key");
      })
      .catch((err) => {
        errorSnack(`Failed to delete key: ${err.message}`);
      });
  };

  return (
    <MainFull>
      {keyData.error && <div>Error loading key: {keyData.error.message}</div>}
      {keyData.data && keyData.data.length > 0 && (
        <>
          <PageHeading heading={`Confirm deletion of key &apos;${keyData.data[0].name}&apos;`} />
          <div className="text-lg p-8 m-8 bg-yellow-400 text-white rounded-md flex flex-row items-center">
            <i className="fad fa-triangle-exclamation mr-4 text-4xl" />
            Are you sure you want to delete key &apos;{keyData.data[0].name}&apos;?
          </div>
          <div className="flex flex-col space-y-2 w-full p-2">
            <div className="flex flex-row justify-between">
              <Link href="/key">
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
