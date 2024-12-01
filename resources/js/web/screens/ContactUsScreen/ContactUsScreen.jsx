import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaLocationPin } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import ApiExecute from "../../../api";
import { toast } from "react-toastify";

const Contact = () => {
  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?\d{10}$/, "Enter 10 digit valid mobile number")
      .required("Phone Number is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    let apiResponse = await ApiExecute("contact-enquiry", {
      method: "POST",
      data: values,
    });
    resetForm();
    setSubmitting(false);

    if (apiResponse.status) toast.success(apiResponse.data?.message);
  };

  return (
    <div className="bg-blue-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg">Reach us for any help or feedback.</p>
        </div>
      </section>

      <div className="py-16 container mx-auto">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg w-full p-8">
          {/* Left Section - Contact Information */}
          <div
            className="md:w-1/2 pr-8 bg-cover bg-center rounded-lg flex flex-col"
            style={{
              backgroundImage: "url('images/contact.png')",
            }}
          >
            <div className="p-8 h-full text-white rounded-lg flex flex-col justify-between">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold">Contact Information</h2>
                <p className="mb-6">Say something to start a live chat!</p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <IoCall />
                    <span>+919876543210</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MdEmail />
                    <span>demo@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaLocationPin />
                    <span>
                      132 Dartmouth Street, Boston, Massachusetts 02156 United
                      States
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-start space-x-4 mt-auto">
                <BsTwitter className="text-xl hover:text-blue-500 transition-colors" />
                <BsInstagram className="text-xl hover:text-pink-500 transition-colors" />
                <BsFacebook className="text-xl hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="md:w-1/2 ml-4">
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="first_name"
                        className="block text-gray-600"
                      >
                        First Name
                      </label>
                      <Field
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="Enter First Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-300"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="last_name"
                        className="block text-gray-600"
                      >
                        Last Name
                      </label>
                      <Field
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Enter Last Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-300"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label htmlFor="email" className="block text-gray-600">
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter any email address"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-300"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="phone" className="block text-gray-600">
                        Phone Number
                      </label>
                      <Field
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Enter 10 Digit Mobile No."
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-300"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-600">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Write your message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-primary-300 text-white rounded hover:bg-primary-600 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14324.027655788455!2d72.9257746!3d26.1639043!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3941884101ffa6af%3A0xe8b0177c82f13d0d!2sTrans%20Oceanic%20Chemicals%20Private%20Limited!5e0!3m2!1sen!2sin!4v1732864355769!5m2!1sen!2sin"
          className="w-full aspect-[16/5] border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
