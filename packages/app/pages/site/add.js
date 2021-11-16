import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";
import {supabase} from "../../util/supabase-client.js";

import Button from "../../components/button.jsx";
import ConnectionTypeSelect from "../../components/connection-type-select.jsx";
import ErrorPanel from "../../components/error-panel.jsx";
import FormTextInput from "../../components/form-text-input.jsx";
import LoadingPanel from "../../components/loading-panel.jsx";
import MainFull from "../../components/main-full.jsx";
import OrganisationSelect from "../../components/organisation-select.jsx";
import PageHeading from "../../components/page-heading.jsx";
import ProfileKeySelect from "../../components/profile-key-select.jsx";
import SiteTypeSelect from "../../components/site-type-select.jsx";

import {saveSite} from "../../data/site.js";
import {siteSchema, validateSubmit} from "../../util/form-schema.js";
import {useProfileKeys} from "../../data/profile-key.js";
import {useSnacks} from "../../util/snackbar.js";

export default function AddSite() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();
  const keys = useProfileKeys();

  const handleSubmit = (data) => {
    console.log(data);
    saveSite({owner_id: supabase.auth.user().id, ...data})
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Site saved successfully.");
        router.replace("/site");
      })
      .catch((err) => {
        errorSnack(`Failed to save site: ${err.message}`);
      });
  };

  return (
    <MainFull>
      <PageHeading heading="Add a site" />
      {keys.loading && <LoadingPanel>Loading...</LoadingPanel>}
      {keys.error && <ErrorPanel>{keys.error.message}</ErrorPanel>}
      {keys.data && keys.data.length === 0 && (
        <ErrorPanel>
          You need to add a key before you can continue.
          <Link href="/key/add">
            <Button className="bg-error-inverted text-error">Add Key</Button>
          </Link>
        </ErrorPanel>
      )}
      {keys.data && keys.data.length > 0 && (
        <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={siteSchema}>
          {(props) => (
            <Form className="flex flex-col space-y-2 w-full p-2" onSubmit={(evt) => validateSubmit(evt, props)}>
              <FormTextInput
                label="Site name"
                name="name"
                placeholder="Enter friendly name for the site, e.g. Southampton office"
              />
              <FormTextInput label="Description (optional)" name="description" />
              <SiteTypeSelect label="Site type" name="site_type_id" />
              <ConnectionTypeSelect label="Connection type" name="connection_type_id" />
              <OrganisationSelect label="Organisation" name="organisation_id" editable />
              <FormTextInput label="Internal subnet (optional)" name="subnet" />
              <FormTextInput label="External IP (optional)" name="ip" />
              <FormTextInput label="Location" name="location" placeholder="Enter the postcode for the site" />
              <div className="flex flex-row justify-between">
                <Link href="/site">
                  <Button type="button" secondary={true} className="mr-2">
                    Close
                  </Button>
                </Link>
                <div className="flex-grow" />
                <Button type="submit">
                  <i className="fad fa-plus mr-2" /> Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </MainFull>
  );
}
