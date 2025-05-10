import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");

    if (!token) {
      alert("You must be logged in!");
      navigate("/login");
      return;
    }

    axios
      .get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.role === "admin") {
          setIsAdmin(true);
        } else {
          alert("You do not have permission to access this page.");
          navigate("/gallery");
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        navigate("/login");
      });
  }, [navigate]);

  if (!isAdmin) {
    return <p className="text-center mt-5">Checking access...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <p style={styles.subheading}>
        Welcome, administrator. Please select an action:
      </p>

      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => navigate("/admin/add-picture")}
        >
          <strong>Add New Picture</strong>
        </button>
        <button
          style={styles.button}
          onClick={() => navigate("/admin/manage-pictures")}
        >
          <strong>Manage Pictures</strong>
        </button>
        <button
          style={styles.button}
          onClick={() => navigate("/admin/add-category")}
        >
          <strong>Add New Category</strong>
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: "#fefefe",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    marginTop: "4rem",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "2.2rem",
    marginBottom: "1rem",
    color: "#2c3e50",
  },
  subheading: {
    fontSize: "1rem",
    marginBottom: "2rem",
    color: "#555",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  button: {
    padding: "0.9rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#0056b3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
};

export default AdminDashboard;
