import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavBar />
      <div style={{ padding: "2rem" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
