import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import Modal from "../../layouts/Modal/Modal";
import ApiExecute from "../../../api";
import ImagePicker from "../../components/ImagePicker";

const AddSlider = ({ isOpen, onClose, afterSubmit, initialData = null }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const apiResponse = await ApiExecute("product?type=dropdown");

        if (apiResponse.status) setProducts(apiResponse.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    let url = initialData ? `slider/${initialData.slug}` : "slider";

    let apiResponse = await ApiExecute(url, {
      method: "POST",
      data: {
        ...values,
        _method: initialData ? "PUT" : "POST",
      },
    });

    if (apiResponse.status) {
      resetForm();
      afterSubmit();
    }
  };

  return (
    <Modal isOpen={isOpen} title={"Add Slider"} onClose={onClose}>
      <Formik
        initialValues={{
          title: initialData?.title || "",
          image: null,
          product_id: initialData?.product_id || null,
        }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <div className="mb-4">
                <label className="form-label" htmlFor="title">
                  Title / Alt
                </label>
                <Field name="title" className="form-input" id="title" />
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="product_id">
                  Select Product
                </label>
                <Field
                  as="select"
                  name="product_id"
                  className="form-input"
                  id="product_id"
                >
                  <option value="">--Select--</option>
                  {products?.map((pro) => (
                    <option value={pro.id} key={pro.id}>
                      {pro.name}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="mb-4">
                <ImagePicker
                  width={1600}
                  height={600}
                  ratio={16 / 6}
                  image={values?.image ?? initialData?.image}
                  done={(image) => {
                    setFieldValue("image", image);
                  }}
                />
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

export default AddSlider;
