import React from "react";
import { BiCheck, BiMinus, BiPlus } from "react-icons/bi";
import { MdDelete, MdShoppingCart } from "react-icons/md";
import useCart from "../../../hooks/useCart";
import Spinner from "../../components/Spinner";
import { PiEmpty } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CartScreen = () => {
  const {
    cartProducts,
    cartCounter,
    deleteAllCart,
    removeCart,
    updateToCart,
    cartLoading,
  } = useCart();

  const handleUpdate = (type, product) => {
    let qty;
    if (type === "plus") {
      qty = parseInt(product.qty) + 1;
    } else {
      qty = product?.qty > 1 ? parseInt(product.qty) - 1 : 1;
    }

    updateToCart(product, qty);
  };

  const discountCode = "SAVE20";
  const discountAmount = cartProducts
    .reduce(
      (acc, item) => acc + (item.regular_price - item.trade_price) * item?.qty,
      0
    )
    .toFixed(2);
  const shippingCost = 6.99;
  const subtotal = cartProducts
    .reduce((acc, item) => acc + item.regular_price * item?.qty, 0)
    .toFixed(2);
  const finalTotal = cartProducts
    .reduce((acc, item) => acc + item.trade_price * item?.qty, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto">
      {cartCounter ? (
        <div className="flex py-10 gap-5">
          <div className="grow shadow-lg border border-gray-100 p-5 rounded-lg">
            <h2 className="mb-3 font-bold text-2xl text-primary-300">
              Shopping Cart
            </h2>
            <div>
              {cartLoading ? (
                <div>
                  <Spinner />
                </div>
              ) : (
                <>
                  {cartProducts.map((item, index) => (
                    <div className="flex items-center mb-5 gap-5" key={index}>
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="aspect-square w-12 rounded object-contain"
                        />
                      </div>
                      <div className="grow">
                        <div className="font-bold">
                          <span>{item.name}</span>
                        </div>
                        <div>
                          <del className="me-3 text-gray-400">
                            ₹{item.regular_price}
                          </del>
                          <span className="text-primary-300 font-bold text-xl">
                            ₹{item.trade_price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <button
                            className="bg-primary-300 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleUpdate("minus", item)}
                            disabled={item.qty === 1}
                          >
                            <BiMinus />
                          </button>
                          <input
                            type="text"
                            value={item.qty}
                            readOnly
                            className="text-center w-[70px] border rounded"
                          />
                          <button
                            className="bg-primary-300 text-white rounded-full"
                            onClick={() => handleUpdate("plus", item)}
                          >
                            <BiPlus />
                          </button>
                        </div>
                      </div>
                      <div>₹{(item.trade_price * item.qty).toFixed(2)}</div>
                      <div>
                        <button
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeCart(item)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="bg-white border-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between items-center mb-4">
              <span className="bg-primary-300 text-white px-3 py-1 rounded">
                {cartCounter} items
              </span>
              <span className="font-semibold text-lg">₹{subtotal}</span>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-4" />

            {/* <div className="mb-4">
              <label htmlFor="shipping" className="block mb-1 font-medium">
                Shipping Method:
              </label>
              <select
                id="shipping"
                className="w-full border rounded px-3 py-2 focus:ring-primary-300 focus:border-primary-300"
              >
                <option value="Express Delivery - ₹6.99">
                  Express Delivery - ₹6.99
                </option>
              </select>
            </div> */}

            {/* Divider */}
            <hr className="border-gray-200 my-4" />

            <div className="mb-4">
              <label htmlFor="discount" className="block mb-1 font-medium">
                Discount Code:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="discount"
                  placeholder="Enter a code"
                  className="border px-3 py-2 rounded w-full focus:ring-primary-300 focus:border-primary-300"
                />
                <button
                  className="bg-primary-300 text-white hover:bg-primary-600 px-3 py-2 rounded"
                  aria-label="Apply discount"
                >
                  <BiCheck />
                </button>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-4" />

            <div className="text-sm mb-4">
              <p className="flex justify-between">
                <span>Discount:</span>
                <span>₹{discountAmount}</span>
              </p>
              {/* <p className="flex justify-between">
                <span>Shipping:</span>
                <span>₹{shippingCost.toFixed(2)}</span>
              </p> */}
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-4" />

            <p className="flex flex-col my-5">
              <span>Total Payable Amount:</span>
              <span className="font-bold text-3xl text-primary-300">
                ₹{finalTotal}
              </span>
            </p>

            {/* Divider */}
            <hr className="border-gray-200 my-4" />

            <button className="bg-primary-300 text-white rounded-lg py-2 w-full hover:bg-primary-600 transition-colors">
              Continue to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-16">
          <MdShoppingCart size={128} className="text-primary-300" />
          <div className="text-3xl font-bold text-primary-300">
            Cart is empty
          </div>

          <Link to={`/product`} className="btn-primary">
            Continoue Shopping
            <FaArrowRightLong />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
