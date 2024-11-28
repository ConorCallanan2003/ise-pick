import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEventHandler,
} from "react";
import PropTypes from "prop-types";

export default function AutocompleteTextInput({
  placeholder,
  options,
  name,
  label,
  onChange,
  onSelect,
}: {
  placeholder: string;
  options: string[];
  name: string;
  label: string;
  onChange: (value: string) => void;
  onSelect: (option: string) => void;
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
      setShowSuggestions(true);
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
      if (suggestions.length == 0) {
        onSelect(inputValue);
      } else {
        onSelect(suggestions[activeSuggestionIndex]);
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

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <label className="text-sm pb-2" htmlFor={name}>
          {label}
        </label>
        <input
          name={name}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input-field w-2/3 text-black pointer-text sm:text-sm text-lg rounded-lg bg-gray-100 border-gray-100 py-3 px-3 focus:outline-none duration-200 hover:bg-gray-200"
        />
      </div>
      {showSuggestions && (
        <ul className="absolute z-10 max-h-36 overflow-scroll w-2/3 text-black pointer-text sm:text-sm text-lg rounded-lg bg-gray-100 border-gray-100 duration-200 cursor-text">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={
                activeSuggestionIndex === index
                  ? "suggestion bg-gray-200 py-2 px-2"
                  : "suggestion py-2 px-2"
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
