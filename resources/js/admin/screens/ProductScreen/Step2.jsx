import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ImagePicker from "../../components/ImagePicker";

const Step2 = ({ onSubmit }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    // packagings: Yup.array()
    //   .of(
    //     Yup.object({
    //       name: Yup.string()
    //         .required("Name is required")
    //         .max(50, "Name cannot exceed 50 characters"),
    //       composition: Yup.string().nullable(), // Optional field
    //       regular_price: Yup.number()
    //         .required("Regular Price is required")
    //         .min(0, "Regular Price must be greater than or equal to 0"),
    //       discount: Yup.number()
    //         .min(0, "Discount must be greater than or equal to 0")
    //         .max(100, "Discount cannot exceed 100%"),
    //       trade_price: Yup.number().nullable(), // Automatically calculated
    //       image: Yup.string().nullable(), // Optional field
    //     })
    //   )
    //   .required(),
  });

  const addPackagingRow = (setFieldValue, packagings) => {
    setFieldValue("packagings", [
      ...packagings,
      {
        name: "",
        composition: "",
        regular_price: "",
        discount: 0,
        trade_price: "",
        image: "",
      },
    ]);
  };

  const removePackagingRow = (setFieldValue, packagings, index) => {
    const updatedPackagings = [...packagings];
    updatedPackagings.splice(index, 1);
    setFieldValue("packagings", updatedPackagings);
  };

  return (
    <Formik
      initialValues={{
        packagings: [
          {
            name: "",
            composition: "",
            regular_price: "",
            discount: 0,
            trade_price: "",
            image: "",
          },
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => {
        const calculateTradePrice = (index) => {
          let { regular_price, discount } = values?.packagings[index];
          regular_price = parseFloat(regular_price) || 0;
          discount = parseFloat(discount) || 0;
          setFieldValue(
            `packagings[${index}].trade_price`,
            regular_price - (regular_price * discount) / 100
          );
        };

        return (
          <Form>
            <h3 className="text-2xl font-bold mb-4">Packaging</h3>
            <div className="grid grid-cols-2 mb-4">
              <div>No. of Packagings:</div>
              <div>{values.packagings.length}</div>
            </div>
            {values.packagings.map((packaging, index) => (
              <div
                className="grid grid-cols-12 gap-10 mb-4 border-b py-4"
                key={index}
              >
                <div className="col-span-8 space-y-4">
                  <div>
                    <label
                      htmlFor={`packagings[${index}].name`}
                      className="form-label"
                    >
                      Name / Size
                    </label>
                    <Field
                      type="text"
                      name={`packagings[${index}].name`}
                      className="form-input"
                      placeholder="Enter Name / Size"
                    />
                    {errors.packagings?.[index]?.name &&
                      touched.packagings?.[index]?.name && (
                        <div className="text-red-500">
                          {errors.packagings[index].name}
                        </div>
                      )}
                  </div>
                  <div>
                    <label
                      htmlFor={`packagings[${index}].composition`}
                      className="form-label"
                    >
                      Composition
                    </label>
                    <Field
                      type="text"
                      name={`packagings[${index}].composition`}
                      className="form-input"
                      placeholder="Enter Composition"
                    />
                  </div>
                  <div className="grid grid-cols-3 mb-4 gap-4">
                    <div>
                      <label className="form-label">Regular Price</label>
                      <Field
                        type="number"
                        name={`packagings[${index}].regular_price`}
                        className="form-input"
                        placeholder="Enter regular price"
                        onKeyUp={() => calculateTradePrice(index)}
                      />
                      {errors.packagings?.[index]?.regular_price &&
                        touched.packagings?.[index]?.regular_price && (
                          <div className="text-red-500">
                            {errors.packagings[index].regular_price}
                          </div>
                        )}
                    </div>
                    <div>
                      <label className="form-label">Discount (%)</label>
                      <Field
                        type="number"
                        name={`packagings[${index}].discount`}
                        className="form-input"
                        placeholder="Enter discount percentage"
                        onKeyUp={() => calculateTradePrice(index)}
                      />
                      {errors.packagings?.[index]?.discount &&
                        touched.packagings?.[index]?.discount && (
                          <div className="text-red-500">
                            {errors.packagings[index].discount}
                          </div>
                        )}
                    </div>
                    <div>
                      <label className="form-label">Trade Price</label>
                      <Field
                        type="number"
                        name={`packagings[${index}].trade_price`}
                        className="form-input"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="mb-4">
                    <label
                      htmlFor={`packagings[${index}].image`}
                      className="form-label"
                    >
                      Feature Image
                    </label>
                    <ImagePicker
                      width={256}
                      height={256}
                      ratio={1 / 1}
                      image={packaging.image}
                      done={(image) => {
                        const updatedPackagings = [...values.packagings];
                        updatedPackagings[index].image = image;
                        setFieldValue("packagings", updatedPackagings);
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-12 text-right">
                  {index > 0 && (
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() =>
                        removePackagingRow(
                          setFieldValue,
                          values.packagings,
                          index
                        )
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4"
              onClick={() => addPackagingRow(setFieldValue, values.packagings)}
            >
              Add Packaging
            </button>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Step2;
