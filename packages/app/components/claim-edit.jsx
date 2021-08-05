import {Form, Formik} from "formik";
import {useState} from "react";

import Button from "./button.jsx";
import ClaimDefinitionSelect from "./claim-definition-select.jsx";
import DialogTitle from "./dialog-title.jsx";
import Dialog from "./dialog.jsx";
import ClaimDefinitionEdit from "./claim-definition-edit.jsx";
import FormTextInput from "./form-text-input.jsx";

import {useSnacks} from "../util/snackbar.js";
import {saveClaim} from "../data/claim.js";
import FormTextArea from "./form-text-area.jsx";

export default function ClaimEdit({claim, onClose}) {
  const [addDefinition, setAddDefinition] = useState(false);
  const [selectedDefinition, setSelectedDefinition] = useState(claim.claim_definition || null);
  const [successSnack, errorSnack] = useSnacks();
  const {subject_id, issuer_id} = claim;

  const handleAddDefinitionToggle = () => {
    setAddDefinition(!addDefinition);
  };

  const handleSubmit = (formData) => {
    const data = {...formData, subject_id, issuer_id};

    if (selectedDefinition.data_type === "number") {
      data.number_value = formData.value;
    } else {
      data.text_value = formData.value;
    }
    delete data.value;
    delete data.claim_definition;

    saveClaim(data)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        successSnack("Claim saved successfully.");
        onClose();
      })
      .catch((err) => {
        errorSnack(`Failed to save claim: ${err.message}`);
      });
  };

  const getInitialValue = () => {
    if (selectedDefinition) {
      if (selectedDefinition.data_type === "number") {
        return claim.number_value || 0;
      } else {
        return claim.text_value || "";
      }
    } else {
      return "";
    }
  };

  return (
    <Formik initialValues={{...claim, value: getInitialValue()}} onSubmit={handleSubmit}>
      {(props) => {
        return (
          <Form>
            <ClaimDefinitionSelect
              autoFocus
              label="Select claim definition"
              name="definition_id"
              reloadTrigger={addDefinition}
              onChange={(def) => setSelectedDefinition(def)}
            />
            <Button type="button" className="w-min" onClick={handleAddDefinitionToggle}>
              {addDefinition ? "Cancel" : <span>Add&nbsp;Definition</span>}
            </Button>
            {props.values.definition_id && (
              <FormTextArea autoFocus label={`Claim value [${selectedDefinition.data_type}]`} name="value" rows={4} />
            )}
            <Dialog isOpen={addDefinition} onDismiss={handleAddDefinitionToggle}>
              <DialogTitle title="Edit claim definition" onClose={handleAddDefinitionToggle} />
              <ClaimDefinitionEdit subjectId={subject_id} onClose={handleAddDefinitionToggle} />
            </Dialog>
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
