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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminSalesChart = () => {
  const [data, setData] = useState([]);
  const [topBuyers, setTopBuyers] = useState([]);
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

  useEffect(() => {
    axios
      .get("/api/top-buyers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTopBuyers(res.data))
      .catch((err) => console.error("Error fetching top buyers:", err));
  }, []);

  const [topPictures, setTopPictures] = useState([]);

  useEffect(() => {
    axios
      .get("/api/top-pictures", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => setTopPictures(res.data))
      .catch((err) => console.error("Error fetching top pictures:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sales by Category</h2>
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

      <br />
      <br />
      <br />
      <h2>Top 5 Buyers by Purchase Count</h2>
      {topBuyers.length > 0 ? (
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={topBuyers}
              dataKey="purchase_count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={180}
              label
            >
              {topBuyers.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"][
                      index % 5
                    ]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No top buyers data available.</p>
      )}
    </div>
  );
};

export default AdminSalesChart;
