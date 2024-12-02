import React from "react";
import SeoMeta from "../../layouts/Modal/SeoMeta";
import { Form, Formik } from "formik";
import StepNav from "./StepNav";

const SeoDetails = ({ initialValues, onSubmit, step, setStep }) => (
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
        <StepNav step={step} setStep={setStep} isEnd={true} />
      </Form>
    )}
  </Formik>
);

export default SeoDetails;
