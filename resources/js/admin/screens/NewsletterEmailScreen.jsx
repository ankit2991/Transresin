import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ApiExecute from "../../api";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewsletterEmailScreen = () => {
  const [subscribers, setSubscribers] = useState([]);

  const validationSchema = Yup.object({
    recipients: Yup.array()
      .min(1, "Please select at least one recipient")
      .required("Recipients are required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    let apiResponse = await ApiExecute("newsletter/email", {
      method: "POST",
      data: values,
    });

    resetForm();
    setSubmitting(false);

    if (apiResponse.status) {
      toast.success(apiResponse.data?.message);
    }
  };

  const fetchSubscribers = useCallback(async () => {
    let apiResponse = await ApiExecute("newsletter");

    if (apiResponse?.status) {
      setSubscribers(apiResponse?.data);
    }
  }, []);

  useEffect(() => {
    fetchSubscribers(0);
  }, [fetchSubscribers]);

  return (
    <div className="m-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">
        Send Email to Subscribers
      </h1>
      <Formik
        initialValues={{
          recipients: [],
          subject: "",
          message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, isValid, setFieldValue }) => (
          <Form className="flex space-x-6">
            {/* Recipients List */}
            <div className="w-1/3 bg-gray-100 p-4 rounded-md max-h-[800px] overflow-auto">
              <h2 className="text-lg font-bold text-gray-700 mb-4">
                Select Recipients
              </h2>
              <div>
                <label className="flex items-center mb-2">
                  <Field
                    type="checkbox"
                    name="recipients"
                    value="all"
                    className="mr-2"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue(
                          "recipients",
                          subscribers.map((subscriber) => subscriber.email)
                        );
                      } else {
                        setFieldValue("recipients", []);
                      }
                    }}
                  />
                  <span className="text-gray-700 font-medium">
                    All Subscribers
                  </span>
                </label>
                <hr className="my-2" />
                {subscribers.map((subscriber) => (
                  <label key={subscriber.id} className="flex items-center mb-2">
                    <Field
                      type="checkbox"
                      name="recipients"
                      value={subscriber.email}
                      className="mr-2"
                    />
                    <span className="text-gray-700">{subscriber.email}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="recipients"
                component="div"
                className="text-sm text-red-500 mt-2"
              />
            </div>

            {/* Email Form */}
            <div className="w-2/3 space-y-6">
              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Subject
                </label>
                <Field
                  type="text"
                  name="subject"
                  id="subject"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email subject"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Message
                </label>
                {/* <Field
                  as="textarea"
                  name="message"
                  id="message"
                  rows="6"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your message here"
                /> */}
                <div className="mb-14 relative">
                  <ReactQuill
                    theme="snow"
                    value={values?.message}
                    onChange={(message) => setFieldValue("message", message)}
                    style={{
                      height: 350,
                    }}
                  />
                </div>
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`px-6 py-2 font-semibold text-white rounded-md shadow-md ${
                    isSubmitting || !isValid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Email"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewsletterEmailScreen;
