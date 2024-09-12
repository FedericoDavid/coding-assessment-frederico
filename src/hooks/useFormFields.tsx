import { useState, useId } from "react";

interface Field {
  id: string;
  type: string;
  label: string;
  value: string | number;
}

const useFormFields = () => {
  const [fields, setFields] = useState<Field[]>([]);

  const addField = (newField: Omit<Field, "id">) => {
    const field = {
      ...newField,
      id: useId + Math.random().toString(36).substr(2, 9),
    };

    setFields([...fields, field]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateFieldValue = (id: string, value: string | number) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  return {
    fields,
    addField,
    removeField,
    updateFieldValue,
  };
};

export default useFormFields;
