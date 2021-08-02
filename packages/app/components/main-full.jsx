export default function MainFull({children, ...props}) {
  return (
    <div className="flex-auto flex flex-col justify-start p-2" {...props}>
      {children}
    </div>
  );
}
