import React from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <aside>
        <Sidebar />
      </aside>
      <section className="flex-1 flex flex-col">
        <Header />
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </section>
    </div>
  );
};

export default AdminLayout;
