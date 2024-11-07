import React, { useState } from "react";
import Modal from "./Modal";
import SeoMeta from "./SeoMeta";

const AddModal = ({
  isOpen,
  onClose,
  onAddCategory,
  title,
  inputLabel,
  buttonText,
  imageLabel,
}) => {
  const [newCategory, setNewCategory] = useState({ name: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [rootCategory, setRootCategory] = useState("ROOT");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategory({ ...newCategory, image: file });
      // Create a preview URL for the selected image
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCategory(newCategory); // Call the parent function to add the category
    onClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">{inputLabel}</label>
          <input
            type="text"
            required
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Parent Category</label>
          <select
            value={rootCategory}
            onChange={(e) => setEntries(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="ROOT">ROOT</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">{imageLabel}</label>
          <input
            type="file"
            required
            onChange={handleImageChange} // Handle image selection
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-24 object-cover"
            />
          )}
        </div>
        <SeoMeta />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose} // Cancel button to close the modal
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddModal;
