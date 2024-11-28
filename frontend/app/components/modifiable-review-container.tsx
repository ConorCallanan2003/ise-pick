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
import { Pencil, Plus, X } from "lucide-react";
import { useState } from "react";

export default function ModifiableReviewContainer({
  review,
}: {
  review: Review;
}) {
  const [editing, setEditing] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  return (
    <div
      className={`relative ${editing ? "" : "hover:scale-105"} duration-400 bg-gray-700 rounded-2xl`}
    >
      <Card
        className={`w-full ${editing ? "" : "[&>*]:cursor-pointer"} duration-2000`}
      >
        {!editing && (
          <div
            onClick={() => setEditing((prev) => !prev)}
            className="w-full h-full rounded-2xl absolute hover:bg-white hover:text-black text-transparent bg-transparent duration-400 z-20 flex justify-center items-center"
          >
            <Pencil className="[&>*]:cursor-pointer cursor-pointer" size={80} />
          </div>
        )}
        <CardHeader className="-mb-2 flex justify-between">
          <h1 className="pr-2 text-md font-bold ">
            {review.user ? review.user.name : "Anonymous"} -{" "}
            {new Date(review.created).toDateString()}
          </h1>
          <div className="flex gap-2">
            {(review.benefits ?? []).map((benefit) =>
              editing ? (
                <Chip
                  key={benefit}
                  className="cursor-pointer hover:scale-105 duration-200 mb-3"
                  onClick={() => {
                    //   setTechnologies((prev) =>
                    //     prev.filter((value) => value != technology)
                    //   );
                  }}
                >
                  <div className="relative group [&>*]:cursor-pointer">
                    <X
                      size={20}
                      className="w-full cursor-pointer [&>*]:cursor-pointer absolute text-transparent group-hover:text-black"
                    />
                    <div className="w-full flex relative group justify-center items-center">
                      <p className="w-full group-hover:invisible">
                        {benefit.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </Chip>
              ) : (
                <Chip key={benefit} className="select-none">
                  <div className="relative group">
                    <div className="w-full flex relative group justify-center items-center">
                      <p className="w-full">{benefit.toUpperCase()}</p>
                    </div>
                  </div>
                </Chip>
              )
            )}
            {editing && (
              <Chip
                key={"add_new_technology_button"}
                className="cursor-pointer hover:scale-105 py-1 hover:bg-gray-800 hover:text-white duration-200"
              >
                <div className="relative group">
                  <div className="w-full flex relative group h-full justify-center items-center">
                    <Plus
                      className="font-bold cursor-pointer [&>*]:cursor-pointer "
                      size={24}
                    />
                  </div>
                </div>
              </Chip>
            )}
          </div>
        </CardHeader>
        <CardBody className="-mb-4">
          <div
            onClick={() => {
              if (editing) {
                setEditingDescription(true);
              }
              console.log(editingDescription);
            }}
            className="flex relative flex-col gap-3 cursor-pointer [&>*]:cursor-pointer"
          >
            {editing && editingDescription ? (
              <>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    // e.preventDefault();
                    setEditingDescription(false);
                  }}
                  className="absolute bottom-1 right-2 flex justify-center items-center font-medium z-20 rounded-md h-[20px] w-[60px] text-sm bg-gray-800 text-white mx-2 py-3"
                >
                  SAVE
                </div>
                <textarea
                  onChange={(newValue) => {
                    review.description = newValue.target.value;
                  }}
                  value={review.description}
                ></textarea>
              </>
            ) : (
              <p>{review.description}</p>
            )}
          </div>
          <p className="text-md mt-2 font-medium">
            Salary:
            {review.salary
              ? " €" +
                review.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "Undisclosed"}
          </p>
        </CardBody>
        <CardFooter className="flex md:flex-row flex-col items-start justify-between">
          <div className="flex gap-2 text-md font-medium">
            {review.technologies && review.technologies.length > 0
              ? "Technologies: "
              : ""}
            <div className="flex gap-1">
              {(review.technologies ?? []).map((technology) => (
                <Chip
                  size="sm"
                  key={technology}
                  className="cursor-pointer hover:scale-105 duration-200 mb-3"
                  onClick={() => {
                    //   setTechnologies((prev) =>
                    //     prev.filter((value) => value != technology)
                    //   );
                  }}
                >
                  <div className="relative group [&>*]:cursor-pointer">
                    <X
                      size={16}
                      className="w-full cursor-pointer [&>*]:cursor-pointer absolute text-transparent group-hover:text-black"
                    />
                    <div className="w-full flex relative group justify-center items-center">
                      <p className="w-full group-hover:invisible">
                        {technology.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </Chip>
              ))}
              {editing && (
                <Chip
                  size="sm"
                  key={"add_new_technology_button"}
                  className="cursor-pointer hover:scale-105 hover:bg-gray-800 hover:text-white duration-200"
                >
                  <div className="relative group">
                    <div className="w-full flex relative group justify-center items-center">
                      <Plus
                        className="font-bold cursor-pointer [&>*]:cursor-pointer"
                        size={16}
                      />
                    </div>
                  </div>
                </Chip>
              )}
            </div>
          </div>
          <StarRating value={review.score} />
        </CardFooter>
      </Card>
      {editing && (
        <div
          onClick={() => {
            setEditingDescription(false);
            setEditing(false);
          }}
          className="h-[30px] text-md font-bold cursor-pointer bg-gray-800 rounded-b-2xl text-white duration-200 flex items-center justify-center"
        >
          SAVE
        </div>
      )}
    </div>
  );
}
