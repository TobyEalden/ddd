import ErrorPanel from "./error-panel.jsx";
import LoadingPanel from "./loading-panel.jsx";
import ProfileEdit from "./profile-edit.jsx";
import Sidebar from "./sidebar.jsx";
import TitleBar from "./titlebar.jsx";

import {supabase} from "../util/supabase-client.js";
import {useSelect} from "../data/use-select.js";

export default function MainFrame({children, session}) {
  const authActor = useSelect(() => supabase.from("profile").select().eq("user_id", supabase.auth.user().id));

  if (authActor.loading) {
    return <LoadingPanel>Loading profile...</LoadingPanel>;
  } else if (authActor.error) {
    return <ErrorPanel>Failure loading profile: {authActor.error.message}</ErrorPanel>;
  } else if (!authActor.data || authActor.data.length !== 1) {
    return <ProfileEdit />;
  } else {
    return (
      <div className="flex flex-col h-screen">
        <TitleBar session={session} />
        <div className="flex flex-row flex-grow h-full">
          <Sidebar session={session} />
          {children}
        </div>
      </div>
    );
  }
}
