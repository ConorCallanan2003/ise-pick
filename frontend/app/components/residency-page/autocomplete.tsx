import { Check } from "lucide-react";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEventHandler,
} from "react";

export default function AutocompleteTextInput({
  placeholder,
  options,
  name,
  label,
  onChange,
  onSelect,
  includeLabel = true,
  onEscapePressed,
  enterButton,
  size = "sm",
}: {
  placeholder: string;
  options: string[];
  name: string;
  label: string;
  onChange: (value: string) => void;
  onSelect: (option: string) => void;
  includeLabel?: boolean;
  onEscapePressed?: () => void;
  enterButton?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filteredSuggestions = options.filter((option: string) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, options]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setInputValue(userInput);
    setActiveSuggestionIndex(0);
    onChange(userInput);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (onEscapePressed && event.key == "Escape") {
      onEscapePressed();
    }
    if (event.key == "ArrowUp") {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex((prev) => prev - 1);
        console.log(suggestions[activeSuggestionIndex]);
      }
    }
    if (event.key == "ArrowDown") {
      if (activeSuggestionIndex < suggestions.length - 1) {
        setActiveSuggestionIndex((prev) => prev + 1);
        console.log(suggestions[activeSuggestionIndex]);
      }
    }
    if (event.key == "Enter") {
      if (suggestions[activeSuggestionIndex]) {
        onSelect(suggestions[activeSuggestionIndex]);
      } else {
        onSelect(inputValue);
      }
      setInputValue("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    onSelect(option);
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = () => {
    if (inputValue == "") {
      return;
    }
    onSelect(inputValue);
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div
      className={`w-full  ${size != "sm" && "border-2 border-gray-400 rounded-lg"}`}
    >
      <div className={`relative flex flex-col items-center justify-center`}>
        {includeLabel && (
          <label className="text-sm pb-2" htmlFor={name}>
            {label}
          </label>
        )}
        <input
          autoComplete="off"
          autoFocus
          name={name}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`input-field w-${includeLabel ? "2/3" : "full"} text-black pointer-text ${size == "sm" ? "sm:text-sm" : "text-" + size} ${showSuggestions ? "rounded-t-lg" : "rounded-lg"} bg-gray-100 border-gray-100 py-3 px-3 focus:outline-none duration-200`}
        />
        {enterButton && (
          <div
            onClick={() => handleSubmit()}
            className={`absolute text-md select-none ${inputValue != "" ? "hover:scale-105 duration-200 cursor-pointer bg-black" : "bg-gray-600"}  right-0 flex rounded-lg items-center justify-center px-3 mr-1 py-2 text-white font-bold`}
          >
            <Check />
          </div>
        )}
      </div>
      {showSuggestions && (
        <ul
          className={`z-10 max-h-36 overflow-scroll w-${includeLabel ? "2/3" : "full"} text-black pointer-text sm:text-sm text-lg ${showSuggestions ? "rounded-b-lg" : "rounded-lg"} bg-gray-100 border-gray-100 duration-200 cursor-text `}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={
                activeSuggestionIndex === index
                  ? "suggestion bg-gray-200 py-2 px-2"
                  : "suggestion py-2 px-2 hover:bg-gray-300"
              }
              onClick={() => handleOptionSelect(suggestion)}
            >
              {suggestion.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
