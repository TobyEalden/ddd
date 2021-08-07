import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import ProfileKeySelect from "../../components/profile-key-select.jsx";
import Button from "../../components/button.jsx";
import FirmwareSelect from "../../components/firmware-select.jsx";
import ErrorPanel from "../../components/error-panel.jsx";
import FormTextInput from "../../components/form-text-input.jsx";
import LoadingPanel from "../../components/loading-panel.jsx";
import MainFull from "../../components/main-full.jsx";
import OrganisationSelect from "../../components/organisation-select.jsx";
import PageHeading from "../../components/page-heading.jsx";

import {createFirmware} from "../../data/firmware.js";
import {firmwareSchema, validateSubmit} from "../../util/form-schema.js";
import {useProfileKeys} from "../../data/profile-key.js";
import {useSnacks} from "../../util/snackbar.js";

export default function AddFirmware() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();
  const keys = useProfileKeys();

  const handleSubmit = (data) => {
    console.log(data);
    createFirmware(data)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Firmware saved successfully.");
        router.replace("/firmware");
      })
      .catch((err) => {
        errorSnack(`Failed to save firmware: ${err.message}`);
      });
  };

  return (
    <MainFull>
      <PageHeading heading="Add a firmware" />
      {keys.loading && <LoadingPanel>Loading...</LoadingPanel>}
      {keys.error && <ErrorPanel>{keys.error.message}</ErrorPanel>}
      {keys.data && keys.data.length === 0 && (
        <ErrorPanel>
          You need to add a key before you can continue.{" "}
          <Link href="/key/add">
            <Button className="bg-error-inverted text-error">Add Key</Button>
          </Link>
        </ErrorPanel>
      )}
      {keys.data && keys.data.length > 0 && (
        <Formik
          initialValues={{issuer_fingerprint: keys.data[0].fingerprint}}
          onSubmit={handleSubmit}
          validationSchema={firmwareSchema}
        >
          {(props) => (
            <Form className="flex flex-col space-y-2 w-full p-2" onSubmit={() => validateSubmit(props)}>
              <FirmwareSelect label="If this is an uprade select the base firmware:" name="parent_id" />
              <FormTextInput label="Firmware name" name="name" />
              <FormTextInput label="Description" name="description" />
              <FormTextInput label="Download URL" name="download_url" />
              <FormTextInput label="Payload number" name="payload_number" />
              <FormTextInput label="Version number" name="version_number" />
              <OrganisationSelect label="Manufacturer" name="organisation_id" editable />
              <ProfileKeySelect label="Signing key" name="issuer_fingerprint" options={keys.data} />
              <div className="flex flex-row justify-between">
                <Link href="/firmware">
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
