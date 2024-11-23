import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import { BsCartPlus, BsStarFill, BsStarHalf } from "react-icons/bs";
import ProductGrid from "../../components/ProductGrid";

const ProductScreen = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);

  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      let response = await ApiExecute(`product`);

      console.log("response: ", response);
      setProducts(response?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl mb-5 font-bold pb-2 border-b-2 border-b-primary-300 text-primary-300 flex items-center">
        Product Finder
        <div className="ms-auto text-sm text-gray-400">
          Items {products?.from} to {products?.to} of {products?.total} are
          showing.
        </div>
      </h1>

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

      {/* {JSON.stringify(products)} */}
    </div>
  );
};

export default ProductScreen;
