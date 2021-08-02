export default function MainCentered({children, ...props}) {
  return (
    <div className="flex-auto flex flex-col justify-center items-center p-2" {...props}>
      {children}
    </div>
  );
}
