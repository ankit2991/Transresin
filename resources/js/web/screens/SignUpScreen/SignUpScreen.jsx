import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ApiExecute from "../../../api";
import { toast } from "react-toastify";

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Define Yup validation schema
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(2, "First Name must be at least 2 characters")
      .max(50, "First Name cannot exceed 50 characters")
      .required("First Name is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    let response = await ApiExecute("register", {
      method: "POST",
      data: values,
      timeout: 60 * 1000,
    });

    if (response.status) {
      toast.success(response.data.message);
      navigate("/login");
    } else {
      console.warn(response.data);

      toast.error(response.data.message);
    }

    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="md:w-1/2">
          <img
            src="https://bcassetcdn.com/public/blog/wp-content/uploads/2022/06/22202833/softball-mark-bybaruch-nave-dribbble.png"
            alt="Floating person"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Welcome to Transresin
          </h1>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              mobile: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema} // Attach validation schema here
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    name="first_name"
                    placeholder="First Name"
                    className="web-input"
                  />
                  {errors.first_name && touched.first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.first_name}
                    </p>
                  )}
                </div>
                <div>
                  <Field
                    name="last_name"
                    placeholder="Last Name"
                    className="web-input"
                  />
                  {errors.last_name && touched.last_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.last_name}
                    </p>
                  )}
                </div>
                <div>
                  <Field
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    className="web-input"
                  />
                  {errors.mobile && touched.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="web-input"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"} // Toggle type based on state
                      name="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                {isSubmitting && "Progressing, please wait..."}
                <button
                  type="submit"
                  className="w-full py-2 bg-primary-300 text-white rounded hover:bg-primary-600 transition-colors"
                  disabled={isSubmitting}
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-300 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
