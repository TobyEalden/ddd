import Link from "next/link";
import Button from "../../components/button.jsx";
import MainFull from "../../components/main-full.jsx";
import {useSelect} from "../../data/use-select.js";
import {supabase} from "../../util/supabase-client.js";
import PageHeading from "../../components/page-heading.jsx";

export default function Keys() {
  const {data, error} = useSelect(() => supabase.from("actor_key").select().neq("status", 99));

  return (
    <MainFull>
      {!data && !error && <div className="bg-green-300 text-white-100 uppercase">loading</div>}
      {error && <div className="bg-red-400 text-white-100">{error.message}</div>}
      {data && (
        <>
          <PageHeading heading="Your keys" />
          <div className="flex flex-col w-full space-y-2">
            {data.length > 0 &&
              data.map((key) => {
                return (
                  <Link key={key.fingerprint} href={`/key/detail/${key.fingerprint}`}>
                    <div className="flex flex-col  hover:bg-primary hover:text-base-inverted border-b-2 text-base mb-1 p-2 cursor-pointer">
                      <div>
                        <span className="font-bold">{key.name}</span>
                      </div>
                      {key.description && (
                        <div>
                          <span>{key.description}</span>
                        </div>
                      )}
                      <div className="flex flex-row items-center space-x-2">
                        <i className="fad fa-fingerprint text-primary-dark" />
                        <span className="text-sm font-mono">{key.fingerprint}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            {data.length === 0 && <span className="py-2">No keys found.</span>}
          </div>
        </>
      )}
      <div className="flex flex-row justify-end mt-2">
        <Link href="/key/add">
          <Button>
            <i className="fad fa-plus mr-2" />
            Add key
          </Button>
        </Link>
      </div>
    </MainFull>
  );
}
