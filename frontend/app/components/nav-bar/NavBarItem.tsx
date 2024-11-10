import Link from "next/link";

export default function NavBarItem({
  name,
  path,
  disabled = false,
}: {
  name: string;
  path: string;
  disabled?: boolean;
}) {
  return (
    <>
      {disabled ? (
        <div className="font-medium text-lg text-gray-400 md:px-4 px-2 py-2 rounded-lg bg-white-50 hover:bg-white-200 hover:bg-gray-50 text-black duration-200 ">
          {name}
        </div>
      ) : (
        <Link href={path}>
          <div className=" cursor-pointer font-medium text-lg md:px-4 px-2 py-2 rounded-lg bg-white hover:bg-gray-200 text-black duration-200 hover:text-black">
            {name}
          </div>
        </Link>
      )}
    </>
  );
}
