import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/authConstant";

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
      updatedState = {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
      };
      break;

    default:
      break;
  }

  return updatedState;
}
