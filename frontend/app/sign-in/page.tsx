"use client";
import { pb } from "@/lib/pb";
import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  CardBody,
  Input,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [details, setDetails] = useState<Record<string, any>>({ admin: false });
  const [error, setError] = useState("");

  const router = useRouter();

  async function signIn(email: string, password: string) {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);
    if (authData) {
      router.push("/");
    }
  }

  return (
    <div className="sm:p- mt-20 w-full h-full flex flex-col justify-center sm:justify-center sm:pt-0 pt-10 align-center items-center">
      <Card className="w-full pt-4 sm:w-[400px] bg-grey-700 border-none sm:border-red-500">
        <CardHeader>
          <h1 className="text-black lg:text-4xl md:text-3xl text-2xl font-bold">
            Sign in
          </h1>
        </CardHeader>
        <CardBody>
          <form>
            <div className="grid w-full items-center gap-4">
              <>
                <div className="flex flex-col space-y-1.5">
                  <label
                    className="text-black sm:text-sm text-lg"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Input
                    onChange={(e) => {
                      setDetails((previous) => ({
                        ...previous,
                        email: e.target.value,
                      }));
                    }}
                    className="text-black sm:text-sm text-lg"
                    id="email"
                    placeholder="Email address"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    className="text-black sm:text-sm text-lg"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Input
                    onChange={(e) => {
                      setDetails((previous) => ({
                        ...previous,
                        password: e.target.value,
                      }));
                    }}
                    className="text-black  sm:text-sm text-lg"
                    id="password"
                    placeholder="Password"
                    type="password"
                  ></Input>
                </div>
                <div className="flex text-black gap-0">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
                <div className="pt-1 flex text-black gap-2">
                  <p className="text-md">I don&apos;t have an account.</p>
                  <a href="/sign-up" className="font-bold">
                    Sign up
                  </a>
                </div>
              </>
            </div>
          </form>
        </CardBody>
        <CardFooter className="flex flex-col gap-3 w-full justify-between">
          <Button
            className="w-full font-medium text-lg text-white bg-blue-500 hover:bg-blue-600 hover:scale-105 duration-200"
            onClick={() => {
              signIn(details["email"], details["password"]);
            }}
          >
            Sign in
          </Button>
          <Button className="w-full" onClick={() => router.back()}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
      <form></form>
    </div>
  );
}
