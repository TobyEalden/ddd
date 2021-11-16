import {useState} from "react";

import ErrorPanel from "./error-panel.jsx";
import FormSelect from "./form-select.jsx";
import LoadingPanel from "./loading-panel.jsx";

import {useSubscribeSiteTypes} from "../data/site-type.js";

export default function SiteTypeSelect({editable, ...props}) {
  const {data, error, loading} = useSubscribeSiteTypes();

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
