import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "./navlinks";
import "./styles.module.scss";
import {
  BiMenu,
  BiSearch,
  BiShoppingBag,
  BiUser,
  BiUserCircle,
} from "react-icons/bi";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="overflow-x-hidden w-full">
      {/* Header for Mobile View */}
      <header className="relative bg-white shadow-md w-full">
        <div className="flex items-end pt-10 w-full">
          {/* Left: Menu Icon */}
          <button
            className="text-blue-900 self-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <BiMenu size={28} />
          </button>

          {/* Left: Logo aligned with Menu Icon */}
          <div>
            <Link to="/">
              <img src="/images/logo.png" alt="Logo" className="h-[40px]" />
            </Link>
          </div>

          {/* Top Right Section: Present Logo */}
          <div className="absolute top-2 right-[-8px]">
            <img
              src="/images/present_logo.png"
              alt="Present Logo"
              className="h-10"
            />
          </div>
          {/* Right Section: Icons */}
          <div className="flex justify-end items-center gap-2 ms-auto  text-primary-300">
            <Link to="/login" className="flex gap-1">
              <BiUserCircle size={24} /> Login
            </Link>
            <Link to="/cart">
              <MdOutlineShoppingCart size={24} />
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white py-2 w-full">
          <div className="flex bg-blue-100 items-center rounded-lg text-blue-300">
            <label htmlFor="search" className="mx-2">
              <BiSearch size={20} />
            </label>
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="w-full  py-2 bg-transparent focus:outline-none flex-1 placeholder:text-blue-400 "
              id="search"
            />
          </div>
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
