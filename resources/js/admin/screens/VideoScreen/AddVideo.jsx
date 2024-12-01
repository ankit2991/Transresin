import React from "react";
import { Field, Form, Formik } from "formik";
import Modal from "../../layouts/Modal/Modal";
import ApiExecute from "../../../api";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddVideo = ({ isOpen, onClose, afterSubmit, initialData = null }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    let url = initialData ? `video/${initialData.id}` : "video";

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
    title: Yup.string().required("Title is required"),
    youtube_video_url: Yup.string().required("Youtube video url is required"),
  });

  return (
    <Modal isOpen={isOpen} title={"Add Video"} onClose={onClose}>
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
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="flex gap-5">
              <div className="w-[60%]">
                <div className="mb-4">
                  <label className="form-label" htmlFor="title">
                    Title
                  </label>
                  <Field
                    name="title"
                    className={`form-input ${
                      errors.title && touched.title ? "error" : ""
                    }`}
                    id="title"
                  />
                  {errors.title && touched.title && (
                    <div className="text-red-500 text-sm">{errors.title}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="youtube_video_url">
                    YouTube Video URL
                  </label>
                  <Field
                    name="youtube_video_url"
                    className={`form-input ${
                      errors.youtube_video_url && touched.youtube_video_url
                        ? "error"
                        : ""
                    }`}
                    id="youtube_video_url"
                  />
                  {errors.youtube_video_url && touched.youtube_video_url && (
                    <div className="text-red-500 text-sm">
                      {errors.youtube_video_url}
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

export default AddVideo;
