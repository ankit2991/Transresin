import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import ApiExecute from "../../../api";
import SeoMeta from "../../layouts/Modal/SeoMeta";

const AddProduct = ({ afterSubmit, initialData = null }) => {
  const [categories, setCategories] = useState([]);
  const [applications, setApplications] = useState([]);
  const [industryCategories, setIndustryCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const categoryResponse = await ApiExecute("category");
        const applicationResponse = await ApiExecute("application");
        const industryCategoryResponse = await ApiExecute("industry-category");
        const brandResponse = await ApiExecute("brand");

        setCategories(
          Array.isArray(categoryResponse.data) ? categoryResponse.data : []
        );
        setApplications(
          Array.isArray(applicationResponse.data)
            ? applicationResponse.data
            : []
        );
        setIndustryCategories(
          Array.isArray(industryCategoryResponse.data)
            ? industryCategoryResponse.data
            : []
        );
        setBrands(Array.isArray(brandResponse.data) ? brandResponse.data : []);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const url = initialData ? `product/${initialData.slug}` : "product";

    try {
      const apiResponse = await ApiExecute(url, {
        method: "POST",
        data: {
          ...values,
          _method: initialData ? "PUT" : "POST",
        },
      });

      if (apiResponse.status) {
        resetForm();
        afterSubmit && afterSubmit();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        {initialData ? "Edit Product" : "Add Product"}
      </h1>
      <Formik
        initialValues={{
          productName: initialData?.productName || "",
          productCategory: initialData?.productCategory || "",
          productSubcategory: initialData?.productSubcategory || "",
          productApplication: initialData?.productApplication || "",
          productSubapplication: initialData?.productSubapplication || "",
          productIndustryCategory: initialData?.productIndustryCategory || "",
          productIndustrySubcategory:
            initialData?.productIndustrySubcategory || "",
          productBrand: initialData?.productBrand || "",
          seoTitle: initialData?.seoTitle || "",
          seoKeywords: initialData?.seoKeywords || "",
          seoDescription: initialData?.seoDescription || "",
        }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label className="form-label">Product Name</label>
                <Field
                  name="productName"
                  className="form-input"
                  placeholder="Enter product name"
                />
              </div>

              {/* Product Category */}
              <div>
                <label className="form-label">Product Category</label>
                <Field
                  as="select"
                  name="productCategory"
                  className="form-input"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </div>

              {/* Product Subcategory */}
              <div>
                <label className="form-label">Product Subcategory</label>
                <Field
                  as="select"
                  name="productSubcategory"
                  className="form-input"
                >
                  <option value="">Select Subcategory</option>
                  {categories?.map((category) =>
                    category.subcategories?.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))
                  )}
                </Field>
              </div>

              {/* Product Application */}
              <div>
                <label className="form-label">Product Application</label>
                <Field
                  as="select"
                  name="productApplication"
                  className="form-input"
                >
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
                <label className="form-label">Product Subapplication</label>
                <Field
                  as="select"
                  name="productSubapplication"
                  className="form-input"
                >
                  <option value="">Select Subapplication</option>
                  {applications?.map((app) =>
                    app.subapplications?.map((subApp) => (
                      <option key={subApp.id} value={subApp.id}>
                        {subApp.name}
                      </option>
                    ))
                  )}
                </Field>
              </div>

              {/* Industry Category */}
              <div>
                <label className="form-label">Industry Category</label>
                <Field
                  as="select"
                  name="productIndustryCategory"
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
                  name="productIndustrySubcategory"
                  className="form-input"
                >
                  <option value="">Select Industry Subcategory</option>
                  {industryCategories?.map((industry) =>
                    industry.subcategories?.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))
                  )}
                </Field>
              </div>

              {/* Product Brand */}
              <div>
                <label className="form-label">Product Brand</label>
                <Field as="select" name="productBrand" className="form-input">
                  <option value="">Select Brand</option>
                  {brands?.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </Field>
              </div>

              <SeoMeta />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Processing..."
                  : initialData
                  ? "Update Product"
                  : "Save Product"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
