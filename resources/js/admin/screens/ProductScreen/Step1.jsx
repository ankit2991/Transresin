import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Step1 = ({ categories, initialValues, onSubmit }) => {
  const validationScheme = Yup.object({
    name: Yup.string().required("Product Name is required"),
    category_id: Yup.number().required("Please select category."),
    regular_price: Yup.number()
      .required("Regular Price is required")
      .min(0, "Regular Price must be greater than or equal to 0"),
    discount: Yup.number()
      .min(0, "Discount must be greater than or equal to 0")
      .max(100, "Discount cannot exceed 100%"),
  });

  return (
    <Formik
      initialValues={{
        name: initialValues.name,
        description: initialValues.description,
        category_id: initialValues.category_id,
        sub_category_id: initialValues.sub_category_id,
        regular_price: initialValues.regular_price,
        discount: initialValues.discount,
        trade_price: initialValues.trade_price,
      }}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={validationScheme}
    >
      {({ values, setFieldValue, errors, touched }) => {
        useEffect(() => {
          // Calculate trade_price whenever regular_price or discount changes
          const tradePrice =
            values.regular_price &&
            values.discount >= 0 &&
            values.discount <= 100
              ? values.regular_price * ((100 - values.discount) / 100)
              : values.regular_price;

          setFieldValue("trade_price", tradePrice);
        }, [values.regular_price, values.discount, setFieldValue]);

        return (
          <Form>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <Field
                name="name"
                className="form-input"
                placeholder="Enter product name"
              />
              {errors.name && touched.name ? (
                <div className="text-red-500">{errors.name}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label className="form-label">Product Description</label>
              <Field
                as="textarea"
                rows="8"
                name="description"
                className="form-input"
                placeholder="Enter product description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">Product Category</label>
                <Field as="select" name="category_id" className="form-input">
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                {errors.category_id && touched.category_id ? (
                  <div className="text-red-500">{errors.category_id}</div>
                ) : null}
              </div>

              <div>
                <label className="form-label">Product Subcategory</label>
                <Field
                  as="select"
                  name="sub_category_id"
                  className="form-input"
                >
                  <option value="">Select Subcategory</option>
                  {categories?.filter(
                    (c) => c.id === parseInt(values?.category_id)
                  )?.length
                    ? categories
                        ?.filter(
                          (c) => c.id === parseInt(values?.category_id)
                        )[0]
                        ?.children?.map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.name}
                          </option>
                        ))
                    : null}
                </Field>
              </div>
            </div>

            <div className="grid grid-cols-3 mb-4 gap-4">
              <div>
                <label className="form-label">Regular Price</label>
                <Field
                  type="number"
                  name="regular_price"
                  className="form-input"
                  placeholder="Enter regular price"
                />
                {errors.regular_price && touched.regular_price ? (
                  <div className="text-red-500">{errors.regular_price}</div>
                ) : null}
              </div>

              <div>
                <label className="form-label">Discount (%)</label>
                <Field
                  type="number"
                  name="discount"
                  className="form-input"
                  placeholder="Enter discount percentage"
                />
                {errors.discount && touched.discount ? (
                  <div className="text-red-500">{errors.discount}</div>
                ) : null}
              </div>

              <div>
                <label className="form-label">Trade Price</label>
                <Field
                  type="number"
                  name="trade_price"
                  className="form-input"
                  value={values.trade_price}
                  readOnly
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Next
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Step1;
