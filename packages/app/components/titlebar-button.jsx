import Link from "next/link";

export default function TitlebarButton({iconName, label, route}) {
  return (
    <Link href={route || "/#"}>
      <div className="p-2 text-center has-tooltip hover:bg-chrome hover:text-chrome-inverted text-chrome-inverted rounded cursor-pointer">
        <i className={`${iconName} fa-xl`} />
        {label && (
          <div className="tooltip mt-5 relative right-2 text-base-inverted bg-secondary text-sm p-2 rounded">
            {label}
          </div>
        )}
      </div>
    </Link>
  );
}
