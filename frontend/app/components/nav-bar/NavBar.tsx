"use client";
import Link from "next/link";
import NavBarItem from "./NavBarItem";
import { useEffect, useState } from "react";
import { AuthModel, BaseAuthStore } from "pocketbase";
import { pb } from "@/lib/pb";

export default function NavBar() {
  const [dataStale, setDataStale] = useState(true);
  const [authStore, setAuthStore] = useState<AuthModel>(null);

  useEffect(() => {
    if (dataStale) {
      setAuthStore(pb.authStore.model);
      setDataStale(false);
    }
  }, [dataStale]);

  function signOut() {
    pb.authStore.clear();
    setAuthStore(pb.authStore.model);
  }
  return (
    <div className="w-full flex justify-between">
      <div className="w-1/2 flex justify-start">
        <Link className="text-3xl font-bold" href={"/"}>
          ISEPick
        </Link>
      </div>
      <div className="w-full flex justify-end gap-2">
        <NavBarItem name={"Home"} path={"/"} />
        <NavBarItem name={"Residencies"} path={"/residencies"} />
        {/* <NavBarItem name={"Notes"} path={"/notes"} />
        <NavBarItem name={"Assessments"} path={"/assessments"} />
        <NavBarItem name={"Projects"} path={"/projects"} /> */}
        {authStore ? (
          <div
            onClick={() => {
              pb.authStore.clear();
              setDataStale(true);
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
  );
}
