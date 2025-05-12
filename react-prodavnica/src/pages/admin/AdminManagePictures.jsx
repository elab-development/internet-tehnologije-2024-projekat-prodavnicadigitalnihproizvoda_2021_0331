import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RequireAdmin from "./RequireAdmin";

const AdminManagePictures = () => {
  const [pictures, setPictures] = useState([]);
  const token = sessionStorage.getItem("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/pictures").then((res) => {
      setPictures(res.data.pictures || []);
    });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this picture?"))
      return;

    try {
      await axios.delete(`/api/pictures/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPictures((prev) => prev.filter((pic) => pic.id !== id));
      alert("Picture deleted successfully.");
    } catch (error) {
      console.error("Error deleting picture:", error);
      alert("An error occurred while deleting the picture.");
    }
  };

  return (
    <RequireAdmin>
      <div style={styles.container}>
        <h2 style={styles.heading}>Manage Pictures</h2>

        {pictures.length === 0 ? (
          <p>No pictures available.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price (EUR)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pictures.map((pic) => (
                <tr key={pic.id}>
                  <td>{pic.title}</td>
                  <td>{pic.category_name}</td>
                  <td>{pic.price}</td>
                  <td>
                    <button
                      style={styles.editBtn}
                      onClick={() => navigate(`/admin/edit-picture/${pic.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(pic.id)}
                    >
                      Delete
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
    maxWidth: "900px",
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
  editBtn: {
    padding: "0.4rem 0.8rem",
    marginRight: "0.5rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
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

export default AdminManagePictures;
