import FormSelect from "./form-select.jsx";

export default function ClaimDefinitionDataTypeSelect(props) {
  const options = [
    {label: "text", value: "text"},
    {label: "number", value: "number"},
    {label: "email", value: "email"},
    {label: "uri", value: "uri"},
    {label: "json", value: "json"},
  ];
  return <FormSelect placeholder="Select..." options={options} {...props} />;
}
