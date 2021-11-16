import Link from "next/link";
import {useRouter} from "next/router";

import Button from "../../../components/button.jsx";
import MainFull from "../../../components/main-full.jsx";
import FormDetail from "../../../components/form-detail.jsx";
import PageHeading from "../../../components/page-heading.jsx";
import ErrorPanel from "../../../components/error-panel.jsx";

import {useSite} from "../../../data/site.js";
import SectionHeading from "../../../components/section-heading.jsx";
import IconButton from "../../../components/icon-button.jsx";

export default function DetailSite() {
  const router = useRouter();
  const site = useSite(router.query.id);

  return (
    <MainFull>
      {site.error && <ErrorPanel>{site.error.message}</ErrorPanel>}
      {site.data && site.data.length > 0 && (
        <>
          <PageHeading heading={`Site details for '${site.data[0].name}'`} />
          <div className="flex flex-col space-y-2 w-full p-2">
            <FormDetail label="Id" detail={site.data[0].id} pre={true} />
            <FormDetail label="Site Name" detail={site.data[0].name} />
            <FormDetail label="Description" detail={site.data[0].description || "n/a"} />
            <FormDetail label="Site Type" detail={site.data[0].site_type.name || "n/a"} />
            <FormDetail label="Connection Type" detail={site.data[0].connection_type.name || "n/a"} />
            <FormDetail label="Oranisation" detail={site.data[0].organisation.name || "n/a"} />
            <FormDetail label="Internal Subnet" detail={site.data[0].subnet || "n/a"} />
            <FormDetail label="External IP" detail={site.data[0].ip || "n/a"} />
            <FormDetail label="Location" detail={site.data[0].location || "n/a"} />
            <FormDetail label="Timestamp" detail={site.data[0].updated_at || Date.now()} pre={true} />
            <div className="flex flex-row justify-between">
              <Link href="/site">
                <Button type="button" secondary={true}>
                  Close
                </Button>
              </Link>
              <div className="flex-grow" />
              <Link href={`/site/edit/${site.data[0].id}`}>
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
