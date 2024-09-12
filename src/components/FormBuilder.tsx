import React, { useState } from "react";
import DropdownOptions from "./common/DropdownOptions";

export interface Field {
  id: string;
  type: string;
  label: string;
  value: string | number;
  options?: string[];
}

interface FormBuilderProps {
  addField: (field: Omit<Field, "id">) => void;
  onClose: () => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ addField, onClose }) => {
  const [newFieldType, setNewFieldType] = useState<string>("text");
  const [newFieldName, setNewFieldName] = useState<string>("");
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const handleAddField = () => {
    if (newFieldName.trim() === "") {
      setError("Field name is required.");
      return;
    }

    if (newFieldType === "dropdown" && dropdownOptions.length === 0) {
      setError("Please add at least one option for the dropdown.");
      return;
    }

    const newField: Omit<Field, "id"> = {
      type: newFieldType,
      label: newFieldName,
      value: "",
      ...(newFieldType === "dropdown" && { options: dropdownOptions }),
    };

    addField(newField);
    setNewFieldName("");
    setDropdownOptions([]);
    setError("");
    onClose();
  };

  return (
    <div className="mb-4 flex flex-col space-y-2">
      <label htmlFor="field-name" className="text-sm font-medium text-gray-700">
        Field Name:
      </label>
      <input
        id="field-name"
        value={newFieldName}
        onChange={(e) => setNewFieldName(e.target.value)}
        placeholder="Enter field name"
        className="border border-gray-300 rounded-md px-2 py-1"
      />

      <label htmlFor="field-type" className="text-sm font-medium text-gray-700">
        Select Field Type:
      </label>
      <select
        id="field-type"
        value={newFieldType}
        onChange={(e) => setNewFieldType(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1"
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="dropdown">Dropdown</option>
      </select>

      {newFieldType === "dropdown" && (
        <DropdownOptions
          options={dropdownOptions}
          setOptions={setDropdownOptions}
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleAddField}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Add Field
      </button>
    </div>
  );
};

export default FormBuilder;
