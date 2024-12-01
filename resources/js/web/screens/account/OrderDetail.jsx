import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router-dom";
import ApiExecute from "../../../api";

const OrderDetail = () => {
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
    <div className="p-4">
      <div className="bg-white p-4 rounded-lg">
        <div>
          <h1 className="text-3xl font-semibold text-gray-700">
            Order Details
          </h1>
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
      </div>
    </div>
  );
};

export default OrderDetail;
