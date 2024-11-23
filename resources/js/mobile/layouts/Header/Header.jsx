import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "./navlinks";
import "./styles.module.scss";
import { BiMenu, BiSearch, BiShoppingBag, BiUser } from "react-icons/bi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="overflow-x-hidden w-full">
      {/* Header for Mobile View */}
      <header className="relative bg-white shadow-md w-full">
        <div className="flex items-center justify-between px-4 py-3 w-full">
          {/* Left: Menu Icon */}
          <button
            className="text-blue-900"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <BiMenu size={28} />
          </button>

          {/* Left: Logo aligned with Menu Icon */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* Top Right Section: Present Logo */}
          <div className="absolute top-2 right-4">
            <img
              src="/images/present_logo.png"
              alt="Present Logo"
              className="h-6"
            />
          </div>
        </div>

        {/* Right Section: Icons */}
        <div className="flex justify-end items-center space-x-6 px-4 pb-3 text-blue-700">
          <Link to="/" className="hover:text-blue-900">
            <BiSearch size={24} />
          </Link>
          <Link to="/cart" className="hover:text-blue-900">
            <BiShoppingBag size={24} />
          </Link>
          <Link to="/login" className="hover:text-blue-900">
            <BiUser size={24} />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-blue-100 px-4 py-2 w-full">
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            className="w-full rounded-lg py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>

      {/* Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-blue-950 text-white z-50 w-full overflow-hidden">
          <div className="flex flex-col p-4 space-y-3">
            <button
              className="self-end text-white"
              onClick={() => setMenuOpen(false)}
            >
              Close
            </button>
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.target}
                className="block py-2 px-3 hover:bg-blue-800 rounded w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
