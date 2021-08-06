export default function PageHeading({heading, children}) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-lg font-bold ml-2 border-b-4 border-primary">/ {heading} /</div>
      {children}
    </div>
  );
}
