import Link from "next/link";

export default function TitlebarButton({iconName, label, route}) {
  return (
    <Link href={route || "/#"}>
      <div className="has-tooltip hover:bg-primary hover:text-primary-inverted text-primary-dark rounded cursor-pointer p-1 ml-2">
        <i className={`${iconName}`} />
        {label && (
          <div className="tooltip mt-5 relative right-2 text-base-inverted bg-secondary text-sm p-2 rounded">
            {label}
          </div>
        )}
      </div>
    </Link>
  );
}
