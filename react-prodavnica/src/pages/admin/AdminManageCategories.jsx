import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RequireAdmin from "./RequireAdmin";

const AdminManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const token = sessionStorage.getItem("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error("Error loading categories:", err);
        alert("Failed to load categories.");
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await axios.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Category deleted successfully.");
      fetchCategories();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred while deleting the category.");
        console.error(error);
      }
    }
  };

  return (
    <RequireAdmin>
      <div style={styles.container}>
        <h2 style={styles.heading}>Manage Categories</h2>

        {categories.length === 0 ? (
          <p style={styles.empty}>No categories found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Category Name</th>
                <th style={{ ...styles.th, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat, index) => (
                <tr
                  key={cat.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <td style={styles.td}>{cat.name}</td>
                  <td style={{ ...styles.td, textAlign: "right" }}>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(cat.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </RequireAdmin>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "4rem auto",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: "#2c3e50",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  deleteBtn: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AdminManageCategories;
