import MainCentered from "../components/main-centred.jsx";
import {supabase} from "../util/supabase-client.js";

export default function Home() {
  return <MainCentered>{supabase.auth.user().id}</MainCentered>;
}

// export async function getServerSideProps(context) {}
