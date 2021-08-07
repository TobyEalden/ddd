import {useRouter} from "next/router";
import {supabase} from "../util/supabase-client.js";

import MainCentered from "../components/main-centred.jsx";

export default function SignOut() {
  const router = useRouter();

  if (supabase.auth.session) {
    supabase.auth.signOut();
  }

  router.push("/");

  return <MainCentered>goodbye</MainCentered>;
}
