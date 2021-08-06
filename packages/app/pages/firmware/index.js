import Link from "next/link";

import Button from "../../components/button.jsx";
import ErrorPanel from "../../components/error-panel.jsx";
import LoadingPanel from "../../components/loading-panel.jsx";
import MainFull from "../../components/main-full.jsx";
import PageHeading from "../../components/page-heading.jsx";

import {useFirmwares} from "../../data/firmware.js";

export default function Firmwares() {
  const {data, error, loading} = useFirmwares();

  return (
    <MainFull>
      {loading && <LoadingPanel>Loading...</LoadingPanel>}
      {error && <ErrorPanel>{error.message}</ErrorPanel>}
      {data && (
        <>
          <PageHeading heading="Firmwares" />
          <div className="flex flex-col w-full space-y-2">
            {data.length > 0 &&
              data.map((firmware) => {
                return (
                  <Link key={firmware.id} href={`/firmware/detail/${firmware.id}`}>
                    <div className="flex flex-col  hover:bg-primary hover:text-base-inverted border-b-2 text-base mb-1 p-2 cursor-pointer">
                      <div>
                        <span className="font-bold">
                          {firmware.name} / {firmware.version_number}
                        </span>
                      </div>
                      {firmware.description && (
                        <div>
                          <span>{firmware.description}</span>
                        </div>
                      )}
                      <div className="flex flex-row items-center space-x-2">
                        <i className="fad fa-id text-primary-dark" />
                        <span className="text-sm font-mono">{firmware.id}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            {data.length === 0 && <span className="p-2">No firmware found.</span>}
          </div>
        </>
      )}
      <div className="flex flex-row justify-end mt-2">
        <Link href="/firmware/add">
          <Button>
            <i className="fad fa-plus mr-2" />
            Add firmware
          </Button>
        </Link>
      </div>
    </MainFull>
  );
}
