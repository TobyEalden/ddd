import ErrorPanel from "./error-panel.jsx";
import FormSelect from "./form-select.jsx";
import LoadingPanel from "./loading-panel.jsx";

import {useSubscribeDeviceTypes} from "../data/device-type";

export default function DeviceTypeSelect(props) {
  const {data, error, loading} = useSubscribeDeviceTypes();

  let content;

  if (loading) {
    content = <LoadingPanel>Loading</LoadingPanel>;
  } else if (error) {
    content = <ErrorPanel>{error.message}</ErrorPanel>;
  } else {
    const options = data || [];
    content = (
      <FormSelect
        placeholder="Select..."
        options={options}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        {...props}
      />
    );
  }

  return content;
}
