import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/authConstant";
import { UPDATE_USER } from "../constants/authConstant copy";

const user = localStorage.getItem("@user");
const token = localStorage.getItem("@token");

const initialState = {
  isLoggedIn: user && token ? true : false,
  user: user ? JSON.parse(user) : null,
  token: token || null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  let updatedState = state;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("@user", JSON.stringify(payload.user));
      localStorage.setItem("@token", payload.token);

      updatedState = {
        ...state,
        isLoggedIn: true,
        user: payload?.user,
        token: payload?.token,
      };
      break;

    case LOGOUT_SUCCESS:
      localStorage.removeItem("@user");
      localStorage.removeItem("@token");

      updatedState = {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
      };
      break;

    case UPDATE_USER:
      localStorage.setItem("@user", JSON.stringify(payload));

      updatedState = {
        ...state,
        user: payload,
      };

    default:
      break;
  }

  return updatedState;
}
