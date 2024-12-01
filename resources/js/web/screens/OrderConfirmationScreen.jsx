import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiExecute from "../../api";
import Spinner from "../components/Spinner";
import { BiPrinter } from "react-icons/bi";

const OrderConfirmationScreen = () => {
  const { token } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    async function fetchOrderInfo() {
      setLoading(true);
      let apiResponse = await ApiExecute(`order/${token}`);
      setLoading(false);
      if (apiResponse.status) setOrder(apiResponse.data);
    }
    fetchOrderInfo();
  }, [token]);

  if (loading) return <Spinner />;

  return (
    <div className="py-16 bg-blue-50 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-green-600 text-center">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Your order has been successfully placed. Below are the order details.
        </p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Order Details</h2>
          <div className="border-t border-gray-200 mt-2"></div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span className="font-bold">Order ID:</span>
              <span className="text-primary-300 font-bold text-lg">
                {order?.order_token}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="font-bold">Order Status:</span>
              <span>{order?.status}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="font-bold">Total Amount:</span>
              <span>₹{order?.total_amount}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Billing Details
            </h2>
            <div className="border-t border-gray-200 mt-2"></div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span className="font-bold">Name:</span>
                <span>
                  {order?.billing_first_name +
                    " " +
                    (order?.billing_last_name || "")}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-bold">Email:</span>
                <span>{order?.billing_email}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-bold">Phone:</span>
                <span>{order?.billing_phone}</span>
              </div>
              <div className=" text-gray-600">
                <div className="font-bold">Address:</div>
                <div>
                  {order?.billing_address}, {order?.billing_city},{" "}
                  {order?.billing_state}, {order?.billing_zip}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Shipping Details
            </h2>
            <div className="border-t border-gray-200 mt-2"></div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span className="font-bold">Name:</span>
                <span>
                  {order?.shipping_first_name +
                    " " +
                    (order?.shipping_last_name || "")}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-bold">Email:</span>
                <span>{order?.shipping_email}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-bold">Phone:</span>
                <span>{order?.shipping_phone}</span>
              </div>
              <div className=" text-gray-600">
                <div className="font-bold">Address:</div>
                <div>
                  {order?.shipping_address}, {order?.shipping_city},{" "}
                  {order?.shipping_state}, {order?.shipping_zip}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">Products</h2>
          <div className="border-t border-gray-200 mt-2"></div>
          <div className="mt-4">
            {order?.products?.map((pkg, index) => (
              <div
                key={index}
                className="flex gap-3 items-center rounded-md mb-2"
              >
                <div className="rounded-lg border-2 border-primary-300 overflow-hidden">
                  <img src={pkg?.product.image} alt="" className="w-12" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium">
                    {pkg?.product?.name} ({pkg.name})
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Quantity: {pkg?.pivot.qty}
                  </p>
                </div>
                <span className="text-gray-800 font-semibold ms-auto">
                  ₹{pkg?.pivot.price * pkg?.pivot.qty}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center flex items-center justify-between gap-10">
          <button
            className="bg-primary-300 inline-flex items-center gap-3 text-white px-6 py-2 rounded-md shadow-md hover:bg-primary-600 transition"
            onClick={() => window.print()}
          >
            <BiPrinter /> Print
          </button>

          <Link
            to="/"
            className="bg-gray-200 inline-flex items-center gap-3 text-primary-300 px-6 py-2 rounded-md shadow-md hover:bg-primary-300 hover:text-white transition"
          >
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationScreen;
