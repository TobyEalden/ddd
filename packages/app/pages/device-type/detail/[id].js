import Button from "../../../components/button.jsx";
import MainFull from "../../../components/main-full.jsx";
import {useRouter} from "next/router";
import Link from "next/link";
import {useSelect} from "../../../data/use-select.js";
import {supabase} from "../../../util/supabase-client.js";
import FormDetail from "../../../components/form-detail.jsx";
import PageHeading from "../../../components/page-heading.jsx";

export default function DetailDeviceType() {
  const router = useRouter();
  const deviceType = useSelect(() =>
    supabase.from("actor").select("*, actor_key(name, users(id))").eq("id", router.query.id).neq("status", 99)
  );

  return (
    <MainFull>
      {deviceType.error && <div>ERROR! {deviceType.error.message}</div>}
      {deviceType.data && deviceType.data.length > 0 && (
        <>
          <PageHeading heading={`Details for '${deviceType.data[0].name}'`} />
          <div className="flex flex-col space-y-2 w-full p-2">
            <FormDetail label="Device type" detail={deviceType.data[0].name} />
            <FormDetail label="Description" detail={deviceType.data[0].description || "n/a"} />
            <FormDetail label="Id" detail={deviceType.data[0].id} pre={true} />
            <FormDetail label="Timestamp" detail={deviceType.data[0].updated_at || Date.now()} pre={true} />
            <FormDetail label="Signed by" detail={deviceType.data[0].actor_key.name} />
            <FormDetail label="User Id" detail={deviceType.data[0].actor_key.users.id} />
            <div className="flex flex-row justify-between">
              <Link href="/key">
                <Button type="button" secondary={true}>
                  Close
                </Button>
              </Link>
              <div className="flex-grow" />
              <Link href={`/device-type/delete/${deviceType.data[0].id}`}>
                <Button type="button" className="mr-2" secondary={true}>
                  <i className="fad fa-trash mr-2" /> Delete
                </Button>
              </Link>
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
