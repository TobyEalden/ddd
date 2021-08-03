import {useEffect, useState} from "react";
import Head from "next/head";
import {supabase} from "../util/supabase-client.js";
import SignIn from "./sign-in.jsx";
import MainFrame from "./main-frame.jsx";

export default function Layout({children}) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/fontawesome/css/all.min.css" />
      </Head>
      {session && <MainFrame session={session}>{children}</MainFrame>}
      {!session && (
        <div className="h-screen flex flex-row">
          <SignIn />
        </div>
      )}
    </>
  );
}
