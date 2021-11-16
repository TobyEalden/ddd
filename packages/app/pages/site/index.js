import Link from "next/link";

import Button from "../../components/button.jsx";
import ErrorPanel from "../../components/error-panel.jsx";
import LoadingPanel from "../../components/loading-panel.jsx";
import MainFull from "../../components/main-full.jsx";
import PageHeading from "../../components/page-heading.jsx";

import {useSites} from "../../data/site.js";

export default function Sites() {
  const {data, error, loading} = useSites();

  return (
    <MainFull>
      {loading && <LoadingPanel>Loading...</LoadingPanel>}
      {error && <ErrorPanel>{error.message}</ErrorPanel>}
      {data && (
        <>
          <PageHeading heading="Sites" />
          <div className="flex flex-col w-full space-y-2">
            {data.length > 0 &&
              data.map((site) => {
                return (
                  <Link key={site.id} href={`/site/detail/${site.id}`}>
                    <div className="flex flex-col  hover:bg-primary hover:text-base-inverted border-b-2 text-base mb-1 p-2 cursor-pointer">
                      <div>
                        <span className="font-bold">
                          {site.name} / {site.location}
                        </span>
                      </div>
                      {site.description && (
                        <div>
                          <span>{site.description}</span>
                        </div>
                      )}
                      <div className="flex flex-row items-center space-x-2">
                        <i className="fad fa-id-badge text-primary-dark" />
                        <span className="text-sm font-mono">{site.id}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            {data.length === 0 && <span className="p-2">No sites found.</span>}
          </div>
        </>
      )}
      <div className="flex flex-row justify-end mt-2">
        <Link href="/site/add">
          <Button>
            <i className="fad fa-plus mr-2" />
            Add site
          </Button>
        </Link>
      </div>
    </MainFull>
  );
}
