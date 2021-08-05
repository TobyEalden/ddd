import Link from "next/link";

export default function SidebarButton({iconName, label, route}) {
  return (
    <Link href={route || "/#"}>
      <div className="has-tooltip hover:bg-primary hover:text-primary-inverted p-4 text-primary-dark rounded cursor-pointer">
        <i className={`${iconName} fa-xl`} />
        {label && <span className="tooltip ml-7 text-base-inverted bg-secondary text-sm p-2 rounded">{label}</span>}
      </div>
    </Link>
  );
}
