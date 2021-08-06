export default function InfoPanel({children}) {
  return (
    <div className="p-4 m-4 bg-info text-info-inverted rounded-md flex items-center">
      <i className="fad fa-info-circle text-2xl mr-2" />
      {children}
    </div>
  );
}
