import Link from "next/link";

export default function NavBarItem({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  return (
    <Link href={path}>
      <div className=" cursor-pointer font-medium text-lg md:px-4 px-2 py-2 rounded-lg bg-white hover:bg-gray-200 text-black duration-200 hover:text-black">
        {name}
      </div>
    </Link>
  );
}
