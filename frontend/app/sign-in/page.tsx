"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pb } from "@/lib/pb";

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
    <div className="sm:p-12 w-full h-full flex flex-col justify-center sm:justify-center sm:pt-0 pt-10 align-center items-center">
      <Card className="w-full pt-16 sm:w-[400px] bg-grey-700 border-none sm:border-red-500">
        <CardHeader>
          <h1 className="text-white text-4xl sm:text-2xl font-bold">Sign in</h1>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-white sm:text-sm text-lg"
                    htmlFor="email"
                  >
                    Email
                  </Label>
                  <Input
                    onChange={(e) => {
                      setDetails((previous) => ({
                        ...previous,
                        email: e.target.value,
                      }));
                    }}
                    className="text-white sm:text-sm text-lg"
                    id="email"
                    placeholder="Email address"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-white sm:text-sm text-lg"
                    htmlFor="password"
                  >
                    Password
                  </Label>
                  <Input
                    onChange={(e) => {
                      setDetails((previous) => ({
                        ...previous,
                        password: e.target.value,
                      }));
                    }}
                    className="text-white  sm:text-sm text-lg"
                    id="password"
                    placeholder="Password"
                    type="password"
                  ></Input>
                </div>
                <div className="flex text-white gap-0">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
                <div className="pt-1 flex text-white gap-2">
                  <p className="text-md">I don&apos;t have an account.</p>
                  <a href="/sign-up" className="font-bold">
                    Sign up
                  </a>
                </div>
              </>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 w-full justify-between">
          <Button
            variant="outline"
            className="w-full"
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
