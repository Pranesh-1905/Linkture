// src/components/InvestorGraph.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", investments: 3 },
  { month: "Feb", investments: 5 },
  { month: "Mar", investments: 2 },
  { month: "Apr", investments: 7 },
  { month: "May", investments: 6 },
];

export default function InvestorGraph() {
  return (
    <div style={{ background: "white", padding: 20, borderRadius: 15 }}>
      <h2 style={{ marginBottom: 12 }}>Monthly Investments Overview</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="investments" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
