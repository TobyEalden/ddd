import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import Button from "../../../components/button.jsx";
import FormTextInput from "../../../components/form-text-input.jsx";
import FormDetail from "../../../components/form-detail.jsx";
import MainFull from "../../../components/main-full.jsx";
import OrganisationSelect from "../../../components/organisation-select.jsx";
import PageHeading from "../../../components/page-heading.jsx";

import {firmwareSchema, validateSubmit} from "../../../util/form-schema.js";
import {saveFirmware, useFirmware} from "../../../data/firmware.js";
import {useSnacks} from "../../../util/snackbar.js";

export default function EditFirmware() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();
  const firmware = useFirmware(router.query.id);

  const handleSubmit = (data) => {
    if (data.description) {
      data.description = JSON.stringify(JSON.parse(data.description), null, 2);
    }
    saveFirmware(data)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Firmware saved successfully.");
        router.replace(`/firmware/detail/${data.id}`);
      })
      .catch((err) => {
        errorSnack(`Failed to firmware: ${err.message}`);
      });
  };

  return (
    <MainFull>
      {firmware.error && <div>ERROR! {firmware.error.message}</div>}
      {firmware.data && (
        <>
          <PageHeading heading={`Edit firmware '${firmware.data[0].name}'`} />
          <Formik initialValues={firmware.data[0]} validationSchema={firmwareSchema}>
            {(props) => (
              <Form className="flex flex-col space-y-2 w-full p-2" onSubmit={() => validateSubmit(props)}>
                <FormDetail label="Id" detail={props.values.id} pre={true} />
                <FormTextInput label="Firmware name" name="name" />
                <FormTextInput label="Description" name="description" />
                <FormTextInput label="Download URL" name="download_url" />
                <FormTextInput label="Payload number" name="payload_number" />
                <FormTextInput label="Version number" name="version_number" />
                <OrganisationSelect label="Manufacturer" name="organisation_id" editable />
                <div className="flex flex-row justify-between">
                  <Link href="/firmware">
                    <Button type="button" secondary={true}>
                      Close
                    </Button>
                  </Link>
                  <Link href={`/firmware/delete/${firmware.data[0].id}`}>
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
