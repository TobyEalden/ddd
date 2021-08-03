import Link from "next/link";
import {useSelect} from "../../data/use-select.js";
import {supabase} from "../../util/supabase-client.js";

import Button from "../../components/button.jsx";
import ErrorPanel from "../../components/error_panel.jsx";
import MainFull from "../../components/main-full.jsx";
import PageHeading from "../../components/page-heading.jsx";

export default function Devices() {
  const {data, error} = useSelect(() => supabase.from("device").select().neq("status", 99));

  return (
    <MainFull>
      {!data && !error && <div className="bg-green-300 text-white-100 uppercase">loading</div>}
      {error && <ErrorPanel>{error.message}</ErrorPanel>}
      {data && (
        <>
          <PageHeading heading="Devices" />
          <div className="flex flex-col w-full space-y-2">
            {data.length > 0 &&
              data.map((device) => {
                return (
                  <Link key={device.fingerprint} href={`/device/detail/${device.fingerprint}`}>
                    <div className="flex flex-col  hover:bg-primary hover:text-base-inverted border-b-2 text-base mb-1 p-2 cursor-pointer">
                      <div>
                        <span className="font-bold">{device.name}</span>
                      </div>
                      {device.description && (
                        <div>
                          <span>{device.description}</span>
                        </div>
                      )}
                      <div className="flex flex-row items-center space-x-2">
                        <i className="fad fa-fingerprint text-primary-dark" />
                        <span className="text-sm font-mono">{device.fingerprint}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            {data.length === 0 && <span className="py-2">No devices found.</span>}
          </div>
        </>
      )}
      <div className="flex flex-row justify-end mt-2">
        <Link href="/device/add">
          <Button>
            <i className="fad fa-plus mr-2" />
            Add device
          </Button>
        </Link>
      </div>
    </MainFull>
  );
}
