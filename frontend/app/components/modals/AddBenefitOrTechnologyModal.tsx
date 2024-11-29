import AutocompleteTextInput from "../residency-page/autocomplete";

export default function AddBenefitOrTechnologyModal({
  placeholder,
  options,
  name,
  label,
  onChange,
  onSelect,
  closeModal,
}: {
  placeholder: string;
  options: string[];
  name: string;
  label: string;
  title: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  closeModal: () => void;
}) {
  return (
    <>
      <div
        className="fixed top-0 right-0 bottom-0 left-0 pb-[200px] backdrop-blur-sm z-20 flex justify-center items-center"
        onClick={closeModal}
      >
        <div
          className="relative w-[400px] h-[60px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-lg shadow-2xl">
            <AutocompleteTextInput
              placeholder={placeholder}
              options={options}
              name={name}
              label={label}
              onChange={onChange}
              onSelect={onSelect}
              includeLabel={false}
              onEscapePressed={() => closeModal()}
              enterButton
              size="lg"
            />
          </div>
        </div>
      </div>
      <div className="fixed top-10 right-0 left-0 rounded-xl z-20 flex justify-center items-center">
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <div className="text-white flex flex-col gap-2 bg-gray-900 px-10 py-6 rounded-xl text-lg font-bold shadow-2xl">
            <p>Enter the currently selected value: ⏎</p>
            <p>
              Enter a custom value:{" "}
              {navigator.platform.toUpperCase().indexOf("MAC") >= 0
                ? "⌘"
                : "CTRL"}{" "}
              + ⏎{" OR Click the button"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
