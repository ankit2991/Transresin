import { Field, Form, Formik } from "formik";
import React from "react";
import ApiExecute from "../../../api";
import { useDispatch } from "react-redux";
import { doLogin } from "../../../redux/actions/authActions";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting }) => {
    let apiResponse = await ApiExecute("login", {
      method: "POST",
      data: values,
    });

    if (apiResponse.status) dispatch(doLogin(apiResponse?.data));
    else toast.error(apiResponse?.data?.message);

    setSubmitting(false);
  };
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('login-bg.svg')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login to Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter your email and password to continue
        </p>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email address:
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="esteban_schiller@gmail.com"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <div className="flex items-center justify-between">
                  <Field
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Enter Password"
                  />
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:underline ml-2"
                  >
                    Forget Password?
                  </a>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-700">
                  Remember Password
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Authenticating..." : " Sign In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginScreen;
