import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  image,
  useDisclosure,
} from "@nextui-org/react";
import { Review } from "@/app/(loggedIn)/(navbar)/residencies/[residency_id]/page";
import StarRating from "./small_reusable/StarRating";
import { Pencil, Plus, X } from "lucide-react";
import { useState } from "react";
import AddBenefitOrTechnologyModal from "./modals/AddBenefitOrTechnologyModal";
import ChangeRatingModal from "./modals/ChangeRatingModal";
import { pb } from "@/lib/pb";

async function updateReview(reviewData: Review) {
  console.log(reviewData.residency);
  const data = {
    score: reviewData.score,
    description: reviewData.description,
    residency: reviewData.residency.id,
    salary: reviewData.salary,
    technologies: reviewData.technologies,
    benefits: reviewData.benefits,
  };

  await pb.collection("residency_reviews").update(reviewData.id, data);

  return;
}

export default function ModifiableReviewContainer({
  review,
  technologyOptions,
  benefitsOptions,
}: {
  review: Review;
  technologyOptions: string[];
  benefitsOptions: string[];
}) {
  const [editing, setEditing] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editingSalary, setEditingSalary] = useState(false);

  const [reviewData, setReviewData] = useState(review);
  const [currentDescriptionValue, setCurrentDescriptionValue] = useState("");
  const [currentSalaryValue, setCurrentSalaryValue] = useState(
    reviewData.salary
  );

  const [isTechnologyOpen, setTechnologyIsOpen] = useState(false);
  const [isBenefitsOpen, setBenefitsIsOpen] = useState(false);
  const [isRatingOpen, setRatingIsOpen] = useState(false);

  const openTechnologyModal = () => setTechnologyIsOpen(true);
  const closeTechnologyModal = () => setTechnologyIsOpen(false);
  const openBenefitsModal = () => setBenefitsIsOpen(true);
  const closeBenefitsModal = () => setBenefitsIsOpen(false);
  const openRatingModal = () => setRatingIsOpen(true);
  const closeRatingModal = () => setRatingIsOpen(false);

  const save = async () => {
    updateReview(reviewData);
  };

  return (
    <>
      {isTechnologyOpen && (
        <AddBenefitOrTechnologyModal
          placeholder={"Technology"}
          options={technologyOptions}
          name={"technology"}
          label={"Technology"}
          title={"Technology"}
          closeModal={closeTechnologyModal}
          onChange={(e) => {
            if (e == "Escape") {
              closeTechnologyModal();
            }
          }}
          onSelect={(newValue) => {
            if (reviewData.technologies?.includes(newValue)) {
              return;
            }
            setReviewData((prev) => ({
              ...prev,
              technologies: prev.technologies?.concat([newValue]),
            }));
            closeTechnologyModal();
          }}
        />
      )}
      {isBenefitsOpen && (
        <AddBenefitOrTechnologyModal
          placeholder={"Benefit"}
          options={benefitsOptions}
          name={"benefits"}
          label={"Benefit"}
          title={"Benefit"}
          closeModal={closeBenefitsModal}
          onChange={(e) => {
            if (e == "Escape") {
              closeBenefitsModal();
            }
          }}
          onSelect={(newValue) => {
            if (reviewData.benefits?.includes(newValue)) {
              return;
            }
            setReviewData((prev) => ({
              ...prev,
              benefits: prev.benefits?.concat([newValue]),
            }));
            closeBenefitsModal();
          }}
        />
      )}
      {isRatingOpen && (
        <ChangeRatingModal
          closeModal={closeRatingModal}
          onSelect={(newValue) => {
            setReviewData((prev) => ({
              ...prev,
              score: newValue,
            }));
            closeBenefitsModal();
          }}
          initialValue={reviewData.score}
        />
      )}
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
              <Pencil
                className="[&>*]:cursor-pointer cursor-pointer"
                size={80}
              />
            </div>
          )}
          <CardHeader className="-mb-2 flex justify-between">
            <h1 className="pr-2 text-md font-bold ">
              {reviewData.user ? reviewData.user.name : "Anonymous"} -{" "}
              {new Date(reviewData.created).toDateString()}
            </h1>
            <div className="flex gap-2 overflow-scroll">
              {(reviewData.benefits ?? []).map((benefit) =>
                editing ? (
                  <Chip
                    key={benefit}
                    className="cursor-pointer hover:scale-105 duration-200 mb-3"
                    onClick={() => {
                      setReviewData((prev) => ({
                        ...prev,
                        benefits: prev.benefits?.filter(
                          (value) => value != benefit
                        ),
                      }));
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
                  onClick={openBenefitsModal}
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
                  setCurrentDescriptionValue(reviewData.description || "");
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
                      setReviewData((prev) => ({
                        ...prev,
                        description: currentDescriptionValue,
                      }));
                      setEditingDescription(false);
                    }}
                    className="absolute bottom-1 right-2 flex justify-center items-center font-medium z-20 rounded-md h-[20px] w-[60px] text-sm bg-gray-800 text-white mx-2 py-3"
                  >
                    SAVE
                  </div>
                  <textarea
                    onChange={(newValue) => {
                      setCurrentDescriptionValue(newValue.target.value);
                    }}
                    value={currentDescriptionValue}
                  ></textarea>
                </>
              ) : (
                <p>{reviewData.description}</p>
              )}
            </div>
            <div
              className="flex gap-2 mt-2 justify-start items-center"
              onClick={() => !editingSalary && setEditingSalary(true)}
            >
              {editingSalary ? (
                <>
                  <div className="flex justify-start">
                    <p className="text-md font-medium">Salary: €</p>
                    <input
                      className="w-[70px]"
                      value={
                        currentSalaryValue
                          ? currentSalaryValue?.toString()
                          : "Undisclosed"
                      }
                      onChange={(e) => {
                        const num = e.target.value
                          .replaceAll(",", "")
                          .split(".")[0];
                        if (parseInt(num)) {
                          setCurrentSalaryValue(parseInt(num));
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      console.log("HERE");
                      setReviewData((prev) => ({
                        ...prev,
                        salary: currentSalaryValue,
                      }));
                      setEditingSalary(false);
                    }}
                    className="bg-black text-white font-bold px-2 rounded-lg text-sm"
                  >
                    Save
                  </button>
                </>
              ) : (
                <p className="text-md font-medium">
                  Salary:
                  {reviewData.salary
                    ? " €" +
                      reviewData.salary
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : "Undisclosed"}
                </p>
              )}
            </div>
          </CardBody>
          <CardFooter className="flex md:flex-row flex-col items-start justify-between">
            <div className="flex gap-2 text-md font-medium overflow-auto pr-4">
              {reviewData.technologies && reviewData.technologies.length > 0
                ? "Technologies: "
                : ""}
              <div className="flex gap-1 overflow-scroll">
                {(reviewData.technologies ?? []).map((technology) => (
                  <Chip
                    size="sm"
                    key={technology}
                    className="cursor-pointer hover:scale-105 duration-200 mb-3"
                    onClick={() => {
                      setReviewData((prev) => ({
                        ...prev,
                        technologies: prev.technologies?.filter(
                          (value) => value != technology
                        ),
                      }));
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
                    onClick={() => {
                      console.log("CLICKED");
                      openTechnologyModal();
                    }}
                  >
                    <div className="relative group">
                      <div className="w-full flex relative group justify-center items-center">
                        <Plus
                          className="font-bold cursor-pointer [&_*]:cursor-pointer"
                          size={16}
                        />
                      </div>
                    </div>
                  </Chip>
                )}
              </div>
            </div>
            <div
              className="cursor-pointer [&_*]:cursor-pointer"
              onClick={openRatingModal}
            >
              <StarRating value={reviewData.score} />
            </div>
          </CardFooter>
        </Card>
        {editing && (
          <div
            onClick={() => {
              save().then(() => {
                setEditingDescription(false);
                setEditing(false);
              });
            }}
            className="h-[30px] text-md font-bold cursor-pointer bg-gray-800 rounded-b-2xl text-white duration-200 flex items-center justify-center"
          >
            SAVE
          </div>
        )}
      </div>
    </>
  );
}
