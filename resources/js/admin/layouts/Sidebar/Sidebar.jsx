import React, { useState } from "react";
import {
  FaHome,
  FaBox,
  FaHeart,
  FaEnvelope,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState(""); // State to track selected link

  const handleLinkClick = (link) => {
    setSelected(link); // Set the selected link
  };

  return (
    <div className="bg-white w-64 h-screen shadow-lg">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-500">Transresin</h1>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-2">
        <NavLink
          to="/transresin-panel"
          onClick={() => handleLinkClick("dashboard")}
          className={`flex items-center p-2 rounded-lg ${
            selected === "dashboard"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          end
        >
          <FaHome className="mr-3" /> Dashboard
        </NavLink>
        <NavLink
          to="/transresin-panel/product-application"
          onClick={() => handleLinkClick("product-application")}
          className={`flex items-center p-2 rounded-lg ${
            selected === "product-application"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FaBox className="mr-3" /> Product Application
        </NavLink>
        <NavLink
          to="/transresin-panel/product-category"
          onClick={() => handleLinkClick("product-category")}
          className={`flex items-center p-2 rounded-lg ${
            selected === "product-category"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FaBox className="mr-3" /> Product Category
        </NavLink>
        <NavLink
          to="/transresin-panel/industry-category"
          onClick={() => handleLinkClick("industry-category")}
          className={`flex items-center p-2 rounded-lg ${
            selected === "industry-category"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FaBox className="mr-3" /> Industry Category
        </NavLink>
        <NavLink
          to="/transresin-panel/brands"
          onClick={() => handleLinkClick("brands")}
          className={`flex items-center p-2 rounded-lg ${
            selected === "brands"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FaBox className="mr-3" /> Brands
        </NavLink>
        <NavLink
          to="/transresin-panel/products"
          onClick={() => handleLinkClick("products")}
          className={`flex items-center p-2 rounded-lg ${
            selected === "products"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FaHeart className="mr-3" /> Products
        </NavLink>
        <NavLink
          to="/transresin-panel/order-lists"
          onClick={() => handleLinkClick("order-lists")}
          className={`flex items-center p-2 rounded-lg ${
            selected === "order-lists"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FaClipboardList className="mr-3" /> Order Lists
        </NavLink>
      </nav>

      {/* Additional Links */}
      <div className="mt-4 p-4 space-y-2">
        <NavLink
          to="/transresin-panel/settings"
          onClick={() => handleLinkClick("settings")}
          className={`flex items-center p-2 rounded-lg ${
            selected === "settings"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FaCog className="mr-3" /> Settings
        </NavLink>
        <NavLink
          to="/transresin-panel/logout"
          onClick={() => handleLinkClick("logout")}
          className={`flex items-center p-2 rounded-lg ${
            selected === "logout"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
