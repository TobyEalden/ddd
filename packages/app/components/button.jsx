export default function Button({className, secondary, ...props}) {
  const bg = secondary ? "bg-secondary" : "bg-primary";
  const txt = secondary ? "text-primary-light" : "text-primary-inverted";
  return (
    <button
      className={`${className} ${bg} ${txt} uppercase p-2 hover:bg-primary-dark hover:text-primary-inverted rounded shadow-md`}
      {...props}
    />
  );
}