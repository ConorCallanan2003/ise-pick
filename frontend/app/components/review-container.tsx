import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  image,
} from "@nextui-org/react";
import { Review } from "@/app/(loggedIn)/(navbar)/residencies/[residency_id]/page";
import StarRating from "./small_reusable/StarRating";

export default function ReviewContainer({ review }: { review: Review }) {
  return (
    <Card className="w-full cursor-pointer p-1 my-2 duration-200">
      <CardHeader className="-mb-2 flex justify-between">
        <h1 className="pr-2 text-md font-bold ">
          {review.user ? review.user.name : "Anonymous"} -{" "}
          {new Date(review.created).toDateString()}
        </h1>
        <div className="flex gap-2">
          {(review.benefits ?? []).map((benefit) => (
            <Chip key={benefit} className="select-none">
              <div className="relative group">
                <div className="w-full flex relative group justify-center items-center">
                  <p className="w-full">{benefit.toUpperCase()}</p>
                </div>
              </div>
            </Chip>
          ))}
        </div>
      </CardHeader>
      <CardBody className="-mb-4">
        <div className="flex flex-col gap-3">
          <p>{review.description}</p>
          <p className="text-md font-medium">
            Salary:
            {review.salary
              ? " €" +
                review.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "Undisclosed"}
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex md:flex-row flex-col items-start justify-between">
        <div className="flex gap-2 text-md font-medium">
          {review.technologies && review.technologies.length > 0
            ? "Technologies: "
            : ""}
          <div className="flex gap-1">
            {(review.technologies ?? []).map((technology) => (
              <Chip size="sm" key={technology} className="select-none">
                <div className="relative group">
                  <div className="w-full flex relative group justify-center items-center">
                    <p className="w-full text-bold">
                      {technology.toUpperCase()}
                    </p>
                  </div>
                </div>
              </Chip>
            ))}
          </div>
        </div>
        <StarRating value={review.score} />
      </CardFooter>
    </Card>
  );
}
