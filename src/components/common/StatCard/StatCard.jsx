import React from "react";
export default function StatCard({ value, label, icon, accent = "green" }) {
  return (
    <div className="stat-card">
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
      <div className={`stat-icon ${accent}`}>{icon}</div>
    </div>
  );
}
