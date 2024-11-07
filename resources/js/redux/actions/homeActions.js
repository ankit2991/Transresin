import { SET_MENUS } from "../constants/homeConstant";

export const setMenus = (payload) => (dispatch) => {
  return dispatch({
    type: SET_MENUS,
    payload,
  });
};
