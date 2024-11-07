import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/authConstant";

export const doLogin = (payload) => (dispatch) => {
  return dispatch({
    type: LOGIN_SUCCESS,
    payload,
  });
};

export const doLogout = () => (dispatch) => {
  return dispatch({
    type: LOGOUT_SUCCESS,
    payload: null,
  });
};
