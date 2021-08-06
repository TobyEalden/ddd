import Link from "next/link";

export default function SidebarButton({iconName, label, route}) {
  return (
    <Link href={route || "/#"}>
      <div
        style={{width: 48}}
        className="p-2 text-center has-tooltip hover:bg-chrome-dark hover:text-chrome-inverted text-chrome-inverted rounded cursor-pointer"
      >
        <i className={`${iconName} fa-xl`} />{" "}
        {label && <span className="tooltip ml-7 text-base-inverted bg-secondary text-sm p-2 rounded">{label}</span>}
      </div>
    </Link>
  );
}
