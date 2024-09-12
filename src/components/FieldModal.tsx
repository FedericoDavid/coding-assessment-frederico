import React, { useRef, useEffect } from "react";
import FormBuilder, { Field } from "./FormBuilder";

interface FieldModalProps {
  isOpen: boolean;
  addField: (field: Omit<Field, "id">) => void;
  onClose: () => void;
}

const FieldModal: React.FC<FieldModalProps> = ({
  isOpen,
  addField,
  onClose,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <dialog
      id="field-modal"
      className="modal p-4 bg-white rounded-lg shadow-md space-y-12 border-none"
      ref={modalRef}
      open={isOpen}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold text-black mb-3">Add extra field</h3>
        <FormBuilder addField={addField} onClose={onClose} />
      </div>
    </dialog>
  );
};

export default FieldModal;
