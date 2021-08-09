import {useEffect, useState} from "react";

export function useSelect(selector, deps) {
  const [response, setResponse] = useState({loading: true});

  useEffect(() => {
    console.log("running select");
    setResponse({loading: true});
    return selector(...deps)
      .then((response) => {
        setResponse(response);
      })
      .catch((err) => {
        setResponse({error: err});
      });
  }, [selector, ...deps]);

  return response;
}
