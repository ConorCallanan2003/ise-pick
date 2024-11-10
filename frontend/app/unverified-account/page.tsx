"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { pb } from "@/lib/pb";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

export default function UnverifiedAccount() {
  return (
    <div className="w-full h-full flex flex-col justify-center align-center items-center pt-[300px]">
      <Card className="p-6 w-[450px] bg-grey-700 border-none sm:border-red-500">
        <CardHeader>
          <h1 className="text-black lg:text-4xl md:text-3xl text-2xl font-bold">
            Unverified Account
          </h1>
        </CardHeader>
        <CardBody>
          <h3 className="text-lg">
            Your account has not yet been verified. Please contact someone who
            cares.
          </h3>
        </CardBody>
        <CardFooter>
          <Link href={"/sign-in"}>
            <Button
              onClick={() => {
                pb.authStore.clear();
                Cookie.remove("pbAuthToken");
              }}
              color="primary"
              className="p-4 text-lg"
            >
              Sign Out
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
