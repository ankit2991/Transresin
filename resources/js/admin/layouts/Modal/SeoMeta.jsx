import { Field } from "formik";
import React from "react";

const SeoMeta = () => {
  return (
    <>
      <div className="mb-3">
        <label className="input-label" htmlFor="seo_title">
          SEO Title
        </label>
        <Field name="seo_title" className="form-input" id="seo_title" />
      </div>
      <div className="mb-3">
        <label className="input-label" htmlFor="seo_keywords">
          SEO Keywords
        </label>
        <Field name="seo_keywords" className="form-input" id="seo_keywords" />
      </div>
      <div className="mb-3">
        <label className="input-label" htmlFor="seo_description">
          SEO Description
        </label>
        <Field
          name="seo_description"
          className="form-input"
          id="seo_description"
        />
      </div>
    </>
  );
};

export default SeoMeta;
