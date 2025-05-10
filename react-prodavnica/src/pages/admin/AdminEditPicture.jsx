import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditPicture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("auth_token");

  const [picture, setPicture] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategories(res.data));

    axios.get("/api/pictures").then((res) => {
      const pic = res.data.pictures.find((p) => p.id === parseInt(id));
      setPicture(pic);
    });
  }, [id]);

  const handleChange = (e) => {
    setPicture({ ...picture, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/api/pictures/${id}`, picture, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Picture updated successfully!");
        navigate("/admin/manage-pictures");
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while updating the picture.");
      });
  };

  if (!picture)
    return <p style={{ textAlign: "center" }}>Loading picture...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Picture</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          value={picture.title}
          onChange={handleChange}
          placeholder="Title"
          style={styles.input}
          required
        />
        <input
          type="text"
          name="description"
          value={picture.description}
          onChange={handleChange}
          placeholder="Description"
          style={styles.input}
          required
        />
        <input
          type="number"
          name="price"
          value={picture.price}
          onChange={handleChange}
          placeholder="Price (€)"
          style={styles.input}
          required
        />
        <select
          name="category_id"
          value={picture.category_id}
          onChange={handleChange}
          style={styles.input}
          required
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
        <button type="submit" style={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
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

export default AdminEditPicture;
