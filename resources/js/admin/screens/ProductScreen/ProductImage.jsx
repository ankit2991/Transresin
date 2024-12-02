import React, { useEffect, useRef, useState } from "react";
import ProductImagePicker from "../../components/ProductImagePicker";
import ImagePicker from "../../components/ImagePicker";
import { Form, Formik } from "formik";
import { FaAngleRight } from "react-icons/fa";
import StepNav from "./StepNav";

const ProductImage = ({
  initialValues,
  onSubmit,
  initialData,
  step,
  setStep,
}) => {
  const formikRef = useRef(null);

  const [images, setImages] = useState(initialValues.images || []);

  useEffect(() => {
    formikRef.current.setFieldValue("images", images);
  }, [images]);

  return (
    <>
      <label htmlFor="" className="form-label">
        Choose Multiple Images
      </label>
      <ProductImagePicker images={images} setImages={setImages} />
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
            <StepNav step={step} setStep={setStep} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProductImage;
