import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../layouts/Modal/Modal";
import ApiExecute from "../../../api";
import ImagePicker from "../../components/ImagePicker";

const AddTestimonial = ({
  isOpen,
  onClose,
  afterSubmit,
  initialData = null,
}) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    let url = initialData ? `testimonial/${initialData.id}` : "testimonial";

    let apiResponse = await ApiExecute(url, {
      method: "POST",
      data: {
        ...values,
        _method: initialData ? "PUT" : "POST",
      },
    });

    setSubmitting(false);

    if (apiResponse.status) {
      resetForm();
      afterSubmit();
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    place: Yup.string().required("Place is required"),
    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5"),
    comment: Yup.string()
      .required("Comment is required")
      .max(500, "Comment cannot exceed 500 characters"),
    image: Yup.mixed().required("Image is required"),
  });

  return (
    <Modal isOpen={isOpen} title={"Add Testimonial"} onClose={onClose}>
      <Formik
        initialValues={{
          name: initialData?.name || "",
          place: initialData?.place || "",
          rating: initialData?.rating || "",
          comment: initialData?.comment || "",
          image: null,
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched, isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-3 gap-10">
              <div className="space-y-4 col-span-2">
                <div>
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <Field name="name" className="form-input" id="name" />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  )}
                </div>

                <div>
                  <label className="form-label" htmlFor="place">
                    Place
                  </label>
                  <Field name="place" className="form-input" id="place" />
                  {errors.place && touched.place && (
                    <div className="text-red-500 text-sm">{errors.place}</div>
                  )}
                </div>

                <div>
                  <label className="form-label" htmlFor="rating">
                    Rating
                  </label>
                  <Field
                    name="rating"
                    type="number"
                    className="form-input"
                    id="rating"
                  />
                  {errors.rating && touched.rating && (
                    <div className="text-red-500 text-sm">{errors.rating}</div>
                  )}
                </div>

                <div>
                  <label className="form-label" htmlFor="comment">
                    Comment
                  </label>
                  <Field
                    as="textarea"
                    name="comment"
                    className="form-input"
                    id="comment"
                  />
                  {errors.comment && touched.comment && (
                    <div className="text-red-500 text-sm">{errors.comment}</div>
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <div>
                  <ImagePicker
                    width={100}
                    height={100}
                    ratio={1 / 1}
                    image={values?.image ?? initialData?.image}
                    done={(image) => {
                      setFieldValue("image", image);
                    }}
                  />
                  {errors.image && touched.image && (
                    <div className="text-red-500 text-sm">{errors.image}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Progressing..."
                  : initialData
                  ? "Update"
                  : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddTestimonial;
