import React, { useEffect } from "react";
import Header from "./Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const AdminLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left corner
  }, [location]);

  return (
    <div className="flex h-screen">
      <aside>
        <Sidebar />
      </aside>
      <section className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-blue-50">
          <Outlet />
        </main>
        <footer></footer>
      </section>
    </div>
  );
};

export default AdminLayout;
