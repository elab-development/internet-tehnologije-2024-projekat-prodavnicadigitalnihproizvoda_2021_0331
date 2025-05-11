import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminSalesChart = () => {
  const [data, setData] = useState([]);

  const token = sessionStorage.getItem("auth_token");

  useEffect(() => {
    axios
      .get("/api/sales-by-category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching sales data:", err);
        alert("Failed to load sales data.");
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sales by Category</h2>
      <br />
      <br />
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="total_sales"
              fill="#8884d8"
              name="Total Sales (EUR)"
            />
            <Bar
              dataKey="total_sales_count"
              fill="#82ca9d"
              name="Number of Sales"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No sales data available.</p>
      )}
    </div>
  );
};

export default AdminSalesChart;
