import {Form, Formik} from "formik";
import {saveClaimDefinition} from "../data/claim.js";
import {useSnacks} from "../util/snackbar.js";

import Button from "./button.jsx";
import ClaimDefinitionDataTypeSelect from "./claim-definition-data-type-select.jsx";
import FormTextInput from "./form-text-input.jsx";

export default function EditClaimDefinition({subjectId, onClose}) {
  const [successSnack, errorSnack] = useSnacks();

  const onSave = (data) => {
    saveClaimDefinition(data)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Definition saved successfully.");
        onClose();
      })
      .catch((err) => {
        errorSnack(`Failed to save definition: ${err.message}`);
      });
  };

  return (
    <Formik initialValues={{}} onSubmit={onSave}>
      {({props}) => {
        return (
          <Form className="space-y-2">
            <FormTextInput label="Definition name" name="name" />
            <ClaimDefinitionDataTypeSelect label="Definition data type" name="data_type" />
            <FormTextInput label="Description" name="description" />
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
