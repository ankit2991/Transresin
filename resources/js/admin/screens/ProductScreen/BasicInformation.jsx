import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Select from "react-select";
import StepNav from "./StepNav";

const BasicInformation = ({
  categories,
  brands,
  hsnCodes,
  applications,
  industryCategories,
  features,
  materials,
  initialValues,
  onSubmit,
  step,
  setStep,
}) => {
  const validationScheme = Yup.object({
    // name: Yup.string().required("Product Name is required"),
    // category_id: Yup.number().required("Please select category."),
    // application_id: Yup.number().required("Please select application."),
    // industry_category_id: Yup.number().required(
    //   "Please select industry category."
    // ),
    // brand_id: Yup.number().required("Please select brand."),
    // hsn_code_id: Yup.number().required("Please select HSN / SAC."),
  });

  return (
    <Formik
      initialValues={{
        name: initialValues.name,
        description1: initialValues.description1,
        description2: initialValues.description2,
        description3: initialValues.description3,
        category_id: initialValues.category_id,
        sub_category_id: initialValues.sub_category_id,
        application_id: initialValues.application_id,
        sub_application_id: initialValues.sub_application_id,
        industry_category_id: initialValues.industry_category_id,
        sub_industry_category_id: initialValues.sub_industry_category_id,
        brand_id: initialValues.brand_id,
        hsn_code_id: initialValues.hsn_code_id,
      }}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={validationScheme}
    >
      {({ values, setFieldValue, errors, touched }) => {
        return (
          <Form>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Product Name</label>
                    <Field
                      name="name"
                      className="form-input"
                      placeholder="Enter product name"
                    />
                    {errors.name && touched.name ? (
                      <div className="text-red-500">{errors.name}</div>
                    ) : null}
                  </div>

                  <div>
                    <label className="form-label">Product Description</label>
                    <div className="mb-14 relative">
                      <ReactQuill
                        theme="snow"
                        value={values?.description1}
                        onChange={(description) =>
                          setFieldValue("description1", description)
                        }
                        style={{
                          height: 150,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Product Description 2</label>
                    <div className="mb-14 relative">
                      <ReactQuill
                        theme="snow"
                        value={values?.description2}
                        onChange={(description) =>
                          setFieldValue("description2", description)
                        }
                        style={{
                          height: 250,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Product Description 3</label>
                    <div className="mb-14 relative">
                      <ReactQuill
                        theme="snow"
                        value={values?.description3}
                        onChange={(description) =>
                          setFieldValue("description3", description)
                        }
                        style={{
                          height: 250,
                        }}
                      />
                    </div>
                  </div>

                  {/* <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Next
                  </button> */}
                </div>
              </div>
              <div className="col-span-4">
                <div className="space-y-4">
                  {/* Product Application */}
                  <div>
                    <label className="form-label">Product Application</label>
                    <Field
                      as="select"
                      name="application_id"
                      className="form-input"
                    >
                      <option value="">Select Application</option>
                      {applications?.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.name}
                        </option>
                      ))}
                    </Field>
                    {errors.application_id && touched.application_id ? (
                      <div className="text-red-500">
                        {errors.application_id}
                      </div>
                    ) : null}
                  </div>

                  {/* Product Subapplication */}
                  <div>
                    <label className="form-label">
                      Product Sub-application
                    </label>
                    <Field
                      as="select"
                      name="sub_application_id"
                      className="form-input"
                    >
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
                    {errors.sub_application_id && touched.sub_application_id ? (
                      <div className="text-red-500">
                        {errors.sub_application_id}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div>
                      <label className="form-label">Product Category</label>
                      <Field
                        as="select"
                        name="category_id"
                        className="form-input"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Field>
                      {errors.category_id && touched.category_id ? (
                        <div className="text-red-500">{errors.category_id}</div>
                      ) : null}
                    </div>

                    {/* <div>
                      <label className="form-label">Product Subcategory</label>
                      <Field
                        as="select"
                        name="sub_category_id"
                        className="form-input"
                      >
                        <option value="">Select Subcategory</option>
                        {categories?.filter(
                          (c) => c.id === parseInt(values?.category_id)
                        )?.length
                          ? categories
                              ?.filter(
                                (c) => c.id === parseInt(values?.category_id)
                              )[0]
                              ?.children?.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                  {sub.name}
                                </option>
                              ))
                          : null}
                      </Field>
                    </div> */}
                  </div>

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
                    {errors.industry_category_id &&
                    touched.industry_category_id ? (
                      <div className="text-red-500">
                        {errors.industry_category_id}
                      </div>
                    ) : null}
                  </div>

                  {/* Industry Subcategory */}
                  {/* <div>
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
                            industry.id ===
                            parseInt(values?.industry_category_id)
                        )
                        ?.map((industry) =>
                          industry.children?.map((sub) => (
                            <option key={sub.id} value={sub.id}>
                              {sub.name}
                            </option>
                          ))
                        )}
                    </Field>
                  </div> */}

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
                    {errors.brand_id && touched.brand_id ? (
                      <div className="text-red-500">{errors.brand_id}</div>
                    ) : null}
                  </div>

                  {/* HSN Code */}
                  <div>
                    <label className="form-label">HSN Code</label>
                    <Field
                      as="select"
                      name="hsn_code_id"
                      className="form-input"
                    >
                      <option value="">Select HSN Code</option>
                      {hsnCodes?.map((hsn) => (
                        <option key={hsn.id} value={hsn.id}>
                          {hsn.code}
                        </option>
                      ))}
                    </Field>
                    {errors.hsn_code_id && touched.hsn_code_id ? (
                      <div className="text-red-500">{errors.hsn_code_id}</div>
                    ) : null}
                  </div>

                  {/* Material */}
                  <div>
                    <label className="form-label">Select Materials</label>
                    <Select
                      isMulti
                      defaultInputValue={values.materials}
                      options={
                        materials?.length > 0
                          ? materials.map((m) => ({
                              value: m.id,
                              label: m.name,
                            }))
                          : []
                      }
                      onChange={(newMaterials) =>
                        setFieldValue("materials", newMaterials)
                      }
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <label className="form-label">Select Features</label>
                    <Select
                      isMulti
                      defaultInputValue={values.features}
                      options={
                        features?.length > 0
                          ? features.map((m) => ({
                              value: m.id,
                              label: m.name,
                            }))
                          : []
                      }
                      onChange={(newFeatures) =>
                        setFieldValue("features", newFeatures)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <StepNav step={step} setStep={setStep} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default BasicInformation;
