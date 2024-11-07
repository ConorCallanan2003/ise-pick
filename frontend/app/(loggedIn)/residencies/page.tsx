"use client";
import ResidencyContainer from "@/app/(loggedIn)/residencies/components/residency-container";
import { pb } from "@/lib/pb";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
      <div className="w-full flex justify-end">
        <input
          placeholder="Search"
          type="search"
          className="border-3 border-transparent sm:w-[240px] w-full focus:ring-gray-500 focus:border-gray-500 focus:outline-none duration-200 cursor-text rounded-2xl bg-gray-200 text-black text-lg px-3 py-2"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setDataStale(true);
          }}
        />
      </div>
      {dataStale ? (
        <div className="w-full h-[800px] pt-10 flex flex-col justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid xlg:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 py-8">
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
            <div
              className="[&_*]:cursor-pointer"
              onClick={() => onAddResidencyModalOpen()}
            >
              <Card className="p-1 h-full min-h-[300px] min-w-[250px] w-full hover:scale-105 duration-200">
                <CardBody className="overflow-visible py-2 flex flex-col justify-center items-center">
                  <Plus size={160} />
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
