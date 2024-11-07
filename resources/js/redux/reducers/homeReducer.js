import { SET_MENUS } from "../constants/homeConstant";

const initialState = {
  menus: [],
};

export default function homeReducer(state = initialState, action) {
  const { type, payload } = action;

  let updatedState = state;
  switch (type) {
    case SET_MENUS:
      updatedState = {
        ...state,
        menus: payload,
      };
      break;

    default:
      break;
  }

  return updatedState;
}
