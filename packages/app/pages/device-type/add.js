import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import ActorKeySelect from "../../components/actor-key-select.jsx";
import Button from "../../components/button.jsx";
import DeviceTypeSelect from "../../components/device-type-select.jsx";
import ErrorPanel from "../../components/error-panel.jsx";
import FormTextInput from "../../components/form-text-input.jsx";
import LoadingPanel from "../../components/loading-panel.jsx";
import MainFull from "../../components/main-full.jsx";
import OrganisationSelect from "../../components/organisation-select.jsx";
import PageHeading from "../../components/page-heading.jsx";

import {createDeviceType} from "../../data/actor.js";
import {deviceTypeSchema} from "../../util/form-schema.js";
import {useActorKeys} from "../../data/actor_key.js";
import {useSnacks} from "../../util/snackbar.js";

export default function AddDeviceType() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();
  const keys = useActorKeys();

  const handleSubmit = (data) => {
    console.log(data);
    createDeviceType(data)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Device type saved successfully.");
        router.replace("/device-type");
      })
      .catch((err) => {
        errorSnack(`Failed to save device type: ${err.message}`);
      });
  };

  return (
    <MainFull>
      <PageHeading heading="Add a device type" />
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
          validationSchema={deviceTypeSchema}
        >
          {(props) => (
            <Form className="flex flex-col space-y-2 w-full p-2">
              <DeviceTypeSelect label="Inherit from" name="parent_id" />
              <FormTextInput label="Device type name" name="name" />
              <FormTextInput label="Description" name="description" />
              <FormTextInput label="Model number" name="model" />
              <OrganisationSelect label="Manufacturer" name="organisation_id" editable />
              <ActorKeySelect label="Signing key" name="issuer_fingerprint" options={keys.data} />
              <div className="flex flex-row justify-between">
                <Link href="/device-type">
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
