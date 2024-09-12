import React, { useState } from "react";
import FormSubmitter from "./components/FormSubmitter";
import FieldModal from "./components/FieldModal";
import useFormFields from "./hooks/useFormFields";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submittedPayload, setSubmittedPayload] = useState<object | null>(null);

  const { fields, addField, removeField, updateFieldValue } = useFormFields();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (payload: object) => {
    setSubmittedPayload(payload);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-2xl">
        <FormSubmitter
          fields={fields}
          onOpen={openModal}
          removeField={removeField}
          updateFieldValue={updateFieldValue}
          onFormSubmit={handleFormSubmit}
        />
      </div>
      <FieldModal
        addField={addField}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      {submittedPayload && (
        <div className="mt-6 bg-gray-100 text-black p-4 rounded-lg shadow-md w-full max-w-lg">
          <h3 className="text-lg font-bold my-2">Submitted Payload:</h3>
          <pre className="bg-gray-200 p-4 rounded-lg text-black">
            {JSON.stringify(submittedPayload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;
