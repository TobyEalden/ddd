import {useState} from "react";

import FormSelect from "./form-select.jsx";
import LoadingPanel from "./loading-panel.jsx";

import {useSubscribeSites} from "../data/site.js";

export default function SiteSelect({editable, ...props}) {
  const {data, error, loading} = useSubscribeSites();

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
          getOptionLabel={(option) => `${option.name}${option.description ? ` / ${option.description}` : ""}`}
          getOptionValue={(option) => option.id}
          {...props}
        />
      </>
    );
  }

  return content;
}
