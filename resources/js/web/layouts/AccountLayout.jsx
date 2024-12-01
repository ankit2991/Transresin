import React from "react";
import { Link, Outlet } from "react-router-dom";
import { BiCart, BiEditAlt, BiHeart, BiLock, BiUser } from "react-icons/bi";

const AccountLayout = () => {
  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Account Settings</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/account"
                className="flex items-center gap-2 py-2 border-b-2 border-b-primary-300 text-primary-300 font-bold"
              >
                <BiUser />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/account/edit-profile"
                className="flex items-center gap-2 py-2 border-b-2 border-b-primary-300 text-primary-300 font-bold"
              >
                <BiEditAlt />
                Edit Profile
              </Link>
            </li>
            <li>
              <Link
                to="/account/orders"
                className="flex items-center gap-2 py-2 border-b-2 border-b-primary-300 text-primary-300 font-bold"
              >
                <BiCart />
                My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/account/wishlist"
                className="flex items-center gap-2 py-2 border-b-2 border-b-primary-300 text-primary-300 font-bold"
              >
                <BiHeart />
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                to="/account/change-password"
                className="flex items-center gap-2 py-2 border-b-2 border-b-primary-300 text-primary-300 font-bold"
              >
                <BiLock />
                Change Password
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AccountLayout;
