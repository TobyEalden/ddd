export default function Button({className, secondary, ...props}) {
  return (
    <button
      className={`${className} uppercase font-bold p-2 bg-paper hover:bg-primary-dark hover:text-primary-inverted rounded shadow-md text-${
        secondary ? "secondary" : "primary-dark"
      }`}
      {...props}
    />
  );
}
