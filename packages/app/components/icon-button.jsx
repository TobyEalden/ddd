import Link from "next/link";

export default function IconButton({iconName, label, onClick, route}) {
  const inner = (
    <div
      style={{width: 48}}
      className="p-2 text-center has-tooltip bg-primary text-primary-inverted hover:bg-primary-dark hover:text-primary-inverted rounded cursor-pointer"
      onClick={onClick}
    >
      <i className={`${iconName} fa-xl`} />{" "}
      {label && <span className="tooltip ml-7 text-base-inverted bg-secondary text-sm p-2 rounded">{label}</span>}
    </div>
  );
  if (route) {
    return <Link href={route || "/#"}>{inner}</Link>;
  } else {
    return inner;
  }
}
