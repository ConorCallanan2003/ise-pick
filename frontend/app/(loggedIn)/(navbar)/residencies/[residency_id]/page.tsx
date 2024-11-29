"use client";
import { pb } from "@/lib/pb";
import { Button, Link, useDisclosure } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { Residency } from "../page";
import { ChevronLeft, X } from "lucide-react";
import ReviewContainer from "@/app/components/review-container";
import AddReviewModal from "@/app/components/modals/AddReviewModal";
import ModifiableReviewContainer from "@/app/components/modifiable-review-container";

type User = {
  id: string;
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

export default function ResidencyPage({
  params,
}: {
  params: { residency_id: string };
}) {
  const [residency, setResidency] = useState<Residency>();
  const [reviews, setReviews] = useState<Review[]>();
  const dataStale = useRef<boolean>(true);
  const loading = useRef<boolean>(false);

  const setDataStale = () => {
    dataStale.current = true;
  };

  const [technologyOptions, setTechnologyOptions] = useState<string[]>([]);
  const [benefitsOptions, setBenefitsOptions] = useState<string[]>([]);

  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal,
  } = useDisclosure({ onClose: () => {} });

  async function getResidency(id: string) {
    try {
      const record: Residency = await pb.collection("residencies").getOne(id);
      const url = pb.files.getUrl(record, record.logo);
      record.logo = url;
      return record;
    } catch (err: any) {
      if (!err.isAbort) {
        console.warn("non cancellation error:", err);
      }
    }
  }

  async function getReviews(returnedResidency: Residency) {
    try {
      const { items } = await pb
        .collection("residency_reviews")
        .getList(1, 50, {
          filter: `residency = "${returnedResidency.id}"`,
          sort: "-created",
          expand: "user",
        });
      if (items) {
        return items.map((item: any) => {
          item.residency = returnedResidency;
          item.user = item.expand ? item.expand.user : undefined;
          return item as unknown as Review;
        });
      }
    } catch (err: any) {
      if (!err.isAbort) {
        console.warn("non cancellation error:", err);
      }
    }
  }

  const getTechnologiesAndBenefits = async () => {
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
    getTechnologiesAndBenefits();
  }, []);

  useEffect(() => {
    if (dataStale.current && !loading.current) {
      loading.current = true;
      getResidency(params.residency_id).then(
        (returnedResidency: Residency | undefined) => {
          if (returnedResidency) {
            getReviews(returnedResidency).then(
              (returnedReviews: Review[] | undefined) => {
                if (returnedReviews && returnedResidency) {
                  setResidency(returnedResidency);
                  setReviews(returnedReviews);
                  dataStale.current = false;
                }
                loading.current = false;
              }
            );
          }
        }
      );
    }
  }, [dataStale.current]);

  if (dataStale.current)
    return (
      <div className="w-full h-[600px] pt-10 flex flex-col justify-center items-center">
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
    );

  if (!residency) {
    return (
      <div className="w-full h-full flex justify-center items-center text-2xl">
        Error retrieving residency data...
      </div>
    );
  }

  return (
    <div className="flex lg:px-18 md:px-8 px-2 w-full flex-col items-center justify-start pt-6">
      {dataStale.current ? (
        <div className="w-full h-[600px] pt-10 flex flex-col justify-center items-center">
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
        <>
          <AddReviewModal
            isOpen={isOpenAddModal}
            onClose={() => {
              onCloseAddModal();
            }}
            residency={residency}
            setDataStale={setDataStale}
          />
          <div className="w-screen h-[80px] flex justify-start items-center">
            <Link href="/residencies">
              <ChevronLeft className="absolute [&_*]:cursor-pointer cursor-pointer h-[50px] w-[50px] left-[20px] rounded-full text-black hover:bg-gray-200 duration-200 p-2 pr-" />
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row w-full items-between">
            <div className="w-full flex flex-col md:flex-row lg:justify-start items-center md:items-start md:gap-8">
              <img
                className="h-[250px] w:full lg:w-[250px] xl:w-[400px] rounded-lg object-contain"
                src={residency?.logo}
              />
              <div className="flex w-[0px] h-[0px] lg:w-full overflow-hidden md:overflow-auto md:h-[250px] flex-col justify-end">
                <h1 className="text-left text-5xl font-bold">
                  {residency.name}
                </h1>
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
            {reviews ? (
              <>
                <h2 className="text-4xl font-bold text-center pb-6">Reviews</h2>
                <div className="flex flex-col w-full">
                  {reviews?.map((review) =>
                    pb.authStore.model!.id == review.user!.id ? (
                      <ModifiableReviewContainer
                        key={review.id}
                        review={review}
                        technologyOptions={technologyOptions}
                        benefitsOptions={benefitsOptions}
                      />
                    ) : (
                      <ReviewContainer key={review.id} review={review} />
                    )
                  )}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-center pb-6">
                  No Reviews
                </h2>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
