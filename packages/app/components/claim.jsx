import {useState} from "react";

import Dialog from "./dialog.jsx";
import DialogTitle from "./dialog-title.jsx";
import EditClaim from "./edit-claim.jsx";
import {deleteClaim} from "../data/claim.js";
import {useSnacks} from "../util/snackbar.js";
import Button from "./button.jsx";

export default function Claim({claim, editable}) {
  const [editClaim, setEditClaim] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [successSnack, errorSnack] = useSnacks();

  const handleEditClaimToggle = () => {
    setEditClaim(!editClaim);
  };

  const handleClaimDelete = () => {
    deleteClaim(claim.id)
      .then((response) => {
        if (response.error) {
          throw error;
        }
        successSnack("Claim deleted");
        setConfirmDelete(false);
      })
      .catch((err) => {
        errorSnack(`Failed to delete claim: ${err.message}`);
      });
  };

  if (!confirmDelete) {
    let value;
    if (claim.claim_definition.data_type === "number") {
      value = claim.number_value;
    } else {
      value = claim.text_value;
    }

    let editOptions;
    if (editable) {
      editOptions = (
        <>
          <div
            className="hover:bg-primary hover:text-primary-inverted p-2 text-primary-dark rounded cursor-pointer"
            onClick={handleEditClaimToggle}
          >
            <i className="fad fa-edit" />
          </div>
          <div
            className="hover:bg-primary hover:text-primary-inverted p-2 text-primary-dark rounded cursor-pointer"
            onClick={() => setConfirmDelete(true)}
          >
            <i className="fad fa-trash" />
          </div>
        </>
      );
    }

    return (
      <div className="flex flex-row space-x-2 justify-between items-center">
        <div className="flex-grow">
          <span className="font-bold">{claim.claim_definition.name}</span> [{claim.claim_definition.data_type}]
          <div className="">{value}</div>
        </div>
        {editOptions}
        <Dialog isOpen={editClaim} onDismiss={handleEditClaimToggle}>
          <DialogTitle title="Edit claim" onClose={handleEditClaimToggle} />
          <EditClaim claim={claim} onClose={handleEditClaimToggle} />
        </Dialog>
      </div>
    );
  } else {
    return (
      <div className="p-2 mt-2 mb-2 flex flex-row justify-between items-center bg-warning text-warning-inverted rounded">
        <span className="flex-grow">Are you sure you want to delete this claim?</span>
        <Button type="button" className="mr-2 bg-warning-inverted text-warning" onClick={handleClaimDelete}>
          Delete
        </Button>
        <Button type="button" className="mr-2 bg-warning-inverted text-warning" onClick={() => setConfirmDelete(false)}>
          Cancel
        </Button>
      </div>
    );
  }
}
