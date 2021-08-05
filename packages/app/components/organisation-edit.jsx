import {Form, Formik} from "formik";

import Button from "./button.jsx";
import FormTextInput from "./form-text-input.jsx";

import {organisationSchema} from "../util/form-schema.js";
import {saveOrganisation} from "../data/organisation.js";
import {useSnacks} from "../util/snackbar.js";

export default function OrganisationEdit({subjectId, onClose}) {
  const [successSnack, errorSnack] = useSnacks();

  const onSave = (data) => {
    data.domain = data.domain.toLowerCase();
    saveOrganisation(data)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Organisation saved successfully.");
        onClose(response.data[0].id);
      })
      .catch((err) => {
        if (err.message.indexOf("duplicate") >= 0) {
          errorSnack(`An organisation already exists with this domain.`);
        } else {
          errorSnack(`Failed to save organisation: ${err.message}`);
        }
      });
  };

  return (
    <Formik initialValues={{}} onSubmit={onSave} validationSchema={organisationSchema}>
      {({props}) => {
        return (
          <Form className="space-y-2">
            <FormTextInput label="Organisation name" name="name" />
            <FormTextInput
              label="Organisation domain"
              name="domain"
              placeholder="This is the email domain, e.g. 'nquiringminds.com'"
            />
            <div className="flex justify-between">
              <Button type="button" secondary={true} onClick={() => onClose()}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
