import {useState} from "react";
import {useField} from "formik";

import Button from "./button.jsx";
import Dialog from "./dialog.jsx";
import DialogTitle from "./dialog-title.jsx";
import ErrorPanel from "./error-panel.jsx";
import FormSelect from "./form-select.jsx";
import LoadingPanel from "./loading-panel.jsx";
import OrganisationEdit from "./organisation-edit.jsx";

import {useSubscribeOrganisations} from "../data/organisation.js";

export default function OrganisationSelect({editable, ...props}) {
  const {data, error, loading} = useSubscribeOrganisations();
  const [addOrganisation, setAddOrganisation] = useState(false);
  const [field, meta, helpers] = useField(props.name);

  const handleAddOrganisationToggle = () => {
    setAddOrganisation(!addOrganisation);
  };

  const handeEditClosed = (id) => {
    if (id) {
      helpers.setValue(id);
    }
    handleAddOrganisationToggle();
  };

  let content;

  if (loading) {
    content = <LoadingPanel>Loading</LoadingPanel>;
  } else if (error) {
    content = <ErrorPanel>{error.message}</ErrorPanel>;
  } else {
    const options = data || [];
    content = (
      <>
        <FormSelect
          placeholder="Select..."
          options={options}
          getOptionLabel={(option) => `${option.name} / ${option.domain}`}
          getOptionValue={(option) => option.id}
          {...props}
        />
        {editable && (
          <>
            <div className="flex justify-end">
              <Button type="button" secondary className="w-min" onClick={handleAddOrganisationToggle}>
                Add&nbsp;Organisation
              </Button>
            </div>
            <Dialog isOpen={addOrganisation} onDismiss={handleAddOrganisationToggle}>
              <DialogTitle title="New organisation" onClose={handleAddOrganisationToggle} />
              <OrganisationEdit onClose={handeEditClosed} />
            </Dialog>{" "}
          </>
        )}
      </>
    );
  }

  return content;
}
