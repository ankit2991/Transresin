import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import ApiExecute from "../../api";
import { toast } from "react-toastify";

const BecomeDealerScreen = () => {
  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    company_name: "",
    message: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    company_name: Yup.string()
      .required("Company Name is required")
      .min(2, "Company Name must be at least 2 characters long"),
    message: Yup.string()
      .max(500, "Message cannot exceed 500 characters")
      .optional(),
  });

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    let apiResponse = await ApiExecute("dealer-enquiry", {
      method: "POST",
      data: values,
    });
    resetForm();
    setSubmitting(false);

    if (apiResponse.status) toast.success(apiResponse.data?.message);
  };

  return (
    <div className=" bg-blue-50 ">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Become Our Dealer</h1>
        </div>
      </section>
      <div className="flex items-center justify-center py-16">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Phone
                  </label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="company_name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Company Name
                  </label>
                  <Field
                    type="text"
                    id="company_name"
                    name="company_name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="company_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Message
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {isSubmitting && <Spinner />}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-300 text-white py-2 px-4 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BecomeDealerScreen;
