import React, { useState } from "react";
import { Field } from "../FormBuilder";

interface InputFieldProps {
  field: Field;
  onChange: (value: string | number) => void;
}

const InputField: React.FC<InputFieldProps> = ({ field, onChange }) => {
  const { type, value, options } = field;
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newValue =
      type === "number" ? Number(e.target.value) : e.target.value;

    if (type === "text" && (newValue as string).trim() === "") {
      setError("Text field is required");
    } else if (type === "number" && isNaN(newValue as number)) {
      setError("Please enter a valid number");
    } else {
      setError(null);
    }

    onChange(newValue);
  };

  return (
    <div>
      {type === "text" && (
        <input
          type="text"
          value={value as string}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
      )}

      {type === "number" && (
        <input
          type="number"
          value={value as number}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
      )}

      {type === "dropdown" && (
        <select
          value={value as string}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select an option</option>
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
