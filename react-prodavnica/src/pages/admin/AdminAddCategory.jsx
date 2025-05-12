import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RequireAdmin from "./RequireAdmin";

const AdminAddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();
  const token = sessionStorage.getItem("auth_token");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/categories", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("Category successfully created!");
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.error("Error:", err.response?.data || err.message);
        alert("An error occurred while adding the category.");
      });
  };

  return (
    <RequireAdmin>
      <div style={styles.container}>
        <h2 style={styles.heading}>Add New Category</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>
            Create Category
          </button>
        </form>
      </div>
    </RequireAdmin>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "4rem auto",
    padding: "2rem",
    backgroundColor: "#fefefe",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.7rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "0.7rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    padding: "0.9rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "1rem",
  },
};

export default AdminAddCategory;
