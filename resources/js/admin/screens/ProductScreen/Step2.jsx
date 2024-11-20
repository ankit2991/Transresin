import React from "react";
import { Field, Form, Formik } from "formik";

const Step2 = ({
  initialValues,
  applications,
  industryCategories,
  brands,
  hsnCodes,
  onSubmit,
}) => (
  <Formik
    initialValues={{
      application_id: initialValues.application_id,
      sub_application_id: initialValues.sub_application_id,
      industry_category_id: initialValues.industry_category_id,
      sub_industry_category_id: initialValues.sub_industry_category_id,
      brand_id: initialValues.brand_id,
      hsn_code_id: initialValues.hsn_code_id,
    }}
    onSubmit={onSubmit}
  >
    {({ values }) => (
      <Form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Product Application */}
          <div>
            <label className="form-label">Product Application</label>
            <Field as="select" name="application_id" className="form-input">
              <option value="">Select Application</option>
              {applications?.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.name}
                </option>
              ))}
            </Field>
          </div>

          {/* Product Subapplication */}
          <div>
            <label className="form-label">Product Sub-application</label>
            <Field as="select" name="sub_application_id" className="form-input">
              <option value="">Select Sub-application</option>

              {applications?.filter(
                (c) => c.id === parseInt(values?.application_id)
              )?.length
                ? applications
                    ?.filter(
                      (c) => c.id === parseInt(values?.application_id)
                    )[0]
                    ?.children?.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))
                : null}
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Industry Category */}
          <div>
            <label className="form-label">Industry Category</label>
            <Field
              as="select"
              name="industry_category_id"
              className="form-input"
            >
              <option value="">Select Industry Category</option>
              {industryCategories?.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </Field>
          </div>

          {/* Industry Subcategory */}
          <div>
            <label className="form-label">Industry Subcategory</label>
            <Field
              as="select"
              name="sub_industry_category_id"
              className="form-input"
            >
              <option value="">Select Industry Subcategory</option>
              {industryCategories
                ?.filter(
                  (industry) =>
                    industry.id === parseInt(values?.industry_category_id)
                )
                ?.map((industry) =>
                  industry.children?.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))
                )}
            </Field>
          </div>

          {/* Brand */}
          <div>
            <label className="form-label">Brand</label>
            <Field as="select" name="brand_id" className="form-input">
              <option value="">Select Brand</option>
              {brands?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Field>
          </div>

          {/* HSN Code */}
          <div>
            <label className="form-label">HSN Code</label>
            <Field as="select" name="hsn_code_id" className="form-input">
              <option value="">Select HSN Code</option>
              {hsnCodes?.map((hsn) => (
                <option key={hsn.id} value={hsn.id}>
                  {hsn.code}
                </option>
              ))}
            </Field>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </Form>
    )}
  </Formik>
);

export default Step2;
