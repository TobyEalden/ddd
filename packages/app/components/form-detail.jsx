export default function FormDetail({label, detail, pre}) {
  return (
    <div className="flex flex-col">
      <label className="font-bold">{label}</label>
      {pre && <pre>{detail}</pre>}
      {!pre && <span>{detail}</span>}
    </div>
  );
}
