import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_CART,
  UPDATE_CART,
} from "../constants/cartConstant";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("@cart_items")) || {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  let newState = state;

  switch (type) {
    case ADD_TO_CART:
      newState = {
        ...state,
        cartItems: {
          ...state.cartItems,
          [payload.pId]: state.cartItems[payload.pId]
            ? parseInt(state.cartItems[payload.pId]) + parseInt(payload.qty)
            : parseInt(payload.qty),
        },
      };
      break;

    case UPDATE_CART:
      newState = {
        ...state,
        cartItems: {
          ...state.cartItems,
          [payload.pId]: parseInt(payload.qty), // Update to the specific quantity
        },
      };
      break;

    case REMOVE_CART:
      const updatedCartItems = { ...state.cartItems };
      delete updatedCartItems[payload]; // Remove the product by pId
      newState = {
        ...state,
        cartItems: updatedCartItems,
      };
      break;

    case EMPTY_CART:
      newState = {
        ...state,
        cartItems: {},
      };
      break;

    default:
      break;
  }

  localStorage.setItem("@cart_items", JSON.stringify(newState.cartItems));

  return newState;
}
