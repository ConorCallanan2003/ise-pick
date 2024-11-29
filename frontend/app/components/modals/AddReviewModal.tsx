import { Residency } from "@/app/(loggedIn)/(navbar)/residencies/page";
import {
  Button,
  Checkbox,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  Textarea,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Autocomplete from "../residency-page/autocomplete";
import { X } from "lucide-react";
import { pb } from "@/lib/pb";

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

  await pb.collection("residency_reviews").create(data);

  return;
}

export default function AddReviewModal({
  isOpen,
  onClose,
  residency,
  setDataStale,
}: {
  isOpen: boolean;
  onClose: () => void;
  residency: Residency;
  setDataStale: () => void;
}) {
  const [score, setScore] = useState(2.5);
  const [salary, setSalary] = useState(0);
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [anonymously, setAnonymously] = useState(false);

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
    <Modal
      backdrop="blur"
      isDismissable={false}
      isOpen={isOpen}
      onClose={onClose}
    >
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
                placeholder="24,000"
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
                placeholder={"Technology"}
                options={technologyOptions}
                onChange={() => null}
                onSelect={(item) => {
                  if (!technologies.includes(item.toLowerCase())) {
                    setTechnologies((prev) => [...prev, item.toLowerCase()]);
                  }
                }}
                name={"technology"}
                label={"Technology"}
              ></Autocomplete>
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
                placeholder={"Benefits"}
                options={benefitsOptions}
                onChange={() => null}
                onSelect={(item) => {
                  if (!benefits.includes(item.toLowerCase())) {
                    setBenefits((prev) => [...prev, item.toLowerCase()]);
                  }
                }}
                name={"benefits"}
                label={"Benefits"}
              ></Autocomplete>
              <div className="flex gap-2 w-full overflow-scroll">
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
                  await addReview(
                    score,
                    residency,
                    salary == 0 ? undefined : salary,
                    description,
                    anonymously ? undefined : userId,
                    technologies,
                    benefits
                  );
                  setDataStale();
                  onClose();
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
}
