import React, { useRef, useState } from "react";
import { BiCheck, BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import ImagePicker from "./ImagePicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BiTrash } from "react-icons/bi";

// Define Yup validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title must be 50 characters or less"),
  image: Yup.mixed().required("Image is required"),
});

const ProductImagePicker = ({ images, setImages }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const formikRef = useRef();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Handle form submission
  const handleImageSubmit = (values, { resetForm, setSubmitting }) => {
    // alert(JSON.stringify(values));
    const newImage = {
      title: values.title,
      src: values.image,
    };
    setImages([...images, newImage]);
    setSubmitting(false);
    resetForm();
    closeModal();
  };

  const handleRemove = (index) => {
    setImages([...images]?.filter((_, i) => i !== index));
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-lg w-1/3 p-6 shadow-lg">
            {/* Modal header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Product Image</h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
            </div>

            {/* Formik Form */}
            <Formik
              initialValues={{ title: "", image: null }}
              validationSchema={validationSchema}
              onSubmit={handleImageSubmit}
              innerRef={formikRef}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  {/* Title Field */}
                  <div className="mb-4">
                    <label htmlFor="title" className="form-label">
                      Title / Alt
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="form-input"
                      placeholder="Enter Title"
                      id="title"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Image Picker Field */}
                  <div className="mb-4">
                    <label htmlFor="imagePicker" className="form-label">
                      Choose Image
                    </label>
                    <ImagePicker
                      width={800}
                      height={800}
                      ratio={1 / 1}
                      image={values.image}
                      done={(img) => setFieldValue("image", img)}
                      thumbs={[
                        { width: 800, height: 800 },
                        { width: 255, height: 255 },
                        { width: 128, height: 128 },
                      ]}
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Modal Actions */}
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 flex items-center gap-2"
                    >
                      <CgClose /> Close
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !values.image}
                      className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <BiCheck /> Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Add Image Button */}
      <div>
        <button
          type="button"
          onClick={openModal}
          className="flex items-center justify-center bg-primary-600 text-center text-white py-2 px-4 rounded-full hover:bg-primary-300"
        >
          <BiPlus /> Add Image
        </button>
      </div>
      <div className="grid grid-cols-10 gap-4 py-3">
        {images?.map((img, index) => (
          <div key={index} className="border rounded-lg p-3 relative">
            <button
              type="button"
              className="bg-red-800 text-white p-1 rounded-md absolute end-[2px] top-[2px]"
              onClick={() => handleRemove(index)}
            >
              <BiTrash />
            </button>
            <img
              src={img.src[img.src.length - 1].image}
              alt={img.title}
              className="w-full mb-2"
            />
            <div className="text-center">{img.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImagePicker;
