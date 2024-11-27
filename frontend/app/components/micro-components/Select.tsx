import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const DropdownSelect: React.FC<Props> = ({
  options,
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <div
        className={`w-full flex flex-col select-none border-transparent sm:w-[240px] w-full focus:ring-gray-500 focus:border-gray-500 focus:outline-none duration-100 cursor-pointer bg-gray-200 text-gray-700 text-md px-3 py-3 leading-none ${isOpen ? "rounded-t-2xl" : "rounded-2xl"}`}
        onClick={handleDropdownClick}
      >
        <p className="text-xs text-gray-400 leading-none pb-[2px]">Sort by</p>

        {options.find((option) => option.value === selectedValue)?.label || ""}
      </div>
      {isOpen && (
        <div className="w-[240px] flex flex-col absolute select-none z-10 bg-gray-100 p-1 rounded-b-xl">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select-none duration-300 p-2 rounded-lg ${
                selectedValue === option.value
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-300 bg-gray-100 cursor-pointer"
              }`}
              onClick={
                selectedValue === option.value
                  ? () => null
                  : () => handleOptionClick(option)
              }
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
