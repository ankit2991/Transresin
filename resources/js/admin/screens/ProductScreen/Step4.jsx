import React from "react";
import SeoMeta from "../../layouts/Modal/SeoMeta";
import { Form, Formik } from "formik";

const Step4 = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={{
      seo_title: initialValues.seo_title,
      seo_keywords: initialValues.seo_keywords,
      seo_description: initialValues.seo_description,
    }}
    onSubmit={onSubmit}
  >
    {() => (
      <Form>
        <SeoMeta />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </Form>
    )}
  </Formik>
);

export default Step4;
