import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RequireAdmin from "./RequireAdmin";

const AdminAddPicture = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    high_res_file: null,
    low_res_file: null,
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("auth_token");

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post("/api/pictures/upload", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Picture uploaded successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("An error occurred while uploading the picture.");
    }
  };

  return (
    <RequireAdmin>
      <div style={styles.container}>
        <h2 style={styles.heading}>Add New Picture</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          style={styles.form}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="number"
            name="price"
            placeholder="Price (€)"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <select
            name="category_id"
            onChange={handleChange}
            required
            defaultValue=""
            style={styles.input}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div style={styles.labelGroup}>
            <label style={styles.label}>Low Resolution Image:</label>
            <input
              type="file"
              name="low_res_file"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.labelGroup}>
            <label style={styles.label}>High Resolution Image:</label>
            <input
              type="file"
              name="high_res_file"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Submit Picture
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
    width: "100%",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "bold",
    display: "block",
    color: "#333",
  },
  labelGroup: {
    display: "flex",
    flexDirection: "column",
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

export default AdminAddPicture;
