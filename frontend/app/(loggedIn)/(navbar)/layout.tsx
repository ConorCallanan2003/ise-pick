"use client";
import NavBar from "../../components/nav-bar/NavBar";

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
