import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ApiExecute from "../../api";
import { useDispatch } from "react-redux";
import { setMenus } from "../../redux/actions/homeActions";
import Header from "./Header";
import Footer from "./Footer";

const MobileLayout = () => {
  const dispatch = useDispatch();

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
    <div className="mx-4">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MobileLayout;
