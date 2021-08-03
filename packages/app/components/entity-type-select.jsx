import {useState} from "react";
import Select from "react-select";

import {supabase} from "../util/supabase-client";
import {useSelect} from "../data/use-select";

export default function EntityTypeSelect() {
  const [selected, setSelected] = useState(null);
  const {data, error} = useSelect(() => supabase.from("entity_type").select("*").neq("status", 99).order("name"));

  let options = [];
  if (!error) {
    options = data || [{name: "Loading....", id: 0}];
  } else {
    options = [{name: "Load failure", id: 0}];
  }

  return (
    <Select
      defaultValue={selected}
      onChange={setSelected}
      options={options}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
    />
  );
}
