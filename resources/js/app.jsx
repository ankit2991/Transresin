import { Provider } from "react-redux";
import store from "./redux/store";
import React from "react";
import ReactDOM from "react-dom/client";
import "../css/app.scss";
import AppRoutes from "./routes/AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <AppRoutes />
    </Provider>
  );
}

export default App;

if (document.getElementById("app")) {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
}
