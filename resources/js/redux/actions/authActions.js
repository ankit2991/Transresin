import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/authConstant";
import { UPDATE_USER } from "../constants/authConstant copy";

export const doLogin = (payload) => (dispatch) => {
  return dispatch({
    type: LOGIN_SUCCESS,
    payload,
  });
};

export const updateUser = (payload) => (dispatch) => {
  return dispatch({
    type: UPDATE_USER,
    payload,
  });
};

export const doLogout = () => (dispatch) => {
  return dispatch({
    type: LOGOUT_SUCCESS,
    payload: null,
  });
};
