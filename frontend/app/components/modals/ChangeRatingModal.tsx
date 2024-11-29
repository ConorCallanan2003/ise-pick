import { Slider } from "@nextui-org/react";
import AutocompleteTextInput from "../residency-page/autocomplete";
import { useState } from "react";

export default function ChangeRatingModal({
  initialValue,
  onSelect,
  closeModal,
}: {
  initialValue: number;
  onSelect: (value: number) => void;
  closeModal: () => void;
}) {
  const [score, setScore] = useState(initialValue);

  const updateScore = () => {
    onSelect(score);
    closeModal();
  };
  return (
    <>
      <div
        className="fixed top-0 right-0 bottom-0 left-0 backdrop-blur-sm bg-blend-color-burn	 z-20 flex justify-center items-center"
        onClick={closeModal}
      >
        <div
          className="relative w-[400px] h-[180px] bg-white rounded-lg shadow-2xl p-6 border-2 border-gray-400 flex flex-col justify-center items-center gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          <Slider
            label="Rating"
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
            defaultValue={initialValue}
            className="max-w-md"
            onChange={(e) => setScore(e as number)}
          />
          <button
            onClick={() => updateScore()}
            className="px-4 py-2 rounded-lg bg-gray-800 text-white font-bold"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
