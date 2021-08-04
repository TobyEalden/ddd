import ErrorPanel from "./error-panel.jsx";
import FormSelect from "./form-select.jsx";

import {supabase} from "../util/supabase-client";
import {useSelect} from "../data/use-select";

export default function ActorKeySelect(props) {
  // Don't reload actor keys if `options` has been passed in props.
  const selector = props.options
    ? () => Promise.resolve({data: props.options})
    : () => supabase.from("actor_key").select("*").neq("status", 99).order("name");
  const {data, error, loading} = useSelect(selector);

  let content;

  let options = [];
  if (!error) {
    options = data || [];
  } else {
    options = [{name: "Load failure", id: 0}];
  }

  if (loading) {
    content = <div className="p-2 m-2">Loading...</div>;
  } else if (!error) {
    content = (
      <FormSelect
        placeholder="Select..."
        defaultValue={options.length === 1 ? options[0] : undefined}
        options={options}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.fingerprint}
        {...props}
      />
    );
  } else {
    content = <ErrorPanel>{error.message}</ErrorPanel>;
  }

  return content;
}
