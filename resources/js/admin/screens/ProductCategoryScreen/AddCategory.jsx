import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import Modal from "../../layouts/Modal/Modal";
import SeoMeta from "../../layouts/Modal/SeoMeta";
import ApiExecute from "../../../api";
import ImagePicker from "../../components/ImagePicker";

const AddCategory = ({ isOpen, onClose, afterSubmit, initialData = null }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const apiResponse = await ApiExecute("category?type=dropdown");

        if (apiResponse.status) setCategories(apiResponse.data);

        console.log("categories:", apiResponse.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    let url = initialData ? `category/${initialData.slug}` : "category";

    let apiResponse = await ApiExecute(url, {
      method: "POST",
      data: {
        ...values,
        _method: initialData ? "PUT" : "POST",
      },
    });

    console.log("api category res: ", apiResponse);

    if (apiResponse.status) {
      resetForm();
      afterSubmit();
    }
  };

  return (
    <Modal isOpen={isOpen} title={"Add Category"} onClose={onClose}>
      <Formik
        initialValues={{
          name: initialData?.name || "",
          parent_category_id: initialData?.parent_category_id || "",
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
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <Field name="name" className="form-input" id="name" />
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="parent_category_id">
                    Parent Category
                  </label>
                  <Field
                    as="select"
                    name="parent_category_id"
                    className="form-input"
                    id="parent_category_id"
                  >
                    <option value="">ROOT</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                </div>

                <SeoMeta />
              </div>
              <div className="w-[30%]">
                <div className="mb-4">
                  <ImagePicker
                    width={256}
                    height={256}
                    ratio={1 / 1}
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

export default AddCategory;
