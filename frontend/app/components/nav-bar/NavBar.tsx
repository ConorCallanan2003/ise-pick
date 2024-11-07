"use client";
import Link from "next/link";
import NavBarItem from "./NavBarItem";
import { useEffect, useState } from "react";
import { AuthModel, BaseAuthStore } from "pocketbase";
import { pb } from "@/lib/pb";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@nextui-org/react";
import DrawerContentItem from "./DrawerContentItem";

export default function NavBar() {
  const [dataStale, setDataStale] = useState(true);
  const [authStore, setAuthStore] = useState<AuthModel>(null);
  const router = useRouter();

  useEffect(() => {
    if (dataStale) {
      setAuthStore(pb.authStore.model);
      setDataStale(false);
    }
  }, [dataStale]);

  return (
    <Drawer>
      <div className="w-full flex justify-between">
        <div className="absolute visible z-1 sm:z-0 sm:invisible flex justify-end gap-2 top-[25px] left-[35px]">
          <DrawerTrigger>
            <Menu
              className="font-bold [&>*]:cursor-pointer text-2xl rounded-lg bg-white hover:bg-gray-200 text-black duration-200 hover:text-black cursor-pointer z-0 p-2"
              size={50}
            />
          </DrawerTrigger>
        </div>
        <div className="absolute sm:z-1 z-0 sm:visible invisible flex justify-end gap-2 top-[35px] left-[35px]">
          <Link className="cursor-pointer text-3xl font-bold" href={"/"}>
            ISEPick
          </Link>
        </div>
        <div className="absolute visible z-1 sm:z-0 sm:invisible flex justify-end gap-2 top-[25px] right-[30px]">
          {authStore ? (
            <div
              onClick={() => {
                pb.authStore.clear();
                setDataStale(true);
                router.push("/sign-in");
              }}
              className="font-bold cursor-pointer text-2xl px-4 py-2 rounded-lg bg-white hover:bg-gray-200 text-black duration-200 hover:text-black"
            >
              Sign out
            </div>
          ) : (
            <NavBarItem name={"Sign in"} path={"/sign-in"} />
          )}
        </div>
        <div className="absolute sm:visible sm:z-1 z-0 invisible flex justify-end lg:gap-2 top-[30px] right-[30px]">
          <NavBarItem name={"Home"} path={"/"} />
          <NavBarItem name={"Residencies"} path={"/residencies"} />
          <NavBarItem disabled name={"Notes"} path={"/notes"} />
          <NavBarItem disabled name={"Assessments"} path={"/assessments"} />
          <NavBarItem disabled name={"Projects"} path={"/projects"} />
          {authStore ? (
            <div
              onClick={() => {
                pb.authStore.clear();
                setDataStale(true);
                router.push("/sign-in");
              }}
              className="font-medium cursor-pointer text-lg px-4 py-2 rounded-lg bg-white hover:bg-gray-200 text-black duration-200 hover:text-black"
            >
              Sign out
            </div>
          ) : (
            <NavBarItem name={"Sign in"} path={"/sign-in"} />
          )}
        </div>
      </div>
      <DrawerContent>
        <div className="pb-6 pt-6">
          <DrawerContentItem name={"Home"} path={"/"} />
          <DrawerContentItem name={"Residencies"} path={"/residencies"} />
          <DrawerContentItem disabled name={"Notes"} path={"/notes"} />
          <DrawerContentItem
            disabled
            name={"Assessments"}
            path={"/assessments"}
          />
          <DrawerContentItem disabled name={"Projects"} path={"/projects"} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
