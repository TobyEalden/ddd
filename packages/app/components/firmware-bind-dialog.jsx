import {Form, Formik} from "formik";

import Button from "./button.jsx";
import DeviceTypeSelect from "./device-type-select.jsx";
import Dialog from "./dialog.jsx";
import DialogTitle from "./dialog-title.jsx";
import FirmwareSelect from "./firmware-select.jsx";
import ProfileKeySelect from "./profile-key-select.jsx";

import {addFirmwareBinding} from "../data/firmware.js";
import {useProfileKeys} from "../data/profile-key.js";
import {useSnacks} from "../util/snackbar.js";
import LoadingPanel from "./loading-panel.jsx";
import ErrorPanel from "./error-panel.jsx";

export default function FirmwareBindDialog({deviceTypeId, firmwareId, ...props}) {
  const [successSnack, errorSnack] = useSnacks();
  const keys = useProfileKeys();

  const handleSubmit = (data) => {
    addFirmwareBinding(data.firmware_id, data.device_type_id, data.signed_by)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Binding added successfully");
        props.onDismiss();
      })
      .catch((err) => {
        errorSnack(`Failed to add binding: ${err.message}.`);
      });
  };

  return (
    <Dialog {...props}>
      <DialogTitle title="Firmware Binding" onClose={props.onDismiss} />
      {keys.loading && <LoadingPanel>Loading...</LoadingPanel>}
      {keys.error && <ErrorPanel>Failed to load keys: {keys.error.message}</ErrorPanel>}
      {keys.data && keys.data.length > 0 && (
        <Formik
          initialValues={{
            firmware_id: firmwareId || "",
            device_type_id: deviceTypeId || "",
            signed_by: keys.data[0].fingerprint,
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <FirmwareSelect label="Firmware" name="firmware_id" />
            <DeviceTypeSelect label="Device Type" name="device_type_id" />
            <ProfileKeySelect label="Signing key" name="signed_by" options={keys.data} />
            <div className="flex">
              <Button type="button" secondary onClick={props.onDismiss}>
                Cancel
              </Button>
              <div className="flex-grow" />
              <Button type="submit">
                <i className="fad fa-plus mr-2" />
                Add
              </Button>
            </div>
          </Form>
        </Formik>
      )}
    </Dialog>
  );
}
