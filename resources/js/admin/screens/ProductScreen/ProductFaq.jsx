import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import StepNav from "./StepNav";

const ProductFaq = ({ onSubmit, step, setStep }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    // faqs: Yup.array()
    //   .of(
    //     Yup.object({
    //       name: Yup.string()
    //         .required("Name is required")
    //         .max(50, "Name cannot exceed 50 characters"),
    //       answer: Yup.string().nullable(), // Optional field
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

  const addFaqRow = (setFieldValue, faqs) => {
    setFieldValue("faqs", [
      ...faqs,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const removeFaqRow = (setFieldValue, faqs, index) => {
    const updatedFaqs = [...faqs];
    updatedFaqs.splice(index, 1);
    setFieldValue("faqs", updatedFaqs);
  };

  return (
    <Formik
      initialValues={{
        answer: "",
        image: "",
        faqs: [
          {
            question: "",
            answer: "",
          },
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => {
        return (
          <Form>
            <h3 className="text-2xl font-bold mb-4">Faq</h3>
            <div className="grid grid-cols-2 mb-4">
              <div>No. of Faqs:</div>
              <div>{values.faqs.length}</div>
            </div>
            {values.faqs.map((faq, index) => (
              <div
                className="grid grid-cols-12 gap-10 mb-4 border-b py-4"
                key={index}
              >
                <div className="col-span-8 space-y-4">
                  <div>
                    <label
                      htmlFor={`faqs[${index}].question`}
                      className="form-label"
                    >
                      Question
                    </label>
                    <Field
                      type="text"
                      name={`faqs[${index}].question`}
                      className="form-input"
                      placeholder="Enter Question"
                    />
                    {errors.faqs?.[index]?.question &&
                      touched.faqs?.[index]?.question && (
                        <div className="text-red-500">
                          {errors.faqs[index].question}
                        </div>
                      )}
                  </div>
                  <div>
                    <label
                      htmlFor={`faqs[${index}].answer`}
                      className="form-label"
                    >
                      Answer
                    </label>
                    <Field
                      as="textarea"
                      name={`faqs[${index}].answer`}
                      className="form-input"
                      placeholder="Enter Composition"
                      rows={5}
                    />
                  </div>
                </div>
                <div className="col-span-12 text-right">
                  {index > 0 && (
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() =>
                        removeFaqRow(setFieldValue, values.faqs, index)
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
              onClick={() => addFaqRow(setFieldValue, values.faqs)}
            >
              Add Faq
            </button>
            <StepNav step={step} setStep={setStep} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductFaq;
