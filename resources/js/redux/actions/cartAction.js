import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_CART,
  UPDATE_CART,
} from "../constants/cartConstant";

export const addToCart =
  (pId, qty = 1) =>
  (dispatch) => {
    return dispatch({
      type: ADD_TO_CART,
      payload: {
        pId,
        qty,
      },
    });
  };

export const updateCart = (pId, qty) => (dispatch) => {
  return dispatch({
    type: UPDATE_CART,
    payload: {
      pId,
      qty,
    },
  });
};

export const deleteCart = (pId) => (dispatch) => {
  return dispatch({
    type: REMOVE_CART,
    payload: pId,
  });
};

export const emptyCart = () => (dispatch) => {
  return dispatch({
    type: EMPTY_CART,
  });
};
