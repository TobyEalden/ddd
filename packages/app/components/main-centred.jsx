export default function MainCentered({children, className, ...props}) {
  return (
    <div className={`${className} flex-auto flex flex-col justify-center items-center p-2`} {...props}>
      {children}
    </div>
  );
}
