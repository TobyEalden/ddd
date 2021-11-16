import Button from "../../../components/button.jsx";
import MainFull from "../../../components/main-full.jsx";
import {useRouter} from "next/router";
import Link from "next/link";
import {useSelect} from "../../../data/use-select.js";
import {supabase} from "../../../util/supabase-client.js";
import FormDetail from "../../../components/form-detail.jsx";
import PageHeading from "../../../components/page-heading.jsx";
import {useProfileKey} from "../../../data/profile-key.js";

export default function DetailKey() {
  const router = useRouter();
  const keyData = useProfileKey(router.query.fingerprint);

  return (
    <MainFull>
      {keyData.error && <div>ERROR! {keyData.error.message}</div>}
      {keyData.data && keyData.data.length > 0 && (
        <>
          <PageHeading heading={`Details for '${keyData.data[0].name}'`} />
          <div className="flex flex-col space-y-2 w-full p-2">
            <FormDetail label="Key name" detail={keyData.data[0].name} />
            <FormDetail label="Description" detail={keyData.data[0].description} />
            <FormDetail label="Fingerprint" detail={keyData.data[0].fingerprint} pre={true} />
            <FormDetail label="Public key" detail={keyData.data[0].public_key} pre={true} />
            <FormDetail label="Timestamp" detail={keyData.data[0].updated_at} pre={true} />
            <div className="flex flex-row justify-between">
              <Link passHref href="/key">
                <Button type="button" secondary={true}>
                  Close
                </Button>
              </Link>
              <div className="flex-grow" />
              <Link passHref href={`/key/delete/${keyData.data[0].fingerprint}`}>
                <Button type="button" className="mr-2" secondary={true}>
                  <i className="fad fa-trash mr-2" /> Delete
                </Button>
              </Link>
              <Link passHref href={`/key/edit/${keyData.data[0].fingerprint}`}>
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
