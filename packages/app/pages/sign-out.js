import MainCentered from "../components/main-centred";
import {supabase} from "../util/supabase-client";

export default function SignOut() {
  if (supabase.auth.session) {
    supabase.auth.signOut();
  }

  return <MainCentered>goodbye</MainCentered>;
}
