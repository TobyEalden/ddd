import {useState} from "react";
import FormSelect from "./form-select.jsx";

import {supabase} from "../util/supabase-client";
import {useSelect} from "../data/use-select";

export default function ActorTypeSelect(props) {
  const [selected, setSelected] = useState(null);
  const {data, error} = useSelect(() => supabase.from("actor_type").select("*").neq("status", 99).order("name"));

  let options = [];
  if (!error) {
    options = data || [{name: "Loading....", id: 0}];
  } else {
    options = [{name: "Load failure", id: 0}];
  }

  return (
    <FormSelect
      defaultValue={selected}
      onChange={setSelected}
      options={options}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
      {...props}
    />
  );
}
