import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import Button from "../../../components/button.jsx";
import FormTextInput from "../../../components/form-text-input.jsx";
import FormDetail from "../../../components/form-detail.jsx";
import MainFull from "../../../components/main-full.jsx";
import OrganisationSelect from "../../../components/organisation-select.jsx";
import PageHeading from "../../../components/page-heading.jsx";

import {deviceTypeSchema, validateSubmit} from "../../../util/form-schema.js";
import {saveDeviceType, useDeviceType} from "../../../data/device-type.js";
import {useSnacks} from "../../../util/snackbar.js";

export default function EditDeviceType() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();
  const deviceType = useDeviceType(router.query.id);

  const handleSubmit = (data) => {
    if (data.description) {
      data.description = JSON.stringify(JSON.parse(data.description), null, 2);
    }
    saveDeviceType(data)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Device type saved successfully.");
        router.replace(`/device-type/detail/${data.id}`);
      })
      .catch((err) => {
        errorSnack(`Failed to device type: ${err.message}`);
      });
  };

  return (
    <MainFull>
      {deviceType.error && <div>ERROR! {deviceType.error.message}</div>}
      {deviceType.data && (
        <>
          <PageHeading heading={`Edit device type '${deviceType.data[0].name}'`} />
          <Formik initialValues={deviceType.data[0]} validationSchema={deviceTypeSchema}>
            {(props) => (
              <Form className="flex flex-col space-y-2 w-full p-2" onSubmit={(evt) => validateSubmit(evt, props)}>
                <FormDetail label="Id" detail={props.values.id} pre={true} />
                <FormTextInput label="Device type" name="name" />
                <FormTextInput label="Model number" name="model" />
                <OrganisationSelect label="Manufacturer" name="organisation_id" />
                {/* <FormTextArea className="font-mono" label="Description" name="description" rows="5" /> */}
                <div className="flex flex-row justify-between">
                  <Link href="/device-type">
                    <Button type="button" secondary={true}>
                      Close
                    </Button>
                  </Link>
                  <Link href={`/device-type/delete/${deviceType.data[0].id}`}>
                    <Button type="button" className="ml-4" secondary={true}>
                      <i className="fad fa-trash mr-2" /> Delete
                    </Button>
                  </Link>
                  <div className="flex-grow" />
                  {props.dirty && (
                    <Button type="button" onClick={() => handleSubmit(props.values)}>
                      <i className="fad fa-save mr-2" /> Save Details
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </MainFull>
  );
}
