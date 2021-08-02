import Button from "../../../components/button.jsx";
import MainFull from "../../../components/main-full.jsx";
import {useRouter} from "next/router";
import Link from "next/link";
import {useSelect} from "../../../data/use-select.js";
import {supabase} from "../../../util/supabase-client.js";
import FormDetail from "../../../components/form-detail.jsx";

export default function DetailKey() {
  const router = useRouter();
  const keyData = useSelect(() => supabase.from("entity_key").select().eq("fingerprint", router.query.fingerprint));

  return (
    <MainFull>
      {keyData.error && <div>ERROR! {keyData.error.message}</div>}
      {keyData.data && keyData.data.length > 0 && (
        <>
          <div className="text-lg font-bold">Details for '{keyData.data[0].name}'.</div>
          <div className="flex flex-col space-y-2 w-full p-2">
            <FormDetail label="Key name" detail={keyData.data[0].name} />
            <FormDetail label="Description" detail={keyData.data[0].description} />
            <FormDetail label="Fingerprint" detail={keyData.data[0].fingerprint} pre={true} />
            <FormDetail label="Public key" detail={keyData.data[0].public_key} pre={true} />
            <div className="flex flex-row justify-between">
              <Link href="/keys">
                <Button type="button" secondary={true}>
                  Close
                </Button>
              </Link>
              <div className="flex-grow" />
              <Link href={`/keys/delete/${keyData.data[0].fingerprint}`}>
                <Button type="button" className="mr-2" secondary={true}>
                  <i className="fad fa-trash mr-2" /> Delete
                </Button>
              </Link>
              <Link href={`/keys/edit/${keyData.data[0].fingerprint}`}>
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
