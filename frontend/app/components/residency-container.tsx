"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Star } from "lucide-react";
import Link from "next/link";
import StarRating from "./small_reusable/StarRating";

export default function ResidencyContainer({
  name,
  description,
  residencyId,
  image,
  avgScore,
}: {
  name: string;
  description: string;
  residencyId: string;
  image: string;
  avgScore?: number;
  countScore?: number;
}) {
  return (
    <Link href={`residencies/${residencyId}`}>
      <Card className="p-1 [&_*]:cursor-pointer h-full hover:scale-105 duration-200">
        <CardBody className="overflow-visible py-2">
          <img
            alt="Card background"
            className="object-contain h-[300px] rounded-xl"
            src={image}
          />
        </CardBody>
        <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
          <h1 className="text-center text-lg font-medium pr-2">{name}</h1>
          {avgScore ? (
            <StarRating value={avgScore} />
          ) : (
            <div className="flex items-center">
              <Star size={20} fill="#48484839" color="#48484839" />
              <Star size={20} fill="#48484839" color="#48484839" />
              <Star size={20} fill="#48484839" color="#48484839" />
              <Star size={20} fill="#48484839" color="#48484839" />
              <Star size={20} fill="#48484839" color="#48484839" />
              <h4 className="pl-1 text-md font-medium">No reviews</h4>
            </div>
          )}
          <h2 className="text-left pb-2 text-md">{description}</h2>
        </CardFooter>
      </Card>
    </Link>
  );
}
