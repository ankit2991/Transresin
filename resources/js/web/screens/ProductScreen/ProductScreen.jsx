import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import ProductGrid from "../../components/ProductGrid";
import Spinner from "../../components/Spinner";
import { useLocation, useParams } from "react-router-dom";

const ProductScreen = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);

  const { application, sub_application, category, industryCategory, brand } =
    useParams();
  const location = useLocation();

  const fetchProducts = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        let url = `product?`;

        if (application) url += `&application=${application}`;
        if (sub_application) url += `&sub_application=${sub_application}`;
        if (category) url += `&category=${category}`;
        if (industryCategory) url += `&industry_category=${industryCategory}`;
        if (brand) url += `&brand=${brand}`;

        let response = await ApiExecute(url);
        setProducts(response?.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [application, sub_application, category, industryCategory, brand]
  );

  useEffect(() => {
    fetchProducts();
  }, [application, sub_application, category, industryCategory, brand]);

  const getTitle = () => {
    let title = "Product Finder";
    if (application) {
      title = "Product By Application";
    }
    if (category) {
      title = "Product Category";
    }
    if (brand) {
      title = "Brands";
    }
    if (industryCategory) {
      title = "Industry Category";
    }
    return title;
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl mb-5 font-bold pb-2 border-b-2 border-b-primary-300 text-primary-300 flex items-center">
        {getTitle()}
        <div className="ms-auto text-sm text-gray-400">
          Items {products?.from} to {products?.to} of {products?.total} are
          showing.
        </div>
      </h1>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {products?.total ? (
            <div>
              <div className="grid grid-cols-4 gap-5">
                {products?.data?.map((product) => (
                  <ProductGrid product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div> No Products found.</div>
          )}
        </>
      )}

      {/* {JSON.stringify(products)} */}
    </div>
  );
};

export default ProductScreen;
