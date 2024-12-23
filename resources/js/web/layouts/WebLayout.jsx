import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ApiExecute from "../../api";
import { useDispatch } from "react-redux";
import { setMenus } from "../../redux/actions/homeActions";

const WebLayout = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner
  }, [location]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiResponse = await ApiExecute("/");
        if (apiResponse.status) {
          dispatch(setMenus(apiResponse.data));
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default WebLayout;
