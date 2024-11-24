import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiExecute from "../../../api";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { doLogin } from "../../../redux/actions/authActions"; // Replace with your actual action path

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values, { setSubmitting }) => {
    let response = await ApiExecute("login", {
      method: "POST",
      data: values,
    });

    const currentPath = window.location.pathname;

    console.log("response: ", response.data.message);
    if (response.status) {
      dispatch(doLogin(response?.data));
      if (currentPath === "/login") navigate("/");
    } else {
      console.warn("failed", response);

      toast.error(response?.data?.message);
    }

    setSubmitting(false);
  };

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

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
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Welcome Back
          </h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
              role: "user",
            }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`web-input ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className={`web-input ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-primary-300 text-white rounded hover:bg-primary-600 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
          <p className="mt-4 text-sm text-gray-600">
            Haven't an account?{" "}
            <Link to="/signup" className="text-primary-300 hover:underline">
              Create Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
