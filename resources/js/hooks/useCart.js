import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteCart,
  emptyCart,
  updateCart,
} from "../redux/actions/cartAction";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ApiExecute from "../api";

let fetchPromise = null;

const fetchProducts = async (cartItems) => {
  if (!fetchPromise) {
    fetchPromise = ApiExecute("cart", {
      method: "POST",
      data: { cartItems },
    }).finally(() => {
      fetchPromise = null;
    });
  }
  return fetchPromise;
};

const useCart = () => {
  const [cartLoading, setCartLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  const { cartItems } = useSelector((state) => state?.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(cartItems)?.length) {
      setCartLoading(true);
      fetchProducts(cartItems).then((response) => {
        if (response.status) {
          setCartProducts(response.data);
        }
        setCartLoading(false);
      });
    } else {
      setCartProducts([]);
    }
  }, [cartItems]);

  const saveToCart = (product, qty = 1) => {
    dispatch(addToCart(product.id, qty));
    toast.success(`Product ${product.name} has been added to cart.`);
  };

  const removeCart = (product) => {
    dispatch(deleteCart(product.id));
    toast.success(`Product ${product.name} has been removed from cart.`);
  };

  const updateToCart = (product, qty) => {
    dispatch(updateCart(product.id, qty));
    toast.success(`Product ${product.name} has been updated to cart.`);
  };

  const deleteAllCart = () => {
    dispatch(emptyCart());
    toast.success(`Cart is empty now.`);
  };

  const cartCounter = Object.keys(cartItems).length;

  return {
    saveToCart,
    removeCart,
    updateToCart,
    deleteAllCart,
    cartLoading,
    cartProducts,
    cartCounter,
  };
};

export default useCart;
