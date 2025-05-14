import React, { useEffect, useState } from "react";
import axios from "axios";
import RequireAdmin from "./RequireAdmin";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");

    axios
      .get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error("Error fetching users:", err);
        alert("Failed to load user list.");
      });
  }, []);

  return (
    <RequireAdmin>
      <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
        <h2>User List</h2>
        <br />
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </RequireAdmin>
  );
};

export default AdminUserList;
