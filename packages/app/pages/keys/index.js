import Link from "next/link";
import Button from "../../components/button.jsx";
import MainFull from "../../components/main-full.jsx";
import {useSelect} from "../../data/use-select.js";
import {supabase} from "../../util/supabase-client.js";

export default function Keys() {
  const keyData = useSelect(() => supabase.from("entity_key").select());

  return (
    <MainFull>
      {!keyData.data && !keyData.error && <div className="bg-green-300 text-white-100 uppercase">loading</div>}
      {keyData.error && <div className="bg-red-400 text-white-100">{keyData.error.message}</div>}
      {keyData.data && keyData.data.length && (
        <div className="flex flex-col w-full space-y-2">
          {keyData.data.map((row) => {
            return (
              <Link key={row.fingerprint} href={`/keys/detail/${row.fingerprint}`}>
                <div className="flex flex-col  hover:bg-primary hover:text-base-inverted border-b-2 text-base mb-1 p-2 cursor-pointer">
                  <div>
                    <span className="font-bold text-lg">{row.name}</span>
                  </div>
                  {row.description && (
                    <div>
                      <span>{row.description}</span>
                    </div>
                  )}
                  <div className="flex flex-row items-center space-x-2">
                    <i className="fad fa-fingerprint text-primary-dark" />
                    <span className="text-sm font-mono">{row.fingerprint}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <div className="flex flex-row justify-end mt-2">
        <Link href="/keys/add">
          <Button>Add key</Button>
        </Link>
      </div>
    </MainFull>
  );
}
