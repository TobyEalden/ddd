import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import DateTimeSelect from "../../components/date-time-picker.jsx";
import DeviceTypeSelect from "../../components/device-type-select.jsx";
import ProfileKeySelect from "../../components/profile-key-select.jsx";
import Button from "../../components/button.jsx";
import ErrorPanel from "../../components/error-panel.jsx";
import FormTextInput from "../../components/form-text-input.jsx";
import LoadingPanel from "../../components/loading-panel.jsx";
import MainFull from "../../components/main-full.jsx";
import SiteSelect from "../../components/site-select.jsx";
import PageHeading from "../../components/page-heading.jsx";

import {saveDeviceInstallation} from "../../data/device-installation.js";
import {deviceInstallationSchema, validateSubmit} from "../../util/form-schema.js";
import {useProfileKeys} from "../../data/profile-key.js";
import {useSnacks} from "../../util/snackbar.js";

export default function AddDeviceInstallation() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();
  const keys = useProfileKeys();

  const handleSubmit = (data) => {
    console.log(data);
    saveDeviceInstallation(data)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Device installation saved successfully.");
        router.replace("/device-installation");
      })
      .catch((err) => {
        errorSnack(`Failed to save device installation: ${err.message}`);
      });
  };

  return (
    <MainFull>
      <PageHeading heading="Add a device installation" />
      {keys.loading && <LoadingPanel>Loading...</LoadingPanel>}
      {keys.error && <ErrorPanel>{keys.error.message}</ErrorPanel>}
      {keys.data && keys.data.length === 0 && (
        <ErrorPanel>
          You need to add a key before you can continue.{" "}
          <Link passHref href="/key/add">
            <Button className="bg-error-inverted text-error">Add Key</Button>
          </Link>
        </ErrorPanel>
      )}
      {keys.data && keys.data.length > 0 && (
        <Formik
          initialValues={{install_date: new Date(), active_date: new Date()}}
          onSubmit={handleSubmit}
          validationSchema={deviceInstallationSchema}
        >
          {(props) => (
            <Form className="flex flex-col space-y-2 w-full p-2" onSubmit={(evt) => validateSubmit(evt, props)}>
              <FormTextInput label="Serial number" name="serial_number" />
              <FormTextInput label="Description (optional)" name="serial_extra" />
              <DeviceTypeSelect label="Device type" name="device_type_id" />
              <SiteSelect label="Site" name="site_id" />
              <DateTimeSelect label="Install date" name="install_date" disableClock />
              <DateTimeSelect label="Active date" name="active_date" disableClock />
              <div className="flex flex-row justify-between">
                <Link passHref href="/device-installation">
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
