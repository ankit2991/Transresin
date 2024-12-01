import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import Modal from "../../layouts/Modal/Modal";
import SeoMeta from "../../layouts/Modal/SeoMeta";
import ApiExecute from "../../../api";
import ImagePicker from "../../components/ImagePicker";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddUser = ({ isOpen, onClose, afterSubmit, initialData = null }) => {
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const apiResponse = await ApiExecute("user");

        if (apiResponse.status) setUsers(apiResponse.data);

        console.log("users:", apiResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    let url = initialData ? `user/${initialData.slug}` : "user";

    let apiResponse = await ApiExecute(url, {
      method: "POST",
      data: {
        ...values,
        _method: initialData ? "PUT" : "POST",
      },
    });

    console.log("api user res: ", apiResponse);

    if (apiResponse.status) {
      resetForm();
      afterSubmit();
    }
  };

  return (
    <Modal isOpen={isOpen} title={"Add User"} onClose={onClose}>
      <Formik
        initialValues={{
          title: initialData?.title || "",
          description: initialData?.description || "",
          image: null,
          seo_title: initialData?.seo_title || "",
          seo_keywords: initialData?.seo_keywords || "",
          seo_description: initialData?.seo_description || "",
        }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="flex gap-5">
              <div className="w-[60%]">
                <div className="mb-4">
                  <label className="form-label" htmlFor="title">
                    Title
                  </label>
                  <Field name="title" className="form-input" id="title" />
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <div className="mb-14 relative">
                    <ReactQuill
                      theme="snow"
                      value={values?.description}
                      onChange={(description) =>
                        setFieldValue("description", description)
                      }
                      style={{
                        height: 350,
                      }}
                    />
                  </div>
                </div>

                <SeoMeta />
              </div>
              <div className="w-[30%]">
                <div className="mb-4">
                  <ImagePicker
                    width={1600}
                    height={500}
                    ratio={16 / 5}
                    image={values?.image ?? initialData?.image}
                    done={(image) => {
                      setFieldValue("image", image);
                    }}
                  />
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
                  ? "Update "
                  : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddUser;
