import {useEffect, useState} from "react";

export function useSelect(selector, reloadTrigger) {
  const [response, setResponse] = useState({loading: true});

  useEffect(() => {
    console.log("running select");
    return selector()
      .then((response) => {
        setResponse(response);
      })
      .catch((err) => {
        setResponse({error: err});
      });
  }, [reloadTrigger]);

  return response;
}
