import React from "react";

const Modal = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-2/3 ">
        <h3 className="text-xl font-semibold mb-4 px-6 py-3">{title}</h3>
        <button onClick={onClose} className="absolute top-2 right-2">
          &times; {/* Close button */}
        </button>
        <div className="max-h-[80vh] overflow-auto px-6 py-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
