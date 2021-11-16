import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import Button from "../../../components/button.jsx";
import DateTimeSelect from "../../../components/date-time-picker.jsx";
import DeviceTypeSelect from "../../../components/device-type-select.jsx";
import ErrorPanel from "../../../components/error-panel.jsx";
import FormTextInput from "../../../components/form-text-input.jsx";
import FormDetail from "../../../components/form-detail.jsx";
import MainFull from "../../../components/main-full.jsx";
import SiteSelect from "../../../components/site-select.jsx";
import PageHeading from "../../../components/page-heading.jsx";

import {deviceInstallationSchema, validateSubmit} from "../../../util/form-schema.js";
import {saveDeviceInstallation, useDeviceInstallation} from "../../../data/device-installation.js";
import {useSnacks} from "../../../util/snackbar.js";

export default function EditDeviceInstallation() {
  const [successSnack, errorSnack] = useSnacks();
  const router = useRouter();
  const deviceInstallation = useDeviceInstallation(router.query.id);

  const handleSubmit = (data) => {
    saveDeviceInstallation(data)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Device installation saved successfully.");
        router.replace(`/device-installation/detail/${data.id}`);
      })
      .catch((err) => {
        errorSnack(`Failed to save device installation: ${err.message}`);
      });
  };

  return (
    <MainFull>
      {deviceInstallation.error && <ErrorPanel>{deviceInstallation.error.message}</ErrorPanel>}
      {deviceInstallation.data && (
        <>
          <PageHeading heading={`Edit device installation '${deviceInstallation.data[0].serial_number}'`} />
          <Formik initialValues={deviceInstallation.data[0]} validationSchema={deviceInstallationSchema}>
            {(props) => (
              <Form className="flex flex-col space-y-2 w-full p-2" onSubmit={(evt) => validateSubmit(evt, props)}>
                <FormDetail label="Id" detail={props.values.id} pre={true} />
                <FormTextInput label="Serial number" name="serial_number" />
                <FormTextInput label="Description (optional)" name="serial_extra" />
                <DeviceTypeSelect label="Device type" name="device_type_id" />
                <SiteSelect label="Site" name="site_id" />
                <DateTimeSelect label="Install date" name="install_date" disableClock />
                <DateTimeSelect label="Active date" name="active_date" disableClock />
                <div className="flex flex-row justify-between">
                  <Link href="/device-installation">
                    <Button type="button" secondary={true}>
                      Close
                    </Button>
                  </Link>
                  <Link href={`/device-installation/delete/${deviceInstallation.data[0].id}`}>
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
