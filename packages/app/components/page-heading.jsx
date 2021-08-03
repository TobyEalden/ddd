export default function PageHeading({heading}) {
  return (
    <div className="text-lg font-bold">
      <i className="fad fa-chevrons-right mr-2 text-sm" />
      {heading}
    </div>
  );
}
