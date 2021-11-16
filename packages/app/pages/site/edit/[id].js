import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import Button from "../../../components/button.jsx";
import ConnectionTypeSelect from "../../../components/connection-type-select.jsx";
import ErrorPanel from "../../../components/error-panel.jsx";
import FormTextInput from "../../../components/form-text-input.jsx";
import LoadingPanel from "../../../components/loading-panel.jsx";
import MainFull from "../../../components/main-full.jsx";
import OrganisationSelect from "../../../components/organisation-select.jsx";
import PageHeading from "../../../components/page-heading.jsx";
import SiteTypeSelect from "../../../components/site-type-select.jsx";

import {saveSite, useSite} from "../../../data/site.js";
import {siteSchema, validateSubmit} from "../../../util/form-schema.js";
import {useProfileKeys} from "../../../data/profile-key.js";
import {useSnacks} from "../../../util/snackbar.js";

export default function EditSite() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();
  const site = useSite(router.query.id);

  const handleSubmit = (data) => {
    console.log(data);
    saveSite(data)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Site saved successfully.");
        router.replace(`/site/detail/${data.id}`);
      })
      .catch((err) => {
        errorSnack(`Failed to save site: ${err.message}`);
      });
  };

  return (
    <MainFull>
      {site.error && <ErrorPanel>{site.error.message}</ErrorPanel>}
      {site.data && (
        <>
          <PageHeading heading="Edit a site" />
          <Formik initialValues={site.data[0]} onSubmit={handleSubmit} validationSchema={siteSchema}>
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
                  <Link passHref href="/site">
                    <Button type="button" secondary={true} className="mr-2">
                      Close
                    </Button>
                  </Link>
                  <div className="flex-grow" />
                  <Button type="submit">
                    <i className="fad fa-plus mr-2" /> Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </MainFull>
  );
}
