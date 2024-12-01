import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import ApiExecute from "../../../api";
import { toast } from "react-toastify";
import { updateUser } from "../../../redux/actions/authActions";

const EditProfile = () => {
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  // Validation schema
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
  });

  // Initial form values
  const initialValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // alert(`Profile updated!\n\n${JSON.stringify(values, null, 2)}`);
    let apiResponse = await ApiExecute("edit-profile", {
      method: "POST",
      data: values,
    });
    setSubmitting(false);

    if (apiResponse.status) {
      dispatch(updateUser(apiResponse.data?.user));
      toast.success(apiResponse.data?.message);
    } else {
      toast.error(apiResponse?.data?.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded-lg p-4">
            <div className="mb-4">
              <label htmlFor="first_name" className="block text-gray-700">
                First Name
              </label>
              <Field
                type="text"
                name="first_name"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="block text-gray-700">
                Last Name
              </label>
              <Field
                type="text"
                name="last_name"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {isSubmitting && <Spinner />}

            <button
              type="submit"
              className="bg-primary-300 text-white px-4 py-2 rounded hover:bg-primary-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Update Details"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;
