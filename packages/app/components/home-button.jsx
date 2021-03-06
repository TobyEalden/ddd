import Link from "next/link";

export default function HomeButton({className, icon, label, route}) {
  return (
    <Link passHref href={route}>
      <div
        className={`${className} flex flex-col flex-shrink-0 p-4 m-4 items-center justify-center shadow-lg rounded-lg bg-paper hover:bg-primary hover:text-primary-inverted cursor-pointer`}
        style={{width: 200}}
      >
        <div>
          <i className={`fad ${icon} fa-4x mb-4 text-chrome`} />
        </div>
        <div>{label}</div>
      </div>
    </Link>
  );
}
