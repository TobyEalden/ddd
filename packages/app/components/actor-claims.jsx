import {useActorWithClaims} from "../data/actor.js";
import Claim from "./claim.jsx";
import ErrorPanel from "./error-panel.jsx";
import LoadingPanel from "./loading-panel.jsx";

export default function ActorClaims({actorId, actorType, editable}) {
  const {data, error, loading} = useActorWithClaims(actorType, actorId);

  return (
    <div className="p-2">
      {loading && <LoadingPanel>Loading</LoadingPanel>}
      {!loading && !!error && <ErrorPanel>{error.message}</ErrorPanel>}
      {!loading &&
        !!data &&
        data[0].claim.map((claim) => {
          return <Claim claim={claim} editable />;
        })}
    </div>
  );
}
