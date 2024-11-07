"use client";
import { pb } from "@/lib/pb";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Chip,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Residency } from "../page";
import { X } from "lucide-react";
import ReviewContainer from "../components/review-container";

type User = {
  name: string;
  avatar: string;
};

export type Review = {
  id: string;
  score: number;
  residency: Residency;
  created: Date;
  salary?: number;
  description?: string;
  user?: User;
  technologies?: string[];
  benefits?: string[];
};

async function addReview(
  score: number,
  residency: Residency,
  salary?: number,
  description?: string,
  user?: string,
  technologies?: {},
  benefits?: {}
) {
  const data = {
    score,
    description,
    residency: residency.id,
    salary,
    technologies,
    benefits,
    user,
  };

  const record = await pb.collection("residency_reviews").create(data);

  return;
}

const AddModel = ({
  isOpen,
  onClose,
  residency,
}: {
  isOpen: boolean;
  onClose: () => void;
  residency: Residency;
}) => {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(2.5);
  const [salary, setSalary] = useState(0);
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [anonymously, setAnonymously] = useState(false);
  const [currentTechnology, setCurrentTechnology] = useState<string>("");
  const [currentBenefits, setCurrentBenefits] = useState<string>("");

  const [technologyOptions, setTechnologyOptions] = useState<string[]>([]);
  const [benefitsOptions, setBenefitsOptions] = useState<string[]>([]);

  const getData = async () => {
    try {
      const { items: benefits }: { items: { value: string }[] } = await pb
        .collection("benefits")
        .getList(1, 50);
      setBenefitsOptions(benefits.map((benefit) => benefit.value));
      const { items: technologies }: { items: { value: string }[] } = await pb
        .collection("technologies")
        .getList(1, 50);
      setTechnologyOptions(technologies.map((technology) => technology.value));
    } catch (err: any) {
      if (!err.isAbort) {
        console.warn("non cancellation error:", err);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {`Review your time at ${residency.name}`}
            </ModalHeader>
            <ModalBody>
              <Slider
                label="Choose a rating!"
                color="foreground"
                size="sm"
                step={0.5}
                maxValue={5}
                marks={[
                  {
                    value: 0,
                    label: "0",
                  },
                  {
                    value: 2.5,
                    label: "2.5",
                  },
                  {
                    value: 5,
                    label: "5",
                  },
                ]}
                defaultValue={2.5}
                className="max-w-md [&_label]:after:content-['*'] [&_label]:after:pl-1 [&_label]:after:text-red-500 [&_label]:after:font-bold"
                onChange={(e) => setScore(e as number)}
              />
              <Input
                type="number"
                label="Salary (P/A)"
                placeholder="€24,000"
                step={1000}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">€</span>
                  </div>
                }
                value={salary.toString()}
                onChange={(e) => setSalary(e.target.value as unknown as number)}
                labelPlacement="outside"
              />
              <Textarea
                type="text"
                label="Review"
                placeholder="It was a fantastic experience. I worked on..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                labelPlacement="outside"
              />

              <Autocomplete
                allowsCustomValue
                label="Technologies"
                variant="bordered"
                className="max-w-xs"
                onInputChange={(e) => setCurrentTechnology(e.toLowerCase())}
                defaultItems={technologyOptions}
                onKeyDown={(e) => {
                  if (
                    e.code == "Enter" &&
                    !technologies.includes(currentTechnology.toLowerCase())
                  ) {
                    setTechnologies((prev) => [...prev, currentTechnology]);
                  }
                }}
                onSelectionChange={(e) => {
                  if (
                    e &&
                    !technologies.includes((e as string).toLowerCase())
                  ) {
                    setTechnologies((prev) => [
                      ...prev,
                      (e as string).toLowerCase(),
                    ]);
                  }
                }}
              >
                {technologyOptions.map((item) => (
                  <AutocompleteItem key={item}>
                    {item.toUpperCase()}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <div className="flex gap-2 w-full overflow-scroll">
                {technologies.map((technology) => (
                  <Chip
                    key={technology}
                    className="cursor-pointer hover:scale-105 duration-200 mb-3"
                    onClick={() => {
                      setTechnologies((prev) =>
                        prev.filter((value) => value != technology)
                      );
                    }}
                  >
                    <div className="relative group">
                      <X
                        size={20}
                        className="w-full absolute text-transparent group-hover:text-black"
                      />
                      <div className="w-full flex relative group justify-center items-center">
                        <p className="w-full group-hover:invisible">
                          {technology.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </Chip>
                ))}
              </div>
              <Autocomplete
                allowsCustomValue
                label="Benefits"
                variant="bordered"
                className="max-w-xs"
                onInputChange={(e) => setCurrentBenefits(e)}
                defaultItems={benefitsOptions}
                onKeyDown={(e) => {
                  if (
                    e.code == "Enter" &&
                    !benefits.includes(currentBenefits.toLowerCase())
                  ) {
                    setBenefits((prev) => [...prev, currentBenefits]);
                  }
                }}
                onSelectionChange={(e: any) => {
                  if (e && !benefits.includes((e as string).toLowerCase())) {
                    setBenefits((prev) => [
                      ...prev,
                      (e as string).toLowerCase(),
                    ]);
                  }
                }}
              >
                {benefitsOptions.map((item) => (
                  <AutocompleteItem key={item}>
                    {item.toUpperCase()}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <div className="flex gap-2  w-full overflow-scroll  px-2">
                {benefits.map((technology) => (
                  <Chip
                    key={technology}
                    className="cursor-pointer hover:scale-105 duration-200 mb-3"
                    onClick={() => {
                      setBenefits((prev) =>
                        prev.filter((value) => value != technology)
                      );
                    }}
                  >
                    <div className="relative group">
                      <X
                        size={20}
                        className="w-full absolute text-transparent group-hover:text-black"
                      />
                      <div className="w-full flex relative group justify-center items-center">
                        <p className="w-full group-hover:invisible">
                          {technology.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </Chip>
                ))}
              </div>
              <Checkbox
                isSelected={anonymously}
                onValueChange={(_) =>
                  setAnonymously((previous) => {
                    return !previous;
                  })
                }
              >
                Submit anonymously
              </Checkbox>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  setLoading(true);
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  const userId = pb.authStore.model
                    ? pb.authStore.model.id
                    : undefined;
                  setLoading(true);
                  await addReview(
                    score,
                    residency,
                    salary == 0 ? undefined : salary,
                    description,
                    anonymously ? undefined : userId,
                    technologies,
                    benefits
                  );
                  onClose();
                  //   addCopies(quantity, residencyId).then(() => onClose());
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default function ResidencyPage({
  params,
}: {
  params: { residency_id: string };
}) {
  const [residency, setResidency] = useState<Residency>();
  const [loading, setLoading] = useState(0);
  const [reviews, setReviews] = useState<Review[]>();
  const [dataStale, setDateStale] = useState(true);

  const router = useRouter();

  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal,
  } = useDisclosure({ onClose: () => setDateStale(true) });

  async function getResidency(id: string) {
    try {
      const record: Residency = await pb.collection("residencies").getOne(id);
      const url = pb.files.getUrl(record, record.logo);
      record.logo = url;
      setResidency(record);
    } catch (err: any) {
      if (!err.isAbort) {
        console.warn("non cancellation error:", err);
      }
    }
  }

  async function getReviews(residencyId: string) {
    try {
      const { items } = await pb
        .collection("residency_reviews")
        .getList(1, 50, {
          filter: `residency = "${residencyId}"`,
          sort: "-created",
          expand: "user",
        });
      if (items) {
        setReviews(
          items.map((item: any) => {
            item.residency = residency;
            item.user = item.expand ? item.expand.user : undefined;
            return item as unknown as Review;
          })
        );
      }
    } catch (err: any) {
      if (!err.isAbort) {
        console.warn("non cancellation error:", err);
      }
    }
  }
  useEffect(() => {
    if (dataStale) {
      getResidency(params.residency_id).then(() => {
        getReviews(params.residency_id).then(() => {
          setLoading((previous) => previous + 1);
          setDateStale(false);
        });
      });
    }
  }, [dataStale]);

  if (loading == 0) return <p>Loading...</p>;
  if (!residency) return <p>No residency data</p>;

  return (
    <div className="flex lg:px-20 md:px-8 px-2 w-full flex-col items-center justify-start pt-10">
      <AddModel
        isOpen={isOpenAddModal}
        onClose={() => {
          onCloseAddModal();
          setDateStale(true);
        }}
        residency={residency}
      />
      <div className="flex flex-col lg:flex-row w-full items-between">
        <div className="w-full flex flex-col md:flex-row lg:justify-start items-center md:items-start md:gap-8">
          <img
            className="h-[250px] w:full lg:w-[250px] xl:w-[400px] rounded-lg object-contain"
            src={residency?.logo}
          />
          <div className="flex w-[0px] h-[0px] lg:w-full overflow-hidden md:overflow-auto md:h-[250px] flex-col justify-end">
            <h1 className="text-left text-5xl font-bold">{residency.name}</h1>
            <h2 className="text-left w-[400px] text-4xl font-medium pb-4">
              {residency.description}
            </h2>
          </div>
        </div>
        <div className="flex flex-col justify-end items-center lg:pt-0 pt-8 gap-3 lg:gap-2">
          <Link
            className="w-full"
            href={
              residency.website.match(/https?:\/\/.*/g)
                ? residency.website
                : "http://" + residency.website
            }
            target="_blank"
          >
            <Button className="w-full text-xl bg-gray-600 px-4 py-2 text-white font-medium hover:scale-105 hover:bg-gray-900">
              View website
            </Button>
          </Link>
          <Button
            onClick={() => onOpenAddModal()}
            className="w-full text-xl bg-white px-4 py-2 text-black border-1 border-gray-200 font-medium hover:scale-105 hover:bg-gray-100"
          >
            Add review
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center pt-6 lg:pt-12">
        <h2 className="text-4xl font-bold text-center pb-6">Reviews</h2>
        <div className="flex flex-col w-full">
          {reviews?.map((review) => (
            <ReviewContainer key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
