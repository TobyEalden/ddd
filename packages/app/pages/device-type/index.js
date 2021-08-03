import Link from "next/link";
import {useSelect} from "../../data/use-select.js";
import {supabase} from "../../util/supabase-client.js";

import Button from "../../components/button.jsx";
import ErrorPanel from "../../components/error-panel.jsx";
import MainFull from "../../components/main-full.jsx";
import PageHeading from "../../components/page-heading.jsx";

export default function Devices() {
  const {data, error} = useSelect(() => supabase.from("actor").select().neq("status", 99));

  return (
    <MainFull>
      {!data && !error && <div className="bg-green-300 text-white-100 uppercase">loading</div>}
      {error && <ErrorPanel>{error.message}</ErrorPanel>}
      {data && (
        <>
          <PageHeading heading="Device types" />
          <div className="flex flex-col w-full space-y-2">
            {data.length > 0 &&
              data.map((deviceType) => {
                return (
                  <Link key={deviceType.id} href={`/device-type/detail/${deviceType.id}`}>
                    <div className="flex flex-col  hover:bg-primary hover:text-base-inverted border-b-2 text-base mb-1 p-2 cursor-pointer">
                      <div>
                        <span className="font-bold">{deviceType.name}</span>
                      </div>
                      {deviceType.description && (
                        <div>
                          <span>{deviceType.description}</span>
                        </div>
                      )}
                      <div className="flex flex-row items-center space-x-2">
                        <i className="fad fa-id text-primary-dark" />
                        <span className="text-sm font-mono">{deviceType.id}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            {data.length === 0 && <span className="py-2">No device types found.</span>}
          </div>
        </>
      )}
      <div className="flex flex-row justify-end mt-2">
        <Link href="/device-type/add">
          <Button>
            <i className="fad fa-plus mr-2" />
            Add device type
          </Button>
        </Link>
      </div>
    </MainFull>
  );
}
