import React from "react";
import { Field, Form, Formik } from "formik";
import Modal from "../../layouts/Modal/Modal";
import ApiExecute from "../../../api";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddHsnCode = ({ isOpen, onClose, afterSubmit, initialData = null }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    let url = initialData ? `hsn-code/${initialData.id}` : "hsn-code";

    let apiResponse = await ApiExecute(url, {
      method: "POST",
      data: {
        ...values,
        _method: initialData ? "PUT" : "POST",
      },
    });

    if (apiResponse.status) {
      toast.success(apiResponse?.data?.message);

      resetForm();
      afterSubmit();
    }
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    code: Yup.string().required("HSN / SAC code is required"),
    gst_rate: Yup.number()
      .required("GST Rate is required")
      .min(0, "GST Rate must be a positive number"),
    description: Yup.string().optional(), // Description is optional
  });

  return (
    <Modal isOpen={isOpen} title={"Add HSN Code"} onClose={onClose}>
      <Formik
        initialValues={{
          code: initialData?.code || "",
          gst_rate: initialData?.gst_rate || "",
          description: initialData?.description || "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <div className="flex gap-5">
              <div className="w-[60%]">
                <div className="mb-4">
                  <label className="form-label" htmlFor="code">
                    HSN / SAC
                  </label>
                  <Field
                    name="code"
                    className={`form-input ${
                      errors.code && touched.code ? "error" : ""
                    }`}
                    id="code"
                  />
                  {errors.code && touched.code && (
                    <div className="text-red-500 text-sm">{errors.code}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="gst_rate">
                    GST Rate
                  </label>
                  <Field
                    name="gst_rate"
                    className={`form-input ${
                      errors.gst_rate && touched.gst_rate ? "error" : ""
                    }`}
                    id="gst_rate"
                    type="number"
                  />
                  {errors.gst_rate && touched.gst_rate && (
                    <div className="text-red-500 text-sm">
                      {errors.gst_rate}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    rows={5}
                    name="description"
                    className={`form-input ${
                      errors.description && touched.description ? "error" : ""
                    }`}
                    id="description"
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500 text-sm">
                      {errors.description}
                    </div>
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

export default AddHsnCode;
