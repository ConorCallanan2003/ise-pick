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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignUpParameters = {
  email: string;
  password: string;
};

function addUserAsAdmin(email: string) {
  let adminUsers: string[] = JSON.parse(
    window.sessionStorage.getItem("adminUsers") as string
  );
  if (!adminUsers) {
    adminUsers = [];
  }
  if (adminUsers.includes(email)) {
    return;
  }
  adminUsers.push(email);
  window.sessionStorage.setItem("adminUsers", JSON.stringify(adminUsers));
}

export default function SignUp() {
  const router = useRouter();
  const [details, setDetails] = useState<Record<string, any>>({ admin: false });

  const [error, setError] = useState("");
  const pwRegexPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/;
  const emailRegexPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const pwRegex = new RegExp(pwRegexPattern);
  const emailRegex = new RegExp(emailRegexPattern);

  return (
    <div className="sm:p-12 w-full h-full flex flex-col justify-start sm:justify-center sm:pt-4 pt-10 align-center items-center">
      <Card className="w-full pt-16 sm:w-[400px] bg-grey-700 border-none sm:border-red-500">
        <CardHeader>
          <h1 className="text-white text-4xl sm:text-2xl font-bold">Sign up</h1>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label
                  className="text-white sm:text-sm text-lg"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  className="text-white sm:text-sm text-lg"
                  onBlur={() => {
                    if (
                      details["email"] &&
                      !details["email"].match(emailRegex)
                    ) {
                      setError("Must use a valid email");
                    }
                  }}
                  onChange={(e) => {
                    setError("");
                    setDetails((previous) => ({
                      ...previous,
                      email: e.target.value,
                    }));
                  }}
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
                  className="text-white  sm:text-sm text-lg"
                  onBlur={() => {
                    if (
                      details["password1"] &&
                      !details["password1"].match(pwRegex)
                    ) {
                      setError(
                        "Password must contain at least one uppercase letter, one number, and one special symbol."
                      );
                    }
                  }}
                  onChange={(e) => {
                    setError("");
                    setDetails((previous) => ({
                      ...previous,
                      password1: e.target.value,
                    }));
                  }}
                  id="password"
                  placeholder="Password"
                  type="password"
                ></Input>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label
                  className="text-white sm:text-sm text-lg"
                  htmlFor="password"
                >
                  Re-enter Password
                </Label>
                <Input
                  className="text-white  sm:text-sm text-lg"
                  onBlur={() => {
                    if (
                      details["password2"] &&
                      !details["password2"].match(pwRegex)
                    ) {
                      setError(
                        "Password must contain at least one uppercase letter, one number, and one special symbol."
                      );
                    }
                    if (
                      details["password1"] &&
                      details["password2"] &&
                      details["password1"] != details["password2"]
                    ) {
                      setError("Passwords must match. ");
                    }
                  }}
                  onChange={(e) => {
                    setError("");
                    setDetails((previous) => ({
                      ...previous,
                      password2: e.target.value,
                    }));
                  }}
                  id="password"
                  placeholder="Password"
                  type="password"
                ></Input>
                <div className="pt-3 flex flex-col gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      value={details["admin"]}
                      onCheckedChange={(e) =>
                        setDetails((previous) => ({ ...previous, admin: e }))
                      }
                      className="border-white"
                      id="admin"
                    />
                    <label
                      htmlFor="admin"
                      className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Sign up as admin
                    </label>
                  </div>
                </div>
              </div>
              <div className=" flex text-white gap-0">
                <p className="text-sm text-red-500">{error}</p>
              </div>
              <div className=" flex text-white gap-2">
                <p className="text-md">I already have an account.</p>
                <a href="/sign-in" className="font-bold">
                  Sign in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 w-full justify-between">
          <Button variant="outline" className="w-full" onClick={() => {}}>
            Sign up
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
