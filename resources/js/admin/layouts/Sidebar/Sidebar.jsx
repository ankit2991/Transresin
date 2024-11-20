import React, { useState } from "react";
import {
  FaHome,
  FaBox,
  FaHeart,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ADMIN_URL = "/transresin-panel/";

const Sidebar = () => {
  const [selected, setSelected] = useState(""); // State to track selected link

  return (
    <div className="bg-white w-64 h-screen shadow-lg h-100 flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-500">Transresin</h1>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-2 flex-1 overflow-auto">
        <NavLink
          to={ADMIN_URL}
          className={`flex items-center p-2 rounded-lg`}
          end
        >
          <FaHome className="mr-3" /> Dashboard
        </NavLink>
        <NavLink
          to={`${ADMIN_URL}product-application`}
          className={`flex items-center p-2 rounded-lg`}
        >
          <FaBox className="mr-3" /> Product Application
        </NavLink>
        <NavLink
          to={`${ADMIN_URL}product-category`}
          className={`flex items-center p-2 rounded-lg`}
        >
          <FaBox className="mr-3" /> Product Category
        </NavLink>
        <NavLink
          to={`${ADMIN_URL}industry-category`}
          className={`flex items-center p-2 rounded-lg`}
        >
          <FaBox className="mr-3" /> Industry Category
        </NavLink>
        <NavLink
          to={`${ADMIN_URL}brands`}
          className={`flex items-center p-2 rounded-lg `}
        >
          <FaBox className="mr-3" /> Brands
        </NavLink>
        <NavLink
          to={`${ADMIN_URL}hsn-code`}
          className={`flex items-center p-2 rounded-lg`}
        >
          <FaBox className="mr-3" /> HSN / SAC
        </NavLink>
        <NavLink
          to={`${ADMIN_URL}products`}
          className={`flex items-center p-2 rounded-lg`}
        >
          <FaHeart className="mr-3" /> Products
        </NavLink>
        <NavLink
          to={`${ADMIN_URL}order-lists`}
          className={`flex items-center p-2 rounded-lg`}
        >
          <FaClipboardList className="mr-3" /> Order Lists
        </NavLink>
      </nav>

      {/* Additional Links */}
      <div className="mt-4 p-4 space-y-2">
        <NavLink
          to={`${ADMIN_URL}settings`}
          className={`flex items-center p-2 rounded-lg`}
        >
          <FaCog className="mr-3" /> Settings
        </NavLink>
        <NavLink
          to={`${ADMIN_URL}logout`}
          className={`flex items-center p-2 rounded-lg`}
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
