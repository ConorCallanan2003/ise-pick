import { useEffect } from "react";
import NavBar from "../components/nav-bar/NavBar";
import { pb } from "@/lib/pb";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <NavBar />
      {children}
    </div>
  );
}
