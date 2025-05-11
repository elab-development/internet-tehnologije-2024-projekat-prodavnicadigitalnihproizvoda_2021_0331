import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/AdminNavBar";

const AdminLayout = ({ onLogout }) => {
  return (
    <div>
      <AdminNavBar onLogout={onLogout} />
      <div style={{ padding: "2rem" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
