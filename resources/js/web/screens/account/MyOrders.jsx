import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Spinner from "../../components/Spinner";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchMyOrders = useCallback(async () => {
    setLoading(true);
    let apiResponse = await ApiExecute(`order?type=my-orders`);
    setLoading(false);

    if (apiResponse.status) setOrders(apiResponse.data);
  }, []);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-2xl">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {orders?.total ? (
              <ul className="border rounded-lg">
                {orders?.data?.map((order) => (
                  <li
                    key={order.id}
                    className="p-4 border-b last:border-none flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong className="font-bold">Order ID:</strong>{" "}
                        {order.order_token}
                      </p>
                      <p>
                        <strong className="font-bold">Date:</strong>{" "}
                        {moment(order.created_at).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong className="font-bold">Total:</strong> ₹
                        {order.total_amount}
                      </p>
                      <p>
                        <strong className="font-bold">Status:</strong>{" "}
                        {order.status}
                      </p>
                    </div>
                    <div>
                      <Link
                        to={`/account/my-orders/${order.order_token}`}
                        className="border-2 border-primary-300 py-2 px-4 rounded-lg flex gap-2 items-center hover:bg-primary-300 hover:text-white uppercase"
                      >
                        Details
                        <FaLongArrowAltRight />
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>Haven't ordered yet.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
