import {useField} from "formik";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";

export default function DateTimeSelect({label, ...props}) {
  const {name} = props;
  const [field, meta, helpers] = useField(name);

  const setValue = (value) => {
    helpers.setValue(value);
    if (props.onChange) {
      props.onChange(opt);
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={props.name}>{label}</label>
      <DateTimePicker
        className="border-primary border-2 rounded"
        {...props}
        value={new Date(field.value)}
        onBlur={field.onBlur}
        onChange={setValue}
      />
      {meta.error && meta.touched && <div className="text-error">{meta.error}</div>}
    </div>
  );
}
