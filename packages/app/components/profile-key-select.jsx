import FormSelect from "./form-select.jsx";

export default function ProfileKeySelect(props) {
  let options = props.options;
  return (
    <FormSelect
      placeholder="Select..."
      defaultValue={options.length === 1 ? options[0] : undefined}
      options={options}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.fingerprint}
      {...props}
    />
  );
}
