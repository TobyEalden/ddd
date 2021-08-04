import {useState} from "react";

import Dialog from "./dialog.jsx";
import DialogTitle from "./dialog-title.jsx";
import EditClaim from "./edit-claim.jsx";

export default function Claim({claim, editable}) {
  const [editClaim, setEditClaim] = useState(false);

  const handleEditClaimToggle = () => {
    setEditClaim(!editClaim);
  };

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
        <div className="hover:bg-primary hover:text-primary-inverted p-2 text-primary-dark rounded cursor-pointer">
          <i className="fad fa-trash" />
        </div>
      </>
    );
  }

  return (
    <div className="p-2 m-1 flex flex-row space-x-2 justify-between items-center">
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
}
