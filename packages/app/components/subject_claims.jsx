import ErrorPanel from "./error-panel.jsx";
import LoadingPanel from "./loading-panel.jsx";

import {useClaims} from "../data/claim.js";

export default function SubjectClaims({subjectId}) {
  const {data, error, loading} = useClaims(subjectId);

  if (loading) {
    return <LoadingPanel>Loading...</LoadingPanel>;
  } else if (error) {
    return <ErrorPanel>{error.message}</ErrorPanel>;
  } else {
    return data.map((claim) => {
      return <div className="p-2 m-2">{claim.name}</div>;
    });
  }
}
