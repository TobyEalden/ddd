export default function Button({className, secondary, ...props}) {
  const bg = secondary ? "bg-secondary" : "bg-primary";
  const txt = secondary ? "text-primary-light" : "text-primary-inverted";
  return (
    <button
      className={`${className} ${bg} ${txt} flex items-center uppercase p-2 mt-2 mb-2 hover:bg-primary-dark hover:text-primary-inverted rounded shadow-md`}
      {...props}
    />
  );
}
