import { pb } from "@/lib/pb";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

export default function AddResidencyModal({
  setDataStale,
  isOpen,
  onClose,
}: {
  setDataStale: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  onClose: () => void;
}) {
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
                  onPress={() => setDataStale(true)}
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
}
