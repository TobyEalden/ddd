import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import ActorKeySelect from "../../components/actor-key-select.jsx";
import Button from "../../components/button.jsx";
import FormTextInput from "../../components/form-text-input.jsx";
import MainFull from "../../components/main-full.jsx";
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
      {keys.loading && <div className="p-2 m-2 bg-error text-error-inverted">Loading...</div>}
      {!keys.loading && (
        <Formik
          initialValues={{issuer_fingerprint: keys.data[0].fingerprint}}
          onSubmit={handleSubmit}
          validationSchema={deviceTypeSchema}
        >
          {(props) => (
            <Form className="flex flex-col space-y-2 w-full p-2">
              <FormTextInput label="Device type name" name="name" />
              <FormTextInput label="Description" name="description" />
              <ActorKeySelect label="Signing key" name="issuer_fingerprint" options={keys.data} />
              <div className="flex flex-row justify-between">
                <Link href="/key">
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
