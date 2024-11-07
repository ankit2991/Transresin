import React from "react";
import { FaBars, FaSearch, FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full bg-white shadow-md py-2 border-b border-purple-500">
      <div className="flex items-center justify-between px-4 lg:px-8 w-full">
        {/* Left section with menu icon and search bar */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Menu Icon */}
          <FaBars className="text-gray-500 cursor-pointer" />

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
          </div>
        </div>

        {/* Right section with notification, language, and profile */}
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative">
            <FaBell className="text-blue-500 text-2xl cursor-pointer" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </div>

          {/* Language and User Profile */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="https://via.placeholder.com/32"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-gray-800">
              <p className="text-sm font-semibold">Kunnal Verma</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
