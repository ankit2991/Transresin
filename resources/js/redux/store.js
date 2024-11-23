import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import homeReducer from "./reducers/homeReducer";
import cartReducer from "./reducers/cartReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    cart: cartReducer,
  },
});
