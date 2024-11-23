import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ApiExecute from "../../api";
import { useDispatch } from "react-redux";
import { setMenus } from "../../redux/actions/homeActions";
import Header from "./Header";

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
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MobileLayout;
