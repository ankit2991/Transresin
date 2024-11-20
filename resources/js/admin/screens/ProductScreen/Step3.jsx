import React, { useEffect, useRef, useState } from "react";
import ProductImagePicker from "../../components/ProductImagePicker";
import ImagePicker from "../../components/ImagePicker";
import { Form, Formik } from "formik";

const Step3 = ({ initialValues, onSubmit, initialData }) => {
  const formikRef = useRef(null);

  const [images, setImages] = useState(initialValues.images || []);

  useEffect(() => {
    formikRef.current.setFieldValue("images", images);
  }, [images]);

  return (
    <>
      <Formik
        initialValues={{
          image: initialValues.image,
          images: initialValues.images || [],
        }}
        enableReinitialize
        innerRef={formikRef}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="" className="form-label">
                Feature Image
              </label>
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
            {/* {JSON.stringify(values?.images)} */}
          </Form>
        )}
      </Formik>

      <label htmlFor="" className="form-label">
        Choose Multiple Images
      </label>
      <ProductImagePicker images={images} setImages={setImages} />

      <button
        type="button"
        onClick={formikRef.current?.handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Next
      </button>
    </>
  );
};

export default Step3;
