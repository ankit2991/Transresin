import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import { BsCartPlus, BsStarFill, BsStarHalf } from "react-icons/bs";

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
          Items {products.from} to {products.to} of {products.total} are
          showing.
        </div>
      </h1>

      {products?.total ? (
        <div>
          <div className="grid grid-cols-4 gap-5">
            {products?.data?.map((product) => (
              <div key={product.id} className="bg-yellow-100 p-3 rounded-lg">
                <span className="bg-secondary px-3 py-1 rounded-lg">SALE</span>
                <div className="py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full"
                  />
                </div>
                <h3 className="font-bold ">{product.name}</h3>
                <div className="flex gap-2 items-center">
                  <div className="flex text-orange-400">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarHalf />
                  </div>
                  <div className="text-sm">{product?.reviews} Reviews</div>
                </div>
                <div className="flex items-center gap-3 py-3">
                  <del className="text-gray-400">₹{product.regular_price}</del>
                  <big className="font-semibold text-primary-300 text-3xl">
                    ₹{product.trade_price}
                  </big>
                </div>
                <div className="d-grid">
                  <button className="bg-secondary py-2 rounded-md font-bold w-full flex items-center justify-center gap-2 text-primary-300 hover:bg-primary-300 hover:text-white">
                    <BsCartPlus /> Add To Cart
                  </button>
                </div>
              </div>
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
