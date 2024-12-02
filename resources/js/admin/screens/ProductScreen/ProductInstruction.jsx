import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ImagePicker from "../../components/ImagePicker";
import StepNav from "./StepNav";

const ProductInstruction = ({ onSubmit, step, setStep }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    // instructions: Yup.array()
    //   .of(
    //     Yup.object({
    //       name: Yup.string()
    //         .required("Name is required")
    //         .max(50, "Name cannot exceed 50 characters"),
    //       description: Yup.string().nullable(), // Optional field
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

  const addInstructionRow = (setFieldValue, instructions) => {
    setFieldValue("instructions", [
      ...instructions,
      {
        title: "",
        description: "",
        image: "",
      },
    ]);
  };

  const removeInstructionRow = (setFieldValue, instructions, index) => {
    const updatedInstructions = [...instructions];
    updatedInstructions.splice(index, 1);
    setFieldValue("instructions", updatedInstructions);
  };

  return (
    <Formik
      initialValues={{
        description: "",
        image: "",
        instructions: [
          {
            title: "",
            description: "",
            image: "",
          },
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => {
        return (
          <Form>
            <h3 className="text-2xl font-bold mb-4">Instruction</h3>
            <div className="grid grid-cols-2 mb-4">
              <div>No. of Instructions:</div>
              <div>{values.instructions.length}</div>
            </div>
            {values.instructions.map((packaging, index) => (
              <div
                className="grid grid-cols-12 gap-10 mb-4 border-b py-4"
                key={index}
              >
                <div className="col-span-8 space-y-4">
                  <div>
                    <label
                      htmlFor={`instructions[${index}].title`}
                      className="form-label"
                    >
                      Title / Alt
                    </label>
                    <Field
                      type="text"
                      name={`instructions[${index}].title`}
                      className="form-input"
                      placeholder="Enter Name / Size"
                    />
                    {errors.instructions?.[index]?.title &&
                      touched.instructions?.[index]?.title && (
                        <div className="text-red-500">
                          {errors.instructions[index].title}
                        </div>
                      )}
                  </div>
                  <div>
                    <label
                      htmlFor={`instructions[${index}].description`}
                      className="form-label"
                    >
                      Description
                    </label>
                    <Field
                      as="textarea"
                      name={`instructions[${index}].description`}
                      className="form-input"
                      placeholder="Enter Composition"
                      rows={5}
                    />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="mb-4">
                    <label
                      htmlFor={`instructions[${index}].image`}
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
                        const updatedInstructions = [...values.instructions];
                        updatedInstructions[index].image = image;
                        setFieldValue("instructions", updatedInstructions);
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
                        removeInstructionRow(
                          setFieldValue,
                          values.instructions,
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
              onClick={() =>
                addInstructionRow(setFieldValue, values.instructions)
              }
            >
              Add Instruction
            </button>
            <StepNav step={step} setStep={setStep} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductInstruction;
