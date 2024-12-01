import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useCart from "../../hooks/useCart";
import ApiExecute from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRazorpay } from "react-razorpay";
import { useSelector } from "react-redux";

const CheckoutScreen = () => {
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const { cartProducts, deleteAllCart } = useCart();
  const { error, isLoading, Razorpay } = useRazorpay();
  const { user, isLoggedIn } = useSelector((state) => state?.auth);

  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    billing: Yup.object({
      firstName: Yup.string().required("First name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.string().required("PIN code is required"),
    }),
    shipping: Yup.object({
      firstName: Yup.string().required("First name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.string().required("PIN code is required"),
    }),
  });

  const initialValues = {
    billing: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
      phone: user?.mobile || "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    shipping: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
      phone: user?.mobile || "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
  };

  const finalTotal = cartProducts.reduce(
    (acc, item) => acc + item.trade_price * item?.qty,
    0
  );
  const handleSameAsBilling = (setFieldValue, values) => {
    setSameAsBilling((prev) => !prev);
    if (!sameAsBilling) {
      setFieldValue("shipping", values.billing);
    }
  };

  const handleSubmit = async (values) => {
    let data = {
      total_amount: finalTotal,
      cart_items: cartProducts?.map((cPro) => ({
        product_package_id: cPro.id,
        price: cPro.trade_price,
        qty: cPro.qty,
      })),
    };

    for (var key in values.billing) {
      data = {
        ...data,
        [`billing_${key.replace(/([A-Z])/g, "_$1").toLowerCase()}`]:
          values.billing[key],
      };
    }

    for (var key in values.shipping) {
      data = {
        ...data,
        [`shipping_${key.replace(/([A-Z])/g, "_$1").toLowerCase()}`]:
          values.billing[key],
      };
    }

    let apiResponse = await ApiExecute(isLoggedIn ? "order" : "web/order", {
      method: "POST",
      data,
    });

    if (apiResponse.status) {
      deleteAllCart();

      const options = {
        key: "rzp_test_NOV8qZJz1V40c7", // Replace with your Razorpay key
        amount: finalTotal * 100,
        currency: "INR",
        name: "Transresin",
        description: "",
        order_id: apiResponse?.data?.order_token,
        handler: async (response) => {
          // Send the payment response to the server
          let paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          await ApiExecute(`order/${apiResponse?.data?.order_token}`, {
            method: "POST",
            data: {
              _method: "PUT",
              txn_id: paymentData.razorpay_payment_id,
            },
          });

          navigate(`/order-confirmation/${apiResponse.data.order_token}`);
        },
        prefill: {
          name: values.billing.firstName,
          email: values.billing.email,
          contact: values.billing.phone,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
      //   navigate(`/order-confirmation/${apiResponse.data.order_token}`);
    } else {
      toast.error("Ooops! Somenthing Went wrong, please try again.");
    }
  };

  return (
    <div className=" bg-blue-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
        </div>
      </section>

      {isLoading && <p>Loading Razorpay...</p>}
      {error && <p>Error loading Razorpay: {error}</p>}

      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section: Address Forms */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="space-y-6 lg:col-span-2">
                {/* Billing Address Card */}
                <div className="p-6 bg-white shadow-md rounded-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Billing Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* First Name */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="billing.firstName"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter first name"
                      />
                      <ErrorMessage
                        name="billing.firstName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="billing.lastName"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter last name"
                      />
                      <ErrorMessage
                        name="billing.lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Email</label>
                      <Field
                        type="email"
                        name="billing.email"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter email"
                      />
                      <ErrorMessage
                        name="billing.email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Phone</label>
                      <Field
                        type="text"
                        name="billing.phone"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter phone"
                      />
                      <ErrorMessage
                        name="billing.phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Address (Textarea) */}
                    <div className="flex flex-col col-span-2">
                      <label className="text-sm font-medium mb-1">
                        Address
                      </label>
                      <Field
                        as="textarea"
                        name="billing.address"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter address"
                        rows="3"
                      />
                      <ErrorMessage
                        name="billing.address"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  {/* State, City, PIN in One Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* State */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">State</label>
                      <Field
                        type="text"
                        name="billing.state"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter state"
                      />
                      <ErrorMessage
                        name="billing.state"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* City */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">City</label>
                      <Field
                        type="text"
                        name="billing.city"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter city"
                      />
                      <ErrorMessage
                        name="billing.city"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* PIN */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">PIN</label>
                      <Field
                        type="text"
                        name="billing.zip"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter PIN"
                      />
                      <ErrorMessage
                        name="billing.zip"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address Card */}
                <div className="p-6 bg-white shadow-md rounded-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Shipping Address
                  </h2>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      checked={sameAsBilling}
                      onChange={() =>
                        handleSameAsBilling(setFieldValue, values)
                      }
                      className="mr-2"
                      id="sameAs"
                    />
                    <label className="text-sm" htmlFor="sameAs">
                      Same as billing address
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* First Name */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="shipping.firstName"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter first name"
                      />
                      <ErrorMessage
                        name="shipping.firstName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="shipping.lastName"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter last name"
                      />
                      <ErrorMessage
                        name="shipping.lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Email</label>
                      <Field
                        type="email"
                        name="shipping.email"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter email"
                      />
                      <ErrorMessage
                        name="shipping.email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">Phone</label>
                      <Field
                        type="text"
                        name="shipping.phone"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter phone"
                      />
                      <ErrorMessage
                        name="shipping.phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Address (Textarea) */}
                    <div className="flex flex-col col-span-2">
                      <label className="text-sm font-medium mb-1">
                        Address
                      </label>
                      <Field
                        as="textarea"
                        name="shipping.address"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter address"
                        rows="3"
                      />
                      <ErrorMessage
                        name="shipping.address"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  {/* State, City, PIN in One Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* State */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">State</label>
                      <Field
                        type="text"
                        name="shipping.state"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter state"
                      />
                      <ErrorMessage
                        name="shipping.state"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* City */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">City</label>
                      <Field
                        type="text"
                        name="shipping.city"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter city"
                      />
                      <ErrorMessage
                        name="shipping.city"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {/* PIN */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-1">PIN</label>
                      <Field
                        type="text"
                        name="shipping.zip"
                        className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter PIN"
                      />
                      <ErrorMessage
                        name="shipping.zip"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary-300 text-white py-3 px-4 rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Proceed to Payment
                </button>
              </Form>
            )}
          </Formik>

          {/* Right Section: Cart Details */}
          <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            <div className="space-y-4">
              {/* Example Cart Item */}
              {cartProducts?.map((pkg) => (
                <div className="flex gap-2 items-center" key={pkg.id}>
                  <div className="rounded-lg overflow-hidden border-2">
                    <img
                      src={pkg.product.image}
                      alt=""
                      className="w-12 rounded"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{pkg.product.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {pkg.qty}</p>
                  </div>
                  <p className="font-medium ms-auto">
                    ₹{(pkg.trade_price * pkg.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center">
              <p className="font-semibold">Total:</p>
              <p className="font-bold text-lg">₹{finalTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
