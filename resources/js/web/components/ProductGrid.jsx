import React from "react";
import { BsCartPlus, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

const ProductGrid = ({ product }) => {
  const { saveToCart } = useCart();

  return (
    <div key={product.id} className="bg-yellow-100 p-3 rounded-lg">
      <span className="bg-secondary px-3 py-1 rounded-lg text-primary-300 font-bold">
        SALE
      </span>
      <div className="p-3">
        <Link to={`/product/${product.slug}`} className="py-3">
          <img src={product.image} alt={product.name} className="w-full" />
        </Link>
        <Link
          to={`/product/${product.slug}`}
          className="font-bold text-primary-300"
        >
          {product.name}
        </Link>
        <div className="flex gap-2 mt-2">
          <div className="flex text-orange-400 gap-1">
            <BsStarFill size={12} />
            <BsStarFill size={12} />
            <BsStarFill size={12} />
            <BsStarFill size={12} />
            <BsStarHalf size={12} />
          </div>
          <div className="text-xs text-primary-300">
            {product?.reviews} Reviews
          </div>
        </div>
        <div className="flex items-end gap-3 py-3">
          <del className="text-gray-400">₹.{product.regular_price}</del>
          <big className="font-semibold text-primary-300 text-3xl">
            ₹.{product.trade_price}
          </big>
        </div>
        <div className="d-grid">
          <button
            className="bg-secondary py-2 rounded-md font-bold w-full flex items-center justify-center gap-2 text-primary-300 hover:bg-primary-300 hover:text-white"
            onClick={() => saveToCart(product)}
          >
            <BsCartPlus /> Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
