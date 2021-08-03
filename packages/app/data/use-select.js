import {useEffect, useState} from "react";

export function useSelect(select) {
  const [response, setResponse] = useState({loading: true});

  useEffect(() => {
    console.log("running select");
    return select()
      .then((response) => {
        setResponse(response);
      })
      .catch((err) => {
        setResponse({error: err});
      });
  }, []);

  return response;
}
