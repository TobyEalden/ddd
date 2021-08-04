import {Form, Formik} from "formik";

import Button from "./button.jsx";
import ErrorPanel from "./error-panel.jsx";
import FormDetail from "./form-detail.jsx";
import FormTextInput from "./form-text-input.jsx";
import LoadingPanel from "./loading-panel.jsx";
import PageHeading from "./page-heading.jsx";

import {profileSchema} from "../util/form-schema.js";
import {supabase} from "../util/supabase-client.js";
import {saveProfile} from "../data/profile.js";
import {useSelect} from "../data/use-select.js";
import {useSnacks} from "../util/snackbar.js";
import {useRouter} from "next/router";

export default function ProfileEdit() {
  const profileData = useSelect(() => supabase.from("profile").select().eq("user_id", supabase.auth.user().id));
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();

  const handleSave = (data) => {
    return saveProfile({...data, user_id: supabase.auth.user().id})
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Profile saved successfully");
        if (router.pathname === "/") {
          router.reload();
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        errorSnack(`Failed to save profile: ${err.message}`);
      });
  };

  if (profileData.loading) {
    return <LoadingPanel>Please complete your profile.</LoadingPanel>;
  } else if (profileData.error) {
    return <ErrorPanel>{profileData.error.message}</ErrorPanel>;
  } else {
    return (
      <Formik
        initialValues={
          profileData.data[0] || {
            ...profileSchema.getDefaultFromShape(),
            email: supabase.auth.user().email || "",
          }
        }
        validationSchema={profileSchema}
        onSubmit={handleSave}
      >
        {(props) => (
          <Form className="flex flex-col space-y-2 w-full p-2">
            <PageHeading
              heading={profileData.data.length ? "Your profile details" : "Please complete your profile data"}
            />
            <FormDetail label="Id" detail={props.values.id} pre={true} />
            <FormDetail label="User id" detail={supabase.auth.user().id} pre={true} />
            <FormTextInput label="Name" name="name" />
            <FormTextInput label="Email [optional]" name="email" />
            <FormTextInput label="Bio [optional]" name="bio" />
            <div className="flex flex-row justify-between">
              <div />
              <Button type="submit">
                <i className="fad fa-save mr-2" />
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
