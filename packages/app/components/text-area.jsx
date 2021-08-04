export default function TextArea({className, ...props}) {
  return <textarea className={`${className} p-2 border-primary rounded border-2`} autoComplete="off" {...props} />;
}
