import { DrawerClose } from "@/components/ui/drawer";
import Link from "next/link";

export default function DrawerContentItem({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  return (
    <Link href={path}>
      <DrawerClose>
        <div className="w-screen cursor-pointer ">
          <div className="font-medium flex justify-center items-center cursor-pointer text-2xl px-4 py-8 h-[60px] rounded-xl bg-white hover:bg-gray-200 text-black duration-200 hover:text-black">
            {name}
          </div>
        </div>
      </DrawerClose>
    </Link>
  );
}
