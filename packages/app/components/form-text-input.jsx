import {Field, ErrorMessage, useField} from "formik";
import Input from "./input.jsx";

export default function FormTextInput({label, ...props}) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <div className="flex flex-col">
      <label htmlFor={props.name}>{label}</label>
      <Input {...field} {...props} />
      {meta.error && <div className="text-error">{meta.error}</div>}
    </div>
  );
}
