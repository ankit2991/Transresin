import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
// import AddOrder from "./AddOrder";

const OrderScreen = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedOrders, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState({});

  const [limit, setLimit] = useState(10);

  // const toggleModal = (order = null) => {
  //   setSelectedOrder(order);
  //   setIsModalOpen(!isModalOpen);
  // };

  const fetchOrders = useCallback(
    async (page = 1) => {
      const apiResponse = await ApiExecute(`order?page=${page}&limit=${limit}`);

      if (apiResponse.status) setOrders(apiResponse.data);
    },
    [limit]
  );

  const deleteOrder = async (orderSlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this order?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`order/${orderSlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal("Deleted!", "Order deleted successfully!", "success");
          fetchOrders(); // Reload orders after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the order. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
        <LaravelPagination
          items={orders}
          fetchData={fetchOrders}
          limit={limit}
          setLimit={setLimit}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Billing Details</th>
                <th>Shipping Details</th>
                <th>Payment Status</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {orders?.data?.map((order, index) => {
                const hasChildren = orders.data.some(
                  (cat) => cat.parent?.id === order.id
                );
                return (
                  <tr key={index}>
                    <td>{index + orders.from}.</td>
                    <td>{order.order_token}</td>
                    <td>₹{order.total_amount}</td>
                    <td>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="font-bold">Name:</strong>
                          <span>
                            {order?.billing_first_name +
                              " " +
                              (order?.billing_last_name || "")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <strong className="font-bold">Email:</strong>
                          <span>{order?.billing_email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <strong className="font-bold">Phone:</strong>
                          <span>{order?.billing_phone}</span>
                        </div>
                        <div>
                          <div className="font-bold">Address:</div>
                          <div className="capitalize">
                            {order?.billing_address}, {order?.billing_city},{" "}
                            {order?.billing_state}, {order?.billing_zip}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="font-bold">Name:</strong>
                          <span>
                            {order?.shipping_first_name +
                              " " +
                              (order?.shipping_last_name || "")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <strong className="font-bold">Email:</strong>
                          <span>{order?.shipping_email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <strong className="font-bold">Phone:</strong>
                          <span>{order?.shipping_phone}</span>
                        </div>
                        <div>
                          <div className="font-bold">Address:</div>
                          <div className="capitalize">
                            {order?.shipping_address}, {order?.shipping_city},{" "}
                            {order?.shipping_state}, {order?.shipping_zip}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      {order?.is_paid === "Y" ? (
                        <div className="bg-green-700 px-3 py-2 text-white rounded w-full">
                          Yes
                        </div>
                      ) : (
                        <div className="bg-red-700 px-3 py-2 text-white rounded w-full">
                          No
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </LaravelPagination>
      </div>

      {/* Modal for adding a new product order */}
      {/* <AddOrder
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchOrders();
        }}
        initialData={selectedOrders}
      /> */}
    </div>
  );
};

export default OrderScreen;
