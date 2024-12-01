import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ApiExecute from "../../../api";
import { data } from "autoprefixer";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Validation Schema
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // alert(`Password changed!\n\n${JSON.stringify(values, null, 2)}`);
    let apiResponse = await ApiExecute("change-password", {
      method: "POST",
      data: values,
    });

    setSubmitting(false);

    resetForm();

    if (apiResponse.status) {
      toast.success(apiResponse.data?.message);
    } else {
      toast.error(apiResponse.data?.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded-lg p-4">
            {/* Current Password */}
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-gray-700">
                Current Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword.currentPassword ? "text" : "password"}
                  name="currentPassword"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                  className="absolute right-3 top-2 text-gray-600"
                >
                  {showPassword.currentPassword ? "Hide" : "Show"}
                </button>
              </div>
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700">
                New Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword.newPassword ? "text" : "password"}
                  name="newPassword"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute right-3 top-2 text-gray-600"
                >
                  {showPassword.newPassword ? "Hide" : "Show"}
                </button>
              </div>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-3 top-2 text-gray-600"
                >
                  {showPassword.confirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
