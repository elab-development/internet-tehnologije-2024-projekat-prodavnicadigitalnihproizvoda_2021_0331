import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavBar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(navigate);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <strong>Admin Panel</strong>
        <Link to="/admin/dashboard" style={styles.link}>
          Dashboard
        </Link>
        <Link to="/admin/add-picture" style={styles.link}>
          Add Picture
        </Link>
        <Link to="/admin/manage-pictures" style={styles.link}>
          Manage Pictures
        </Link>
        <Link to="/admin/add-category" style={styles.link}>
          Add Category
        </Link>
        <Link to="/admin/preview" style={styles.link}>
          Preview Gallery
        </Link>
        <Link to="/admin/sales-chart" style={styles.link}>
          Sales Chart
        </Link>
      </div>
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    padding: "1rem 2rem",
    color: "#fff",
    fontFamily: "'Segoe UI', sans-serif",
  },
  left: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  link: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "1rem",
  },
  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AdminNavBar;
