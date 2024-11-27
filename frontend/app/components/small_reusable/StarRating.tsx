import { Star } from "lucide-react";

const FilledStar = ({ value }: { value: number }) => {
  if (value >= 1) {
    return <Star size={20} fill={"#FFC400"} color={"#FFC400"} />;
  }
  if (value <= 0) {
    return <Star size={20} fill={"white"} color={"black"} />;
  }
  return (
    <div className="relative">
      {/* <h1>test</h1> */}
      <Star
        className="absolute top-0"
        size={20}
        fill={"#FFC400"}
        color={"#FFC400"}
      />
      <div className="relative overflow-hidden left-[10px]">
        <Star
          className="relative right-[10px]"
          size={20}
          fill={"white"}
          color={"black"}
        />
      </div>
    </div>
  );
};

export default function StarRating({ value }: { value: number }) {
  return (
    <div className="flex md:pt-0 pt-4 justify-center align-center items-center">
      <h4 className="pr-1 text-md font-medium leading-none ">{value}</h4>
      <FilledStar value={value} />
      <FilledStar value={value - 1} />
      <FilledStar value={value - 2} />
      <FilledStar value={value - 3} />
      <FilledStar value={value - 4} />
    </div>
  );
}
