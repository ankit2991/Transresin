import React, { useState, useEffect } from "react";
import ApiExecute from "../../../api";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ initialData = null }) => {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [applications, setApplications] = useState([]);
  const [industryCategories, setIndustryCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hsnCodes, setHsnCodes] = useState([]);
  const [features, setFeatures] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description1: initialData?.description1 || "",
    description2: initialData?.description2 || "",
    description3: initialData?.description3 || "",
    category_id: initialData?.category_id || "",
    sub_category_id: initialData?.sub_category_id || "",
    // regular_price: initialData?.regular_price || "",
    // discount: initialData?.discount || "",
    // trade_price: initialData?.trade_price || "",
    application_id: initialData?.application_id || "",
    sub_application_id: initialData?.sub_application_id || "",
    industry_category_id: initialData?.industry_category_id || "",
    sub_industry_category_id: initialData?.sub_industry_category_id || "",
    brand_id: initialData?.brand_id || "",
    hsn_code_id: initialData?.hsn_code_id || "",

    seo_title: initialData?.seo_title || "",
    seo_keywords: initialData?.seo_keywords || "",
    seo_description: initialData?.seo_description || "",
    image: "",
    images: [],
    materials: [],
    features: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const categoryResponse = await ApiExecute("category?type=dropdown");
        const applicationResponse = await ApiExecute(
          "application?type=dropdown"
        );
        const industryCategoryResponse = await ApiExecute(
          "industry?type=dropdown"
        );
        const brandResponse = await ApiExecute("brand?type=dropdown");
        const hsnCodesResponse = await ApiExecute("hsn-code?type=dropdown");
        const materialResponse = await ApiExecute("material?type=dropdown");
        const featureResponse = await ApiExecute("feature?type=dropdown");

        setCategories(categoryResponse.data);
        setApplications(applicationResponse.data);
        setIndustryCategories(industryCategoryResponse.data);
        setBrands(brandResponse.data);
        setHsnCodes(hsnCodesResponse?.data);
        setFeatures(featureResponse?.data);
        setMaterials(materialResponse?.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleFinalSubmit = async () => {
    const url = initialData ? `product/${initialData.slug}` : "product";

    try {
      const apiResponse = await ApiExecute(url, {
        method: "POST",
        data: {
          ...formData,
          features: formData?.features?.map((f) => f.value),
          materials: formData?.materials?.map((m) => m.value),
          _method: initialData ? "PUT" : "POST",
        },
      });

      if (apiResponse.status) {
        toast.success(apiResponse.data?.message);
        navigate("/transresin-panel/products");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow p-3 rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">
          {initialData ? "Edit Product" : "Add Product"}
        </h1>

        {step === 1 && (
          <Step1
            applications={applications}
            industryCategories={industryCategories}
            brands={brands}
            hsnCodes={hsnCodes}
            categories={categories}
            materials={materials}
            features={features}
            initialValues={formData}
            onSubmit={(values) => {
              setFormData({ ...formData, ...values });
              setStep(step + 1);
            }}
          />
        )}
        {step === 2 && (
          <Step2
            initialValues={formData}
            onSubmit={(values) => {
              setFormData({ ...formData, ...values });
              setStep(step + 1);
            }}
          />
        )}
        {step === 3 && (
          <Step3
            initialValues={formData}
            initialData={initialData}
            onSubmit={(values) => {
              setFormData({ ...formData, ...values });
              setStep(step + 1);
            }}
          />
        )}
        {step === 4 && (
          <Step4
            initialValues={formData}
            onSubmit={(values) => {
              setFormData({ ...formData, ...values });
              handleFinalSubmit();
            }}
          />
        )}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
