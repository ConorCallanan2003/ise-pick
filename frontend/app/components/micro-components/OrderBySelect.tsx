"use client";
import DropdownSelect from "./Select";

export default function OrderBySelectComponent({
  onChange,
  currentValue,
}: {
  onChange: (newKey: string) => void;
  currentValue: string;
}) {
  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Rating", value: "-avgScore" },
    { label: "# Reviews", value: "-countScore" },
  ];
  return (
    <DropdownSelect
      options={sortOptions}
      selectedValue={currentValue}
      onChange={onChange}
    />
  );
}
