import React, { useState, useEffect } from "react";
import axios from "axios";
import { Field } from "./FormBuilder";
import InputField from "./common/InputField";

interface FormSubmitterProps {
  fields: Field[];
  onOpen: () => void;
  removeField: (id: string) => void;
  updateFieldValue: (id: string, value: string | number) => void;
  onFormSubmit: (payload: object) => void;
}

const FormSubmitter: React.FC<FormSubmitterProps> = ({
  fields,
  onOpen,
  removeField,
  updateFieldValue,
  onFormSubmit,
}) => {
  const [email, setEmail] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [formDataStatic, setFormDataStatic] = useState({
    name: "",
    message: "",
  });

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const validateFields = (): boolean => {
    let fieldErrors: string[] = [];

    if (email.trim() === "") {
      fieldErrors.push("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      fieldErrors.push("Please enter a valid email address.");
    }

    if (formDataStatic.name.trim() === "") {
      fieldErrors.push("Name is required.");
    }

    if (formDataStatic.message.trim() === "") {
      fieldErrors.push("Message is required.");
    }

    fields.forEach((field) => {
      if (field.type === "text" && (field.value as string).trim() === "") {
        fieldErrors.push(`${field.label} is required.`);
      }

      if (field.type === "number" && isNaN(field.value as number)) {
        fieldErrors.push(`${field.label} must be a valid number.`);
      }

      if (
        field.type === "dropdown" &&
        (field.value === "" || field.value === undefined)
      ) {
        fieldErrors.push(`Please select an option for ${field.label}.`);
      }
    });

    setErrors(fieldErrors);
    return fieldErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFields()) return;

    setIsSending(true);

    const payload = {
      to: email,
      formData: {
        ...formDataStatic,
        ...fields.reduce(
          (acc, field) => ({ ...acc, [field.label]: field.value }),
          {}
        ),
      },
    };

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        payload
      );

      if (res.data) {
        alert("Form submitted successfully!");
        onFormSubmit(payload);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Form Submission</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Recipient Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className={`w-full px-4 py-2 border ${
              errors.includes("Email is required.") ||
              errors.includes("Please enter a valid email address.")
                ? "border-red-500"
                : "border-gray-600"
            } rounded-md bg-gray-800 text-gray-300`}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={formDataStatic.name}
            onChange={(e) =>
              setFormDataStatic({ ...formDataStatic, name: e.target.value })
            }
            placeholder="Enter your name"
            className={`w-full px-4 py-2 border ${
              errors.includes("Name is required.")
                ? "border-red-500"
                : "border-gray-600"
            } rounded-md bg-gray-800 text-gray-300`}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300"
          >
            Message:
          </label>
          <textarea
            id="message"
            value={formDataStatic.message}
            onChange={(e) =>
              setFormDataStatic({ ...formDataStatic, message: e.target.value })
            }
            placeholder="Enter your message"
            className={`w-full px-4 py-2 border ${
              errors.includes("Message is required.")
                ? "border-red-500"
                : "border-gray-600"
            } rounded-md bg-gray-800 text-gray-300 h-32`}
          ></textarea>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Need to add some extra information?
          </p>
          <button
            type="button"
            onClick={onOpen}
            className="bg-blue-500 text-white rounded-full size-8 flex items-center justify-center text-xl hover:bg-blue-700 transition"
            title="Add field"
          >
            +
          </button>
        </div>
        {fields.length > 0 && (
          <div className="space-y-4">
            <h5 className="text-lg font-bold text-gray-300">Extra fields:</h5>

            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {field.label}:
                </label>
                <InputField
                  field={field}
                  onChange={(value) => updateFieldValue(field.id, value)}
                />
                <button
                  type="button"
                  onClick={() => removeField(field.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Remove Field
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.length > 0 && (
          <div className="text-red-500">
            <ul className="my-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          disabled={isSending}
          className={`w-full ${
            isSending ? "bg-gray-500" : "bg-blue-600"
          } text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg font-semibold`}
        >
          {isSending ? "Sending..." : "Submit Form"}
        </button>
      </form>
    </div>
  );
};

export default FormSubmitter;
