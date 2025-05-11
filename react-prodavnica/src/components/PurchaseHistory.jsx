import React, { useEffect, useState } from "react";

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);
  const token = sessionStorage.getItem("auth_token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/purchase-history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Error loading purchase history:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Purchases</h2>
      <br />
      <div className="row g-4">
        {history.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="card h-100 shadow-sm d-flex flex-column align-items-center text-center">
              <br />
              <img
                src={`http://127.0.0.1:8000/${item.picture.low_res_path}`}
                className="card-img-top"
                alt={item.picture.title}
                style={{
                  maxHeight: "300px",
                  maxWidth: "300px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <h6 className="card-title">{item.picture.title}</h6>
                <p className="card-text mb-1">💵 ${item.price_to_pay}</p>
                <p className="card-text small text-muted">
                  📅 {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default PurchaseHistory;
