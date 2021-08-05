import {useState} from "react";

import Button from "./button.jsx";
import Claim from "./claim.jsx";
import Dialog from "./dialog.jsx";
import DialogTitle from "./dialog-title.jsx";
import ClaimEdit from "./claim-edit.jsx";
import ErrorPanel from "./error-panel.jsx";
import InfoPanel from "./info-panel.jsx";
import LoadingPanel from "./loading-panel.jsx";

import {useSubscribeActorWithClaims} from "../data/actor.js";
import {supabase} from "../util/supabase-client.js";

export default function ActorClaims({actorId, actorType, className, editable}) {
  const {data, error} = useSubscribeActorWithClaims(actorType, actorId);
  const [addClaim, setAddClaim] = useState(false);

  const handleAddClaimToggle = () => {
    setAddClaim(!addClaim);
  };

  if (!data && !error) {
    return <LoadingPanel>Loading</LoadingPanel>;
  } else if (error) {
    return <ErrorPanel>{error.message}</ErrorPanel>;
  } else {
    const claims = data.length > 0 ? data[0].claim : [];

    return (
      <div className={className}>
        {editable && claims.length > 0 && (
          <Button type="button" className="w-min" onClick={handleAddClaimToggle}>
            Add&nbsp;Claim
          </Button>
        )}

        {claims.map((claim) => {
          return <Claim claim={claim} editable={editable} />;
        })}

        {claims.length === 0 && <InfoPanel>No claims.</InfoPanel>}

        {editable && (
          <>
            <Button type="button" className="w-min" onClick={handleAddClaimToggle}>
              Add&nbsp;Claim
            </Button>

            <Dialog isOpen={addClaim} onDismiss={handleAddClaimToggle}>
              <DialogTitle title="New claim" onClose={handleAddClaimToggle} />
              <ClaimEdit
                claim={{subject_id: actorId, issuer_id: supabase.auth.user().id}}
                onClose={handleAddClaimToggle}
              />
            </Dialog>
          </>
        )}
      </div>
    );
  }
}
