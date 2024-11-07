import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import homeReducer from "./reducers/homeReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
  },
});
