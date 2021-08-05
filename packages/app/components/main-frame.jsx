import ErrorPanel from "./error-panel.jsx";
import LoadingPanel from "./loading-panel.jsx";
import ProfileEdit from "./profile-edit.jsx";
import Sidebar from "./sidebar.jsx";
import TitleBar from "./titlebar.jsx";

import {supabase} from "../util/supabase-client.js";
import {useSelect} from "../data/use-select.js";

export default function MainFrame({children, session}) {
  const authDevice = useSelect(() => supabase.from("profile").select().eq("user_id", supabase.auth.user().id));

  if (authDevice.loading) {
    return <LoadingPanel>Loading profile...</LoadingPanel>;
  } else if (authDevice.error) {
    return <ErrorPanel>Failure loading profile: {authDevice.error.message}</ErrorPanel>;
  } else if (!authDevice.data || authDevice.data.length !== 1) {
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
