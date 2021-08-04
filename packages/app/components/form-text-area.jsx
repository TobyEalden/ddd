import {useField} from "formik";
import TextArea from "./text-area.jsx";

export default function FormTextArea({label, ...props}) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <div className="flex flex-col">
      <label htmlFor={props.name}>{label}</label>
      <TextArea {...field} {...props}>
        {field.value || ""}
      </TextArea>
      {meta.error && <div className="text-error">{meta.error}</div>}
    </div>
  );
}
