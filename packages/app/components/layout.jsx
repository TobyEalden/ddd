import {useEffect, useState} from "react";
import TitleBar from "./titlebar.jsx";
import Head from "next/head";
import Sidebar from "./sidebar.jsx";
import {supabase} from "../util/supabase-client.js";
import SignIn from "./sign-in.jsx";

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
      {session && (
        <div className="flex flex-col h-screen">
          <TitleBar session={session} />
          <div className="flex flex-row flex-grow h-full">
            <Sidebar session={session} />
            {children}
          </div>
        </div>
      )}
      {!session && (
        <div className="h-screen flex flex-row">
          <SignIn />
        </div>
      )}
    </>
  );
}
