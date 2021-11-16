import Link from "next/link";

import Button from "../../components/button.jsx";
import ErrorPanel from "../../components/error-panel.jsx";
import LoadingPanel from "../../components/loading-panel.jsx";
import MainFull from "../../components/main-full.jsx";
import PageHeading from "../../components/page-heading.jsx";

import {useDeviceInstallations} from "../../data/device-installation.js";

export default function DeviceInstallations() {
  const {data, error, loading} = useDeviceInstallations();

  return (
    <MainFull>
      {loading && <LoadingPanel>Loading...</LoadingPanel>}
      {error && <ErrorPanel>{error.message}</ErrorPanel>}
      {data && (
        <>
          <PageHeading heading="Device Installations" />
          <div className="flex flex-col w-full space-y-2">
            {data.length > 0 &&
              data.map((installation) => {
                return (
                  <Link key={installation.id} href={`/device-installation/detail/${installation.id}`}>
                    <div className="flex flex-col  hover:bg-primary hover:text-base-inverted border-b-2 text-base mb-1 p-2 cursor-pointer">
                      <div>
                        <span className="font-bold">
                          {installation.serial_number} / {installation.site.name}
                        </span>
                      </div>
                      {installation.description && (
                        <div>
                          <span>{installation.description}</span>
                        </div>
                      )}
                      <div className="flex flex-row items-center space-x-2">
                        <i className="fad fa-id-badge text-primary-dark" />
                        <span className="text-sm font-mono">{installation.id}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            {data.length === 0 && <span className="p-2">No device installations found.</span>}
          </div>
        </>
      )}
      <div className="flex flex-row justify-end mt-2">
        <Link href="/device-installation/add">
          <Button>
            <i className="fad fa-plus mr-2" />
            Add device installation
          </Button>
        </Link>
      </div>
    </MainFull>
  );
}
