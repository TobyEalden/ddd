import {useField} from "formik";
import Input from "./input.jsx";

export default function FormTextInput({label, ...props}) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={props.name}>{label}</label>
      <Input {...field} {...props} value={field.value || ""} />
      {meta.error && <div className="text-error">{meta.error}</div>}
    </div>
  );
}
