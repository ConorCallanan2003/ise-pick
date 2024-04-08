"use client";
import ResidencyContainer from "@/app/(loggedIn)/residencies/components/residency-container";
import { pb } from "@/lib/pb";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type Residency = {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  avgScore?: number;
  countScore?: number;
};

const AddAddResidencyModal = ({
  setDataStale,
  isOpen,
  onClose,
}: {
  setDataStale: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <form
              onSubmit={async (e: any) => {
                const keys = ["name", "description", "logo", "website"];
                e.preventDefault();
                const formData = keys.reduce(
                  (acc, key) => ({
                    ...acc,
                    [key]:
                      key == "logo"
                        ? e.target[key].files[0]
                        : e.target[key].value,
                  }),
                  {}
                );
                const createdRecord = await pb
                  .collection("residencies")
                  .create(formData);
                onClose();
                setDataStale(true);
              }}
            >
              <ModalHeader className="flex flex-col gap-1">
                Add new residency partner
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <h3 className="text-sm -mb-3">Company logo</h3>
                  <input
                    type="file"
                    name="logo"
                    className="px-1 py-1 file:cursor-pointer file:hover:scale-105 file:duration-200 file:font-medium file:text-gray-600 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                  <Input
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="ACME Inc."
                    labelPlacement="outside"
                  />
                  <Input
                    type="text"
                    name="description"
                    label="Description"
                    placeholder="ACME Corporation: Where innovation meets calamity"
                    labelPlacement="outside"
                  />
                  <Input
                    type="text"
                    name="website"
                    label="Website"
                    placeholder="www.acme.gov"
                    labelPlacement="outside"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  className="text-white font-medium bg-green-500 hover:bg-green-550 hover:scale-105"
                >
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default function ResidenciesPage() {
  const [residencies, setResidencies] = useState<Residency[]>([]);
  const [dataStale, setDataStale] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isOpen: isAddResidencyModalOpen,
    onOpen: onAddResidencyModalOpen,
    onClose: onAddResidencyModalClose,
  } = useDisclosure();

  const getResidencies = async () => {
    try {
      const { items }: { items: Residency[] } = await pb
        .collection("residencies_with_reviews")
        .getList(
          1,
          50,
          searchTerm != "" ? { filter: `name ~ "%${searchTerm}%"` } : {}
        );
      if (items) {
        items.map((item) => {
          const url = pb.files.getUrl(item, item.logo, {
            thumb: "100x250",
          });

          item.logo = url;
        });
        setResidencies(items);
      }
    } catch (err: any) {
      if (!err.isAbort) {
        console.warn("non cancellation error:", err);
      }
    }
  };

  useEffect(() => {
    if (dataStale) {
      getResidencies();
      setDataStale(false);
    }
  }, [dataStale]);
  return (
    <div className="w-full h-full pt-10 flex flex-col justify-center items-center">
      <AddAddResidencyModal
        setDataStale={setDataStale}
        isOpen={isAddResidencyModalOpen}
        onClose={onAddResidencyModalClose}
      />
      <input
        placeholder="Search"
        className="border-2 rounded-lg text-lg px-2 py-1"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setDataStale(true);
        }}
      />
      <div className="grid xlg:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8 py-8 px-8">
        {residencies.map((residency) => {
          return (
            <ResidencyContainer
              key={residency.id}
              name={residency.name}
              description={residency.description}
              id={residency.id}
              image={residency.logo}
              avgScore={residency.avgScore}
              countScore={residency.countScore}
            ></ResidencyContainer>
          );
        })}
        {searchTerm ? (
          <></>
        ) : (
          <div onClick={() => onAddResidencyModalOpen()}>
            <Card className="p-1 h-full min-h-[300px] min-w-[250px] cursor-pointer w-full hover:scale-105 duration-200">
              <CardBody className="overflow-visible py-2 flex flex-col justify-center items-center">
                <Plus size={160} />
              </CardBody>
              <CardFooter>
                <h2 className="select-none text-3xl font-medium text-center w-full">
                  ADD
                </h2>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
