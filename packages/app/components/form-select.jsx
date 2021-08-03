import {useField} from "formik";
import Select from "react-select";

export default function FormSelect({label, ...props}) {
  const {name, options} = props;
  const [field, meta, helpers] = useField(name);

  const getOption = (val) => {
    return options.find((opt) => {
      let optVal;
      if (props.getOptionValue) {
        optVal = props.getOptionValue(opt);
      } else {
        optVal = opt.value;
      }
      return optVal === val;
    });
  };

  const setValue = (opt) => {
    if (props.getOptionValue) {
      helpers.setValue(props.getOptionValue(opt));
    } else {
      helpers.setValue(opt.value);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={props.name}>{label}</label>
      <Select {...props} value={getOption(field.value)} onBlur={field.onBlur} onChange={setValue} />
      {meta.error && <div className="text-error">{meta.error}</div>}
    </div>
  );
}
