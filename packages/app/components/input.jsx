export default function Input({className, ...props}) {
  return <input className={`${className} p-2 border-primary rounded border-2`} autoComplete="off" {...props} />;
}
