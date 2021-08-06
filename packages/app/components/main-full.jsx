export default function MainFull({children, ...props}) {
  return (
    <div className="flex-auto flex flex-col justify-start p-2 ml-16 mt-16" {...props}>
      {children}
    </div>
  );
}
