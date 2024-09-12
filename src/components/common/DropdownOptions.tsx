import React, { useState } from "react";

interface DropdownOptionsProps {
  options: string[];
  setOptions: (options: string[]) => void;
}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({
  options,
  setOptions,
}) => {
  const [newOption, setNewOption] = useState<string>("");

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="dropdown-option"
        className="text-sm font-medium text-gray-700"
      >
        Add Dropdown Options:
      </label>
      <div className="flex space-x-2">
        <input
          id="dropdown-option"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Enter option"
          className="border border-gray-300 rounded-md px-2 py-1"
        />
        <button
          type="button"
          onClick={handleAddOption}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add Option
        </button>
      </div>
      {options.length > 0 && (
        <ul className="space-y-1">
          {options.map((option, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-black"
            >
              <span>{option}</span>
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownOptions;
