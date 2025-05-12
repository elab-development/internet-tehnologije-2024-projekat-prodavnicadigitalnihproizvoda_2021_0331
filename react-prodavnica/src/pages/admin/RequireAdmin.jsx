import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RequireAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if (!token) {
      alert("You must be logged in to access this page.");
      navigate("/login");
      return;
    }

    axios
      .get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.role === "admin") {
          setAllowed(true);
        } else {
          alert("You do not have permission to access this page.");
          navigate("/gallery");
        }
      })
      .catch(() => {
        alert("Session expired or invalid token. Please log in again.");
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p className="text-center mt-5">Checking access...</p>;
  return allowed ? children : null;
};

export default RequireAdmin;
